// Copyright (C) 2018 Alessandro Accardo a.k.a. kLeZ & Fabio Scotto di Santolo a.k.a. Plague
//
// This file is part of Wash Ideas.
//
// Wash Ideas is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Wash Ideas is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Wash Ideas.  If not, see <http://www.gnu.org/licenses/>.
//

import { injectable } from "inversify";
import "reflect-metadata";
import { IContext } from "../models/IContext";
import { IGitRepositoryConfiguration } from "../models/IGitRepositoryConfiguration";
import { IPersistible } from "../models/IPersistible";
import { IGitClient } from "../util/IGitClient";
import { logRepo } from "../util/Logging";
import { IRepository } from "./IRepository";

@injectable()
export abstract class GitRepository<T extends IPersistible> implements IRepository<T> {
	protected context: IContext;
	protected client: IGitClient;

	public open(): Promise<void> {
		const self = this;
		const config = self.context.configuration as IGitRepositoryConfiguration;
		return new Promise<void>(async (resolve, reject) => {
			await self.client.init();

			if (self.client.exists(config.dir) === false) {
				logRepo.trace("Repository folder does not exist.");
				self.client.mkdir(config.dir);
				const contents = self.client.readdir(config.dir);
				for (const cont of contents) {
					logRepo.debug(cont);
				}
				await self.client.clone({
					dir: config.dir,
					// FIXME: corsProxy: "https://cors.isomorphic-git.org",
					url: config.url,
					ref: config.branch,
					singleBranch: true,
					depth: config.depth || 5,
				});
				resolve();
			} else {
				logRepo.warn("Repository has already been cloned");
				resolve();
			}
		});
	}
	public close(): Promise<void> {
		const self = this;
		const config = self.context.configuration as IGitRepositoryConfiguration;
		return new Promise<void>(async (resolve, reject) => {
			await self.client.init();

			const synced: boolean = await self.sync();
			if (synced === true) {
				resolve();
			} else {
				reject("Not synced!");
			}
		});
	}
	public create(item: T): Promise<boolean> {
		const self = this;
		const config = self.context.configuration as IGitRepositoryConfiguration;
		return new Promise<boolean>(async (resolve, reject) => {
			try {
				await self.client.init();

				const dir = (this.context.configuration as IGitRepositoryConfiguration).dir;
				const author = this.context.user;
				const filepath = `${config.dir}/${item.title}.json`;
				if (self.client.exists(filepath) === false) {
					this.client.writeFile(filepath, JSON.stringify(item), item.encoding);
					await this.client.add({
						dir,
						filepath: `${item.title}.json`
					});
					const sha = await this.client.commit({
						dir,
						message: `Added new Item: ${item.title}`,
						author
					});
					if (sha !== null) {
						const ret = await this.sync();
						resolve(ret);
					} else {
						resolve(false);
					}
				} else {
					logRepo.warn("Specified entity already exists! Please use the update method");
					reject("Specified entity already exists! Please use the update method");
				}
			} catch (error) {
				logRepo.error(error.message, error);
				reject(error);
			}
		});
	}
	public update(filename: string, item: T): Promise<boolean> {
		const self = this;
		const config = self.context.configuration as IGitRepositoryConfiguration;
		return new Promise<boolean>(async (resolve, reject) => {
			try {
				await self.client.init();

				const dir = (this.context.configuration as IGitRepositoryConfiguration).dir;
				const author = this.context.user;
				const filepath = `${config.dir}/${item.title}.json`;
				if (self.client.exists(filepath) === true) {
					this.client.writeFile(filepath, JSON.stringify(item), item.encoding);
					await this.client.add({
						dir,
						filepath: `${item.title}.json`
					});
					const sha = await this.client.commit({
						dir,
						message: `Updated new Item: ${item.title}`,
						author
					});
					if (sha !== null) {
						const ret = await this.sync();
						resolve(ret);
					} else {
						resolve(false);
					}
				} else {
					logRepo.warn("Specified entity doesn't exist yet! Please use the create method");
					reject("Specified entity doesn't exist yet! Please use the create method");
				}
			} catch (error) {
				logRepo.error(error.message, error);
				reject(error);
			}
		});
	}
	public delete(filename: string): Promise<boolean> {
		const self = this;
		const config = self.context.configuration as IGitRepositoryConfiguration;

		return new Promise<boolean>(async (resolve, reject) => {
			try {
				const dir = (this.context.configuration as IGitRepositoryConfiguration).dir;
				const filepath = `${config.dir}/${filename}.json`;
				const author = this.context.user;
				self.client.deleteFile(filepath);
				await this.client.remove({
					dir,
					filepath: `${filename}.json`
				});
				const sha = await this.client.commit({
					dir,
					message: `Deleted new Item: ${filename}.json`,
					author
				});
				if (sha !== null) {
					const ret = await this.sync();
					resolve(self.client.exists(filepath) === false);
				} else {
					reject("Errors with commit");
				}
			} catch (e) {
				reject(e);
			}
		});
	}
	public find(comparer: (value: T) => boolean): Promise<T[]> {
		const self = this;
		const config = self.context.configuration as IGitRepositoryConfiguration;

		return new Promise<T[]>((resolve, reject) => {
			try {
				const items: T[] = self.client
					.readdir(config.dir)
					.filter(item => item.endsWith(".json") && item.length > ".json".length)
					.map(file => JSON.parse(self.client.readFile(`${config.dir}/${file}`, "utf-8")) as T)
					.filter(comparer);
				resolve(items);
			} catch (e) {
				reject(e);
			}
		});
	}
	public findOne(filename: string): Promise<T> {
		const self = this;
		const config = self.context.configuration as IGitRepositoryConfiguration;

		return new Promise<T>(async (resolve, reject) => {
			const fileContent = self.client.readFile(`${config.dir}/${filename}.json`, "utf-8");
			resolve(JSON.parse(fileContent) as T);
		});
	}

	private sync(): Promise<boolean> {
		const self = this;
		const config = self.context.configuration as IGitRepositoryConfiguration;
		return new Promise<boolean>(async (resolve, reject) => {
			await self.client.pull({
				dir: config.dir,
				oauth2format: config.oauth2format as "github" | "bitbucket" | "gitlab",
				token: config.token,
			});
			const response = await self.client.push({
				dir: config.dir,
				oauth2format: config.oauth2format as "github" | "bitbucket" | "gitlab",
				token: config.token,
			});
			resolve(response.errors === null || response.errors ? response.errors.length === 0 : true);
		});
	}
}
