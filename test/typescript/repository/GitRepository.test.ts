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
import { IPersistible } from "../../../src/typescript/models/IPersistible";
import { IRepositoryConfiguration } from "../../../src/typescript/models/IRepositoryConfiguration";
import { GitRepository } from "../../../src/typescript/repository/GitRepository";
import { container } from "../ioc/inversify.config";
import { IGitRepositoryConfiguration } from "./../../../src/typescript/models/IGitRepositoryConfiguration";
import { Type } from "./RepositoriesTypes";

// TODO: add description
describe("", () => {
	beforeEach(() => {
		container.snapshot();
	});

	afterEach(() => {
		container.restore();
	});

	it("clone branch data of wash-ideas repository without crash", async () => {
		const config = container.get<IRepositoryConfiguration>(Type.GITHUB);
		const context: IContext = {
			user: {
				name: "Alessandro Accardo",
				email: "julius8774@gmail.com"
			},
			configuration: config
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
		const config = container.get<IRepositoryConfiguration>(Type.GITHUB);
		const context: IContext = {
			user: {
				name: "Alessandro Accardo",
				email: "julius8774@gmail.com"
			},
			configuration: config
		};

		const obj: IPersistible = {
			title: `test_${new Date().toISOString()}`,
			encoding: "utf-8"
		};

		const repo = new GitRepository<IPersistible>();
		repo.init(context);
		await repo.close();
	});
});
