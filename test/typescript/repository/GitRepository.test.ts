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
import { IRepository } from "../../../src/typescript/repository/IRepository";
import { RepositoryType, Types } from "../../../src/typescript/repository/Symbols";
import { container } from "../ioc/inversify.config";
import { MyObject } from "../util/MyObject";

beforeAll(() => {
	const configuration: IGitRepositoryConfiguration = {
		type: "git",
		dir: "wash-ideas",
		branch: "data",
		url: "https://github.com/kLeZ/wash-ideas",
		oauth2format: "github",
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

it("clone branch data of wash-ideas repository without crash", async () => {
	const repo = container.get<IRepository<IPersistible>>(RepositoryType.GITHUB);
	await repo.open();
});

it("remove entire repository folder without crash", async () => {
	const repo = container.get<IRepository<IPersistible>>(RepositoryType.GITHUB);
	await repo.close();
});

it("Tests the find one method searching for the 'Goofy0' instance", async () => {
	const repo = container.get<IRepository<IPersistible>>(RepositoryType.GITHUB);
	const el = await repo.findOne("Goofy0");
	expect(el).toEqual({
		title: "Goofy0",
		encoding: "utf-8"
	});
});

it("Tests the find method searching for the 'Goofy*' instance", async () => {
	const repo = container.get<IRepository<IPersistible>>(RepositoryType.GITHUB);
	const els = await repo.find(val => {
		return /Goofy[0-9]+/.test(val.title);
	});
	expect(els).toEqual(expect.arrayContaining([
		new MyObject("Goofy0", "utf-8"),
		new MyObject("Goofy1", "utf-8"),
		new MyObject("Goofy2", "utf-8")
	]));
});
