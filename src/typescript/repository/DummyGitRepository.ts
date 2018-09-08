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

import * as git from "isomorphic-git";
import { IGitRepositoryConfiguration } from "../models/IGitRepositoryConfiguration";
import { catRepository } from "../util/Logging";
import { GitRepository } from "./GitRepository";

export default class DummyGitRepository extends GitRepository<never> {
	public async log(): Promise<void> {
		const self = this;

		await self.pfs.mkdir(self.config.dir);
		await self.pfs.readdir(self.config.dir);

		await git.clone({
			dir: self.config.dir,
			corsProxy: "https://cors.isomorphic-git.org",
			url: self.config.url,
			ref: self.config.branch,
			singleBranch: true,
			depth: self.config.depth || 5
		});
		const contents = await self.pfs.readdir(self.config.dir);
		catRepository.debug(JSON.stringify(contents));
		const logs = await git.log({ dir: self.config.dir });
		catRepository.debug(
			`Latest synchronized commit message is:\n${logs[0].message}`
		);
	}
}
