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

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@material-ui/core";
import * as React from "react";
import { container } from "../ioc/inversify.config";
import { IContext } from "../models/IContext";
import { IGitRepositoryConfiguration } from "../models/IGitRepositoryConfiguration";
import { IPersistible } from "../models/IPersistible";
import Project from "../models/Project";
import { IRepository } from "../repository/IRepository";
import { Types } from "../repository/Symbols";
import Extender from "../util/Extender";
import Localization from "../util/Localization";
import { logComponent } from "../util/Logging";

interface ISaveFormState {
	show: boolean;
	project: Project;
}

interface ISaveFormProps {
	onClosing: () => void;
}

export default class SaveForm extends React.Component<ISaveFormProps, ISaveFormState> {
	private refClose: () => void;

	constructor(props: ISaveFormProps) {
		super(props);
		this.refClose = props.onClosing;
		this.open = this.open.bind(this);
		this.save = this.save.bind(this);
		this.close = this.close.bind(this);
		this.state = {
			show: false,
			project: null,
		};
	}

	public open() {
		const ctx = container.get<IContext>(Types.CONTEXT);
		const creationDate = new Date();
		this.setState({
			show: true,
			project: Extender.extends(Extender.Default, {}, new Project(), {
				author: ctx.user,
				editor: ctx.user,
				created: creationDate,
				modified: creationDate,
			}),
		});
	}

	public close() {
		this.setState({ show: false });
		this.refClose();
	}

	public save() {
		const that = this;
		const ctx = container.get<IContext>(Types.CONTEXT);
		const type: string = (ctx.configuration as IGitRepositoryConfiguration).oauth2format;
		const repository = container.get<IRepository<IPersistible>>(type);
		repository.create(this.state.project).then(() => {
			that.close();
		});
	}

	public handleProjectChange(name: string) {
		return (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
			if (event.target != null) {
				const prev = JSON.stringify(this.state.project);
				logComponent.debug(`project change :: [${name}]: ${event.target.value} :: prev: ${prev}`);
				this.setState({
					project: Extender.extends(Extender.Default, {}, this.state.project, { [name]: event.target.value }),
				});
			}
		};
	}

	public render() {
		const l10n = container.get<Localization>(Types.LOCALIZATION).t("app.save_form", { returnObjects: true });
		return (
			<Dialog aria-labelledby="responsive-dialog-title" maxWidth={"md"} fullWidth open={this.state.show}>
				<DialogTitle id="responsive-dialog-title">{l10n.header}</DialogTitle>
				<DialogContent>
					<TextField
						id="title"
						label={l10n.title}
						type="text"
						defaultValue={this.state.project.title}
						onChange={this.handleProjectChange("title")}
						autoFocus
						margin="dense"
						required
						fullWidth
					/>
					<TextField
						id="description"
						label={l10n.description}
						type="text"
						defaultValue={this.state.project.description}
						onChange={this.handleProjectChange("description")}
						margin="dense"
						multiline
						rows={6}
						required
						fullWidth
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={this.close} color="primary">
						{l10n.cancel_btn}
					</Button>
					<Button onClick={this.save} color="primary">
						{l10n.save_btn}
					</Button>
				</DialogActions>
			</Dialog>
		);
	}
}
