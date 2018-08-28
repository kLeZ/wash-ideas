import * as BrowserFS from "browserfs";
import { FSModule } from "browserfs/dist/node/core/FS";
import * as git from "isomorphic-git";
import * as pify from "pify";
import { IContext } from "../models/IContext";
import { IGitRepositoryConfiguration } from "../models/IGitRepositoryConfiguration";
import { IPersistible } from "../models/IPersistible";
import { catRepository } from "../util/Logging";
import { IRepository } from "./IRepository";

export abstract class GitRepository<T extends IPersistible>
	implements IRepository<T> {
	public context: IContext;
	protected fs: FSModule;
	protected pfs: any;
	protected dir: string;
	protected config: IGitRepositoryConfiguration;

	constructor() {
		const self = this;

		self.dir = "wash-ideas";
		catRepository.debug(self.dir);
	}
	public init(context: IContext): void {
		this.context = context;
		this.config = this.context.configuration as IGitRepositoryConfiguration;
	}
	public open(): Promise<void> {
		const self = this;
		return new Promise<void>((resolve, reject) => {
			BrowserFS.configure({ fs: "IndexedDB", options: {} }, err => {
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
		return new Promise<void>((resolve, reject) => {
			self.fs.getRootFS().rmdir(self.dir, err => {
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
		return new Promise<boolean>(async (resolve, reject) => {
			await self.pfs.writeFile(
				`${self.dir}/${item.title}.json`,
				JSON.stringify(item),
				item.encoding
			);
			await git.add({ dir: self.dir, filepath: `${item.title}.json` });
			const sha = await git.commit({
				dir: self.dir,
				message: `Added new ${item.constructor.name}: ${
					item.title
				}.json`,
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
		throw new Error("Method not implemented.");
	}
	public delete(id: string): Promise<boolean> {
		throw new Error("Method not implemented.");
	}
	public find(item: T): Promise<T[]> {
		throw new Error("Method not implemented.");
	}
	public findOne(id: string): Promise<T> {
		throw new Error("Method not implemented.");
	}
	private sync(): Promise<boolean> {
		const self = this;
		return new Promise<boolean>(async (resolve, reject) => {
			await git.pull({
				dir: self.dir,
				oauth2format: self.config.oauth2format,
				token: self.config.token
			});
			const response = await git.push({
				dir: self.dir,
				oauth2format: self.config.oauth2format,
				token: self.config.token
			});
			resolve(response.errors === null || response.errors.length === 0);
		});
	}
}
