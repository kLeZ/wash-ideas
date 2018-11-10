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
import { Types } from "../../../src/typescript/repository/Symbols";
import { container } from "../ioc/inversify.config";

describe("Test for inversify API generic usage", () => {
	beforeEach(() => {
		container.snapshot();
	});

	afterEach(() => {
		container.restore();
	});

	it("Test context bind on the fly", async () => {
		const configuration: IGitRepositoryConfiguration = {
			type: "git",
			dir: "wash-ideas",
			branch: "data",
			url: "https://github.com/kLeZ/wash-ideas",
			oauth2format: "github",
			token: "",
			fsconf: { fs: "InMemory", options: {} }
		};
		let ctx: IContext = {
			user: {
				name: "Alessandro Accardo",
				email: "julius8774@gmail.com"
			},
			configuration
		};
		container.bind<IContext>(Types.CONTEXT).toConstantValue(ctx);
		ctx = container.get<IContext>(Types.CONTEXT);
		expect(ctx.user.name).toBe("Alessandro Accardo");
		ctx.user.name = "Fabio Scotto di Santolo";
		ctx = container.get<IContext>(Types.CONTEXT);
		expect(ctx.user.name).toBe("Fabio Scotto di Santolo");
	});
});
