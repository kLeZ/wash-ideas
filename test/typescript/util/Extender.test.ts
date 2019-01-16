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

import { container } from "../../../src/typescript/ioc/inversify.config";
import { IPersistible } from "../../../src/typescript/models/IPersistible";
import { GitHubRepository } from "../../../src/typescript/repository/GithubRepository";
import { IRepository } from "../../../src/typescript/repository/IRepository";
import { Types } from "../../../src/typescript/repository/Symbols";
import { IGitClient } from "../../../src/typescript/util/IGitClient";
import Localization from "../../../src/typescript/util/Localization";
import { GitClientMock } from "./GitClientMock";
import { resources } from "./LocalesMock";

beforeAll(() => {
	container.bind<IGitClient>(Types.GIT_CLIENT).to(GitClientMock);
	container.bind<IRepository<IPersistible>>("github").to(GitHubRepository);
	container.bind<Localization>(Types.LOCALIZATION).toConstantValue(new Localization(resources));
});

it("Test extender functions", () => {

	/*
	 * var object1 = { a: 1, b: 2, testArr: [888, { innArr: 1 }, 777], data: { e: 12, c: { lol: 1 }, rofl: { O: 3 } } };
	 * var object2 = { a: 6, b: 9, data: { a: 17, b: 18, e: 13, rofl: { O: 99, copter: { mao: 1 } } }, hexa: { tetra: 66 } };
	 * var object3 = { f: 13, g: 666, a: 333, data: { c: { xD: 45 } }, testArr: [888, { innArr: 3 }, 555] };
	 * FIXME: var newExtendedObject
	 * FIXME: = extendObjects('overwriteValues_True', 'overwriteObjects_True', object1, object2, object3);
	 */
	expect(true); // TODO: do make tests
});
