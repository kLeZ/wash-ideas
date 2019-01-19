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

import { Button, Divider, List, ListItem, TextField } from "@material-ui/core";
import * as React from "react";
import { container } from "../ioc/inversify.config";
import { Types } from "../repository/Symbols";
import Localization from "../util/Localization";

import "./modal/Modal.css";

export default class SaveForm extends React.Component {
	private l10n: any;

	constructor(props: any) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.l10n = container.get<Localization>(Types.LOCALIZATION).t("app.save_form", { returnObjects: true });
	}

	public handleSubmit() {
		// TODO: not implemented
		throw new Error("is not implemented yet");
	}

	public render() {
		return (
			<div id="modal-wrapper">
				<form onSubmit={this.handleSubmit}>
					<div className="modal-header">
						<h3>Modal Header</h3>
					</div>
					<div className="modal-body">
						<input type="text" name="title" id="title" />
					</div>
					<div className="modal-footer">
						<button type="submit">Save</button>
					</div>
				</form>
			</div>
		);
	}
}
