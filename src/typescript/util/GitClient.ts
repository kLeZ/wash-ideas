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
import { inject, injectable } from "inversify";
import * as git from "isomorphic-git";
import { IContext } from "../models/IContext";
import { IGitRepositoryConfiguration } from "../models/IGitRepositoryConfiguration";
import { Types } from "../repository/Symbols";
import { logUtils } from "../util/Logging";
import { IAddArgs, ICloneArgs, ICommitArgs, IGitClient, IPullArgs, IPushArgs, IPushResult } from "./IGitClient";
import { Sha, ShaType } from "./Sha";

@injectable()
export class GitClient implements IGitClient {
	private config: IGitRepositoryConfiguration;

	constructor(@inject(Types.CONTEXT) ctx: IContext) {
		this.config = ctx.configuration as IGitRepositoryConfiguration;
	}

	public add(args: IAddArgs): Promise<void> {
		return git.add(args);
	}
	public clone(args: ICloneArgs): Promise<void> {
		return git.clone(args);
	}
	public commit(args: ICommitArgs): Promise<Sha> {
		return new Promise<Sha>((resolve, reject) => {
			git.commit(args)
				.then(sha => {
					try {
						resolve(new Sha(ShaType.SHA1, sha));
					} catch (error) {
						reject(error);
					}
				})
				.catch(err => {
					reject(err);
				});
		});
	}
	public exists(path: string): boolean {
		const fs = BrowserFS.BFSRequire("fs");
		return fs.existsSync(path);
	}
	public init(): Promise<void> {
		const self = this;
		return new Promise<void>((resolve, reject) => {
			self.initFS().then(fs => {
				// Initialize isomorphic-git with our new file system
				git.plugins.set("fs", fs);
				resolve();
			});
		});
	}
	public mkdir(path: string): void {
		const fs = BrowserFS.BFSRequire("fs");
		return fs.mkdirSync(path);
	}
	public readdir(path: string): string[] {
		const fs = BrowserFS.BFSRequire("fs");
		return fs.readdirSync(path);
	}
	public pull(args: IPullArgs): Promise<void> {
		return git.pull(args);
	}
	public push(args: IPushArgs): Promise<IPushResult> {
		return git.push(args);
	}
	public writeFile(path: string, content: string, encoding: string): void {
		const fs = BrowserFS.BFSRequire("fs");
		return fs.writeFileSync(path, content, encoding);
	}
	public readFile(path: string, encoding: string): string {
		const fs = BrowserFS.BFSRequire("fs");
		return fs.readFileSync(path, encoding);
	}
	public deleteFile(path: string): void {
		const fs = BrowserFS.BFSRequire("fs");
		return fs.unlinkSync(path);
	}

	private initFS(): Promise<FSModule> {
		const self = this;
		return new Promise<FSModule>((resolve, reject) => {
			// FIXME: refactoring fsconf!!!
			BrowserFS.install(window);
			BrowserFS.configure(self.config.fsconf,
				err => {
					if (err) {
						logUtils.error(err.message, err);
						reject(err);
					} else {
						const fs = BrowserFS.BFSRequire("fs");
						logUtils.trace("BrowserFS configured!");
						resolve(fs);
					}
				}
			);
		});
	}
}
