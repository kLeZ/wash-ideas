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
import "reflect-metadata";
import { IContext } from "../../../src/typescript/models/IContext";
import { IGitRepositoryConfiguration } from "../../../src/typescript/models/IGitRepositoryConfiguration";
import { IRepositoryConfiguration } from "../../../src/typescript/models/IRepositoryConfiguration";
import { IUser } from "../../../src/typescript/models/IUser";
import { container } from "../ioc/inversify.config";
import { Type } from "./RepositoriesTypes";

@injectable()
export class GitHubRepositoryConfigurationMock implements IGitRepositoryConfiguration {
	public type: "git";
	public dir: "wash-ideas";
	public branch: "data";
	public url: "https://github.com/kLeZ/wash-ideas";
	public oauth2format: "github";
	public token: "";
	public fsconf: { fs: "InMemory"; options: {} };
}

@injectable()
// tslint:disable-next-line:max-classes-per-file
export class GitHubContextMock implements IContext {
	public user = {
		name: "Alessandro Accardo",
		email: "julius8774@gmail.com"
	};
	public configuration = container.get<IRepositoryConfiguration>(Type.GITHUB);
}
