import { IContext } from "../../../src/typescript/models/IContext";
import { IPersistible } from "../../../src/typescript/models/IPersistible";
import { GitRepository } from "../../../src/typescript/repository/GitRepository";
import { IGitRepositoryConfiguration } from "./../../../src/typescript/models/IGitRepositoryConfiguration";

it("clone branch data of wash-ideas repository without crash", async () => {
	const gitConfig: IGitRepositoryConfiguration = {
		type: "git",
		dir: "wash-ideas",
		branch: "data",
		url: "https://github.com/kLeZ/wash-ideas",
		oauth2format: "github",
		token: "",
		fsconf: { fs: "InMemory", options: {} }
	};
	const context: IContext = {
		user: {
			name: "Alessandro Accardo",
			email: "julius8774@gmail.com"
		},
		configuration: gitConfig
	};

	const obj: IPersistible = {
		title: `test_${new Date().toISOString()}`,
		encoding: "utf-8"
	};

	const repo = new GitRepository<IPersistible>();
	repo.init(context);
	await repo.open();
});
it("remove entire repository folder without crash", async () => {
	const gitConfig: IGitRepositoryConfiguration = {
		type: "git",
		dir: "wash-ideas",
		branch: "data",
		url: "https://github.com/kLeZ/wash-ideas",
		oauth2format: "github",
		token: "",
		fsconf: { fs: "InMemory", options: {} }
	};
	const context: IContext = {
		user: {
			name: "Alessandro Accardo",
			email: "julius8774@gmail.com"
		},
		configuration: gitConfig
	};

	const obj: IPersistible = {
		title: `test_${new Date().toISOString()}`,
		encoding: "utf-8"
	};

	const repo = new GitRepository<IPersistible>();
	repo.init(context);
	await repo.close();
});
