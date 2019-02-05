// Copyright (C) 2019 Alessandro Accardo a.k.a. kLeZ & Fabio Scotto di Santolo a.k.a. Plague
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

import { DialogContent, TextField } from "@material-ui/core";
import * as React from "react";
import { container } from "../../ioc/inversify.config";
import { Types } from "../../repository/Symbols";
import Localization from "../../util/Localization";
import IPersistibleFormProps from "./IPersistibleFormProps";

class PersistibleForm extends React.Component<IPersistibleFormProps> {
	constructor(props: IPersistibleFormProps) {
		super(props);
	}

	public render() {
		const l10n = container
			.get<Localization>(Types.LOCALIZATION)
			.t("forms.persistible_form", { returnObjects: true });
		return (
			<DialogContent>
				<TextField
					type="text"
					label={l10n.title}
					inputProps={{
						/* infame fracico... dentro all'inputProps l'ho dovuto mettere... */
						"data-field": "title",
					}}
					defaultValue={this.props.item.title}
					onChange={this.change.bind(this)}
					margin="dense"
					fullWidth
					required
					autoFocus
				/>
			</DialogContent>
		);
	}

	protected change(e: React.ChangeEvent<HTMLElement>) {
		return this.props.change(e, e.currentTarget.dataset.field);
	}
}
export default PersistibleForm;
