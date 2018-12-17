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

import { Types } from "../../../src/typescript/repository/Symbols";
import Localization from "../../../src/typescript/util/Localization";
import { container } from "../ioc/inversify.config";

it("Test localization in english", () => {
	const i18n = container.get<Localization>(Types.LOCALIZATION);
	i18n.changeLanguage("en");
	expect(i18n.t("main.test")).toBe("goofy");
});
it("Test localization in italian", () => {
	const i18n = container.get<Localization>(Types.LOCALIZATION);
	i18n.changeLanguage("it");
	expect(i18n.t("main.test")).toBe("pippo");
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
	});
});
