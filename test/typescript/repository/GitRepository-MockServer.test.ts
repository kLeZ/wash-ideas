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

import { container } from "../../../src/typescript/ioc/inversify.config";
import { IContext } from "../../../src/typescript/models/IContext";
import { IGitRepositoryConfiguration } from "../../../src/typescript/models/IGitRepositoryConfiguration";
import { IPersistible } from "../../../src/typescript/models/IPersistible";
import { GitHubRepository } from "../../../src/typescript/repository/GithubRepository";
import { IRepository } from "../../../src/typescript/repository/IRepository";
import { Types } from "../../../src/typescript/repository/Symbols";
import { IGitClient } from "../../../src/typescript/util/IGitClient";
import Localization from "../../../src/typescript/util/Localization";
import { OAuth2Format } from "../../../src/typescript/util/OAuth2Format";
import { resources } from "../util/LocalesMock";
import { MyObject } from "../util/MyObject";
import { GitClient } from "./../../../src/typescript/util/GitClient";

beforeAll(() => {
	container.bind<IGitClient>(Types.GIT_CLIENT).to(GitClient);
	container.bind<IRepository<IPersistible>>("github").to(GitHubRepository);
	container.bind<Localization>(Types.LOCALIZATION).toConstantValue(new Localization(resources));

	const configuration: IGitRepositoryConfiguration = {
		type: "git",
		dir: "wash-ideas",
		branch: "data",
		url: "http://localhost:8174/wash-ideas-fake.git",
		oauth2format: OAuth2Format.GitHub,
		token: "",
		fsconf: { fs: "InMemory", options: {} },
	};
	const ctx: IContext = {
		user: {
			name: "kLeZ",
			email: "julius8774@gmail.com",
		},
		configuration,
	};
	container.bind<IContext>(Types.CONTEXT).toConstantValue(ctx);
});

beforeEach(() => {
	container.snapshot();
});

afterEach(() => {
	container.restore();
});

it("Fake", () => {});

// it("open without crash", async () => {
// 	const type = (container.get<IContext>(Types.CONTEXT).configuration as IGitRepositoryConfiguration).oauth2format;
// 	const repo = container.get<IRepository<IPersistible>>(type);
// 	await repo.open();
// });

// it("close without crash", async () => {
// 	const type = (container.get<IContext>(Types.CONTEXT).configuration as IGitRepositoryConfiguration).oauth2format;
// 	const repo = container.get<IRepository<IPersistible>>(type);
// 	await repo.close();
// });
