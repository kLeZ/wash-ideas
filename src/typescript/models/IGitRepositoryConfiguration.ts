import { IRepositoryConfiguration } from "./IRepositoryConfiguration";
export interface IGitRepositoryConfiguration extends IRepositoryConfiguration {
	url: string;
	branch: string;
	depth?: number;
	oauth2format: "github" | "bitbucket" | "gitlab";
	token: string;
	dir: string;
	fsconf: BrowserFS.FileSystemConfiguration;
}
