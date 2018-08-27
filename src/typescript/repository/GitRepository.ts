import * as BrowserFS from "browserfs";
import { FSModule } from "browserfs/dist/node/core/FS";
import * as git from "isomorphic-git";
import * as pify from "pify";
import { ErrorType } from "typescript-logging";
import { catRepository } from "../util/Logging";
import { IRepository } from "./IRepository";

export abstract class GitRepository<T> implements IRepository<T> {
	private fs: FSModule;
	private pfs: any;
	private dir: string;

	constructor() {
		const self = this;

		self.dir = "wash-ideas";
		catRepository.debug(self.dir);
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

	public async log(): Promise<void> {
		const self = this;

		await self.pfs.mkdir(self.dir);
		await self.pfs.readdir(self.dir);

		await git.clone({
			dir: self.dir,
			corsProxy: "https://cors.isomorphic-git.org",
			url: "https://github.com/kLeZ/wash-ideas",
			ref: "master",
			singleBranch: true,
			depth: 5
		});
		const contents = await self.pfs.readdir(self.dir);
		catRepository.debug(JSON.stringify(contents));
		const logs = await git.log({ dir: self.dir });
		catRepository.debug(
			`Latest synchronized commit message is:\n${logs[0].message}`
		);
	}
	public create(item: T): Promise<boolean> {
		throw new Error("Method not implemented.");
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
}
