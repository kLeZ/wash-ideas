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

it("Test localization in english", () => {
	const i18n = container.get<Localization>(Types.LOCALIZATION);
	i18n.changeLanguage("en");
	expect(i18n.t("main.test")).toBe("mickey");
});
it("Test localization in italian", () => {
	const i18n = container.get<Localization>(Types.LOCALIZATION);
	i18n.changeLanguage("it");
	expect(i18n.t("main.test")).toBe("topolino");
});
it("Test localization multiple items in english", () => {
	const i18n = container.get<Localization>(Types.LOCALIZATION);
	i18n.changeLanguage("en");
	expect(i18n.t("main.test_obj", { returnObjects: true })).toEqual({
		lang: "EN",
		prop1: "aaa",
		prop2: "bbb",
		prop3: "ccc",
		prop4: {
			prop4_1: 111,
			prop4_2: 222,
		},
		prop5: "ddd"
	});
});
it("Test localization multiple items in italian", () => {
	const i18n = container.get<Localization>(Types.LOCALIZATION);
	i18n.changeLanguage("it");
	expect(i18n.t("main.test_obj", { returnObjects: true })).toEqual({
		lang: "IT",
		prop1: "aaa",
		prop2: "bbb",
		prop3: "ccc",
		prop4: {
			prop4_1: 111,
			prop4_2: 222,
		},
		prop5: "ddd"
	});
});
