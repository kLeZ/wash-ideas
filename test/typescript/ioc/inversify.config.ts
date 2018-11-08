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

import { Container, interfaces } from "inversify";
import { IPersistible } from "../../../src/typescript/models/IPersistible";
import { GitHubRepository } from "../../../src/typescript/repository/GithubRepository";
import { IRepository } from "../../../src/typescript/repository/IRepository";
import { RepositoryType, Types } from "../../../src/typescript/repository/Symbols";
import { IGitClient } from "../../../src/typescript/util/IGitClient";
import Localization from "../../../src/typescript/util/Localization";
import { logIoc } from "../../../src/typescript/util/Logging";
import { GitClientMock } from "../util/GitClientMock";
import { resources } from "../util/LocalesMock";

const container = new Container();
container.bind<IGitClient>(Types.GIT_CLIENT).to(GitClientMock);
container.bind<IRepository<IPersistible>>(RepositoryType.GITHUB).to(GitHubRepository);
container.bind<Localization>(Types.LOCALIZATION).toConstantValue(new Localization(resources));
export { container };
logIoc.trace("Inversify TST");
