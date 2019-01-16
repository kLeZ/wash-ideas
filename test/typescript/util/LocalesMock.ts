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

const resources = {
	en: {
		translation: {
			main: {
				test: "mickey",
				test_obj: {
					lang: "EN",
					prop1: "aaa",
					prop2: "bbb",
					prop3: "ccc",
					prop4: {
						prop4_1: 111,
						prop4_2: 222,
					},
					prop5: "ddd",
				},
			},
			app: {
				title: "Wash Ideas - Borogoves.",
				configuration_form: {
					token_label: "Access Token",
					token_visibility_label: "Toggle token visibility",
					url_label: "Url",
					oauth2format_label: "OAuth2 Provider",
					name_label: "Name",
					email_label: "Email",
					load_button_text: "Load",
				},
			},
			cards: {
				edit_item: "Edit",
				project: {
					goto_repo_url: "Navigate to code repository",
				},
			},
		},
	},
	it: {
		translation: {
			main: {
				test: "topolino",
				test_obj: {
					lang: "IT",
					prop1: "aaa",
					prop2: "bbb",
					prop3: "ccc",
					prop4: {
						prop4_1: 111,
						prop4_2: 222,
					},
					prop5: "ddd",
				},
			},
			app: {
				title: "Wash Ideas - Antani.",
				configuration_form: {
					token_label: "Token di accesso",
					token_visibility_label: "Commuta visibilità del token",
					url_label: "Url",
					oauth2format_label: "Fornitore OAuth2",
					name_label: "Nome",
					email_label: "Email",
					load_button_text: "Carica",
				},
			},
			cards: {
				edit_item: "Modifica",
				project: {
					goto_repo_url: "Vai al repository dei sorgenti",
				},
			},
		},
	},
};
export { resources };
