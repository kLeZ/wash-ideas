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
import { IPersistible } from "../../../src/typescript/models/IPersistible";
import { GitHubRepository } from "../../../src/typescript/repository/GithubRepository";
import { IRepository } from "../../../src/typescript/repository/IRepository";
import { Types } from "../../../src/typescript/repository/Symbols";
import { IGitClient } from "../../../src/typescript/util/IGitClient";
import Localization from "../../../src/typescript/util/Localization";
import { Sha, ShaType } from "../../../src/typescript/util/Sha";
import { GitClientMock } from "./GitClientMock";
import { resources } from "./LocalesMock";

beforeAll(() => {
	container.bind<IGitClient>(Types.GIT_CLIENT).to(GitClientMock);
	container.bind<IRepository<IPersistible>>("github").to(GitHubRepository);
	container.bind<Localization>(Types.LOCALIZATION).toConstantValue(new Localization(resources));
});

it("Create an Sha instance", () => {
	const res: Sha = new Sha(ShaType.SHA1, "096a8a4a0cbc3c5cada45263d8b61775f54a2ee3");
});
it("Invalid hash", () => {
	const mock = jest.fn(() => {
		return new Sha(ShaType.SHA1, "bubusettete");
	});
	expect(mock).toThrowError(new Error("Invalid hash!"));
});
it("Unknown hash type", () => {
	const mock = jest.fn(() => {
		const mockType = {
			t: Symbol.for("mockType")
		};
		return new Sha(mockType.t, "096a8a4a0cbc3c5cada45263d8b61775f54a2ee3");
	});
	expect(mock).toThrowError(new Error("Unknown hash type!"));
});
it("Invalid hash", () => {
	const mock = jest.fn(() => {
		return new Sha(ShaType.SHA1, null);
	});
	expect(mock).toThrowError(new Error("The hash cannot be null!"));
});
