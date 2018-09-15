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

import { IContext } from "../../../src/typescript/models/IContext";
import { IGitRepositoryConfiguration } from "../../../src/typescript/models/IGitRepositoryConfiguration";
import { IPersistible } from "../../../src/typescript/models/IPersistible";
import { IRepositoryConfiguration } from "../../../src/typescript/models/IRepositoryConfiguration";
import { IUser } from "../../../src/typescript/models/IUser";
import { GitRepository } from "../../../src/typescript/repository/GitRepository";
import { container } from "../ioc/inversify.config";
import { Type } from "../../../src/typescript/repository/RepositoriesTypes";

class GitHubRepositoryConfigurationMock implements IGitRepositoryConfiguration {
	public type: "git" = "git";
	public dir: string = "wash-ideas";
	public branch: string = "data";
	public url: string = "https://github.com/kLeZ/wash-ideas";
	public oauth2format: "github" | "bitbucket" | "gitlab" = "github";
	public token: string = "";
	public fsconf = { fs: "InMemory", options: {} };
}

// tslint:disable-next-line:max-classes-per-file
class GitHubContextMock implements IContext {
	public user = {
		name: "Alessandro Accardo",
		email: "julius8774@gmail.com"
	};
	public configuration = new GitHubRepositoryConfigurationMock();
}

// tslint:disable-next-line:max-classes-per-file
export class GitHubRepositoryMock extends GitRepository<IPersistible> {
	public context = new GitHubContextMock();
}
