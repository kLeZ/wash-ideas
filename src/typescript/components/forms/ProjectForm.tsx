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
import Project from "../../models/Project";
import { Types } from "../../repository/Symbols";
import Localization from "../../util/Localization";
import PersistibleForm from "./PersistibleForm";

class ProjectForm extends PersistibleForm {
	public render() {
		const l10n = container.get<Localization>(Types.LOCALIZATION).t("forms.project_form", { returnObjects: true });
		const item = this.props.item as Project;
		return (
			<DialogContent>
				<TextField
					type="text"
					label={l10n.title}
					inputProps={{
						"data-field": "title",
					}}
					defaultValue={item.title}
					onChange={this.change.bind(this)}
					margin="dense"
					fullWidth
					required
					autoFocus
				/>
				<TextField
					type="text"
					label={l10n.description}
					inputProps={{
						"data-field": "description",
					}}
					defaultValue={item.description}
					onChange={this.change.bind(this)}
					margin="dense"
					fullWidth
					required
					multiline
					rows={6}
				/>
				<TextField
					type="text"
					label={l10n.repo_url}
					inputProps={{
						"data-field": "repoUrl",
					}}
					defaultValue={item.repoUrl}
					onChange={this.change.bind(this)}
					margin="dense"
					fullWidth
				/>
				<TextField
					type="number"
					label={l10n.progress}
					inputProps={{
						"data-field": "progress",
					}}
					defaultValue={item.progress}
					onChange={this.change.bind(this)}
					margin="dense"
					fullWidth
				/>
				<TextField
					type="number"
					label={l10n.nextTaskHardness}
					inputProps={{
						"data-field": "nextTaskHardness",
					}}
					defaultValue={item.nextTaskHardness}
					onChange={this.change.bind(this)}
					margin="dense"
					fullWidth
				/>
			</DialogContent>
		);
	}
}
export default ProjectForm;
