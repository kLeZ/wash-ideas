import * as git from "isomorphic-git";
import { IGitRepositoryConfiguration } from "../models/IGitRepositoryConfiguration";
import { catRepository } from "../util/Logging";
import { GitRepository } from "./GitRepository";

export default class DummyGitRepository extends GitRepository<never> {
	public async log(): Promise<void> {
		const self = this;

		await self.pfs.mkdir(self.dir);
		await self.pfs.readdir(self.dir);

		await git.clone({
			dir: self.dir,
			corsProxy: "https://cors.isomorphic-git.org",
			url: self.config.url,
			ref: self.config.branch,
			singleBranch: true,
			depth: self.config.depth || 5
		});
		const contents = await self.pfs.readdir(self.dir);
		catRepository.debug(JSON.stringify(contents));
		const logs = await git.log({ dir: self.dir });
		catRepository.debug(
			`Latest synchronized commit message is:\n${logs[0].message}`
		);
	}
}
