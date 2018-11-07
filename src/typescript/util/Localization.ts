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

import * as i18next from "i18next";

export class Localization {
	private i18n: i18next.i18n;

	constructor(res: any) {
		this.i18n = i18next.init({
			fallbackLng: "en",
			resources: res
		});
	}

	public t(key: string | string[], options?: i18next.TranslationOptions<object>): any {
		return this.i18n.t(key, options);
	}

	public changeLanguage(lng: string, callback?: i18next.Callback): void {
		this.i18n.changeLanguage(lng, callback);
	}
}
export default Localization;
