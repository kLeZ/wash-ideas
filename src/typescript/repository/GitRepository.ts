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

import * as BrowserFS from "browserfs";
import { FSModule } from "browserfs/dist/node/core/FS";
import { injectable } from "inversify";
import * as git from "isomorphic-git";
import * as pify from "pify";
import "reflect-metadata";
import { IContext } from "../models/IContext";
import { IGitRepositoryConfiguration } from "../models/IGitRepositoryConfiguration";
import { IPersistible } from "../models/IPersistible";
import { catRepository } from "../util/Logging";
import { IRepository } from "./IRepository";

@injectable()
export abstract class GitRepository<T extends IPersistible> implements IRepository<T> {
	protected context: IContext;
	protected fs: FSModule;
	protected pfs: any;

	public open(): Promise<void> {
		const self = this;
		const config = self.context.configuration as IGitRepositoryConfiguration;
		return new Promise<void>((resolve, reject) => {
			BrowserFS.configure(config.fsconf, err => {
				if (err) {
					catRepository.error(err.message, err);
					reject(err);
				}
				self.fs = BrowserFS.BFSRequire("fs");
				// Initialize isomorphic-git with our new file system
				git.plugins.set("fs", self.fs);
				// make a Promisified version for convenience
				self.pfs = pify(self.fs);
				catRepository.trace("BrowserFS configured!");
				resolve();
			});
		});
	}
	public close(): Promise<void> {
		const self = this;
		const config = self.context.configuration as IGitRepositoryConfiguration;
		return new Promise<void>((resolve, reject) => {
			self.fs.getRootFS().rmdir(config.dir, err => {
				if (err) {
					catRepository.error(err.message, err);
					reject(err);
				}
				resolve();
			});
		});
	}
	public create(item: T): Promise<boolean> {
		const self = this;
		const config = self.context.configuration as IGitRepositoryConfiguration;
		return new Promise<boolean>(async (resolve, reject) => {
			await self.pfs.writeFile(`${config.dir}/${item.title}.json`, JSON.stringify(item), item.encoding);
			await git.add({
				dir: config.dir,
				filepath: `${item.title}.json`
			});
			const sha = await git.commit({
				dir: config.dir,
				message: `Added new ${item.constructor.name}: ${item.title}.json`,
				author: {
					name: self.context.user.name,
					email: self.context.user.email
				}
			});
			if (sha !== null && /[a-fA-F0-9]{40}/.test(sha)) {
				const ret = await self.sync();
				resolve(ret);
			} else {
				resolve(false);
			}
		});
	}
	public update(id: string, item: T): Promise<boolean> {
		const self = this;
		const config = self.context.configuration as IGitRepositoryConfiguration;

		throw new Error("Method not implemented.");
	}
	public delete(id: string): Promise<boolean> {
		const self = this;
		const config = self.context.configuration as IGitRepositoryConfiguration;

		throw new Error("Method not implemented.");
	}
	public find(item: T): Promise<T[]> {
		const self = this;
		const config = self.context.configuration as IGitRepositoryConfiguration;

		throw new Error("Method not implemented.");
	}
	public findOne(id: string): Promise<T> {
		const self = this;
		const config = self.context.configuration as IGitRepositoryConfiguration;
		throw new Error("Method not implemented.");
	}
	private sync(): Promise<boolean> {
		const self = this;
		const config = self.context.configuration as IGitRepositoryConfiguration;
		return new Promise<boolean>(async (resolve, reject) => {
			await git.pull({
				dir: config.dir,
				oauth2format: config.oauth2format,
				token: config.token
			});
			const response = await git.push({
				dir: config.dir,
				oauth2format: config.oauth2format,
				token: config.token
			});
			resolve(response.errors === null || response.errors.length === 0);
		});
	}
}
