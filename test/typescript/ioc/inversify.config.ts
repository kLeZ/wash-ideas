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

import { Container } from "inversify";
import { IPersistible } from "../../../src/typescript/models/IPersistible";
import { IRepositoryConfiguration } from "../../../src/typescript/models/IRepositoryConfiguration";
import { IRepository } from "../../../src/typescript/repository/IRepository";
import { Type } from "../../../src/typescript/repository/RepositoriesTypes";
import { GitHubRepositoryMock } from "../repository/RepositoryConfigurationMock";

const container = new Container();
container.bind<IRepository<IPersistible>>(Type.GITHUB).to(GitHubRepositoryMock);
export { container };
