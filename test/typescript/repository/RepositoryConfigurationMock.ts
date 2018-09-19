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

import { injectable } from "inversify";
import { IContext } from "../../../src/typescript/models/IContext";
import { IGitRepositoryConfiguration } from "../../../src/typescript/models/IGitRepositoryConfiguration";

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
@injectable()
export class GitHubContextMock implements IContext {
	public user = {
		name: "Alessandro Accardo",
		email: "julius8774@gmail.com"
	};
	public configuration = new GitHubRepositoryConfigurationMock();
}
