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

import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@material-ui/core";
import { Cancel as CancelIcon, Save as SaveIcon } from "@material-ui/icons";
import * as React from "react";
import { container } from "../../ioc/inversify.config";
import { IContext } from "../../models/IContext";
import { IGitRepositoryConfiguration } from "../../models/IGitRepositoryConfiguration";
import { IPersistible } from "../../models/IPersistible";
import { PersistibleType } from "../../models/Symbols";
import { IRepository } from "../../repository/IRepository";
import { Types } from "../../repository/Symbols";
import Extender from "../../util/Extender";
import Localization from "../../util/Localization";
import { logComponent } from "../../util/Logging";
import PersistibleForm from "./PersistibleForm";

interface ISaveFormState {
	show: boolean;
	edit: boolean;
	item: IPersistible;
}

interface ISaveFormProps {
	onClosing: () => void;
	createDefaultItem?: () => IPersistible;
}

export default class SaveForm extends React.Component<ISaveFormProps, ISaveFormState> {
	private refClose: () => void;

	constructor(props: ISaveFormProps) {
		super(props);
		this.refClose = props.onClosing;
		this.open = this.open.bind(this);
		this.close = this.close.bind(this);
		this.save = this.save.bind(this);
		this.getForm = this.getForm.bind(this);
		this.state = {
			show: false,
			edit: false,
			item: undefined
		};
	}

	public open(title?: string) {
		if (title) {
			const ctx = container.get<IContext>(Types.CONTEXT);
			const type: string = (ctx.configuration as IGitRepositoryConfiguration).oauth2format;
			const repository = container.get<IRepository<IPersistible>>(type);
			repository.findOne(title).then(item => {
				this.setState({
					show: true,
					edit: true,
					item,
				});
			});
		} else {
			this.setState({
				show: true,
				item: this.props.createDefaultItem(),
			});
		}
	}

	public render() {
		const l10n = container.get<Localization>(Types.LOCALIZATION).t("app.save_form", { returnObjects: true });
		return (
			<Dialog aria-labelledby="responsive-dialog-title" maxWidth={"md"} fullWidth open={this.state.show}>
				<DialogTitle id="responsive-dialog-title">{l10n.header}</DialogTitle>
				{this.getForm()}
				{/* <TextField
						id="title"
						label={l10n.title}
						type="text"
						defaultValue={this.state.item.title}
						onChange={this.handleProjectChange("title")}
						margin="dense"
						fullWidth
						required
						autoFocus
					/>
					<TextField
						id="repoUrl"
						label={l10n.repo_url}
						type="text"
						defaultValue={this.state.item.repoUrl}
						onChange={this.handleProjectChange("repoUrl")}
						margin="dense"
						fullWidth
					/>
					<TextField
						id="description"
						label={l10n.description}
						type="text"
						defaultValue={this.state.item.description}
						onChange={this.handleProjectChange("description")}
						margin="dense"
						fullWidth
						required
						multiline
						rows={6}
					/> */}
				<DialogActions>
					<Button variant="contained" color="secondary" onClick={this.close}>
						<CancelIcon />
						{l10n.cancel_btn}
					</Button>
					<Button variant="contained" color="primary" onClick={this.save}>
						<SaveIcon />
						{l10n.save_btn}
					</Button>
				</DialogActions>
			</Dialog>
		);
	}

	private close() {
		this.setState({ show: false });
		this.refClose();
	}

	private save() {
		const that = this;
		const ctx = container.get<IContext>(Types.CONTEXT);
		const type: string = (ctx.configuration as IGitRepositoryConfiguration).oauth2format;
		const repository = container.get<IRepository<IPersistible>>(type);
		repository.create(this.state.item).then(() => {
			that.close();
		});
	}

	private handleChange(
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
		field: string
	) {
		if (e.target != null) {
			const prev = JSON.stringify(this.state.item);
			logComponent.debug(`project change :: [${field}]: ${e.target.value} :: prev: ${prev}`);
			this.setState({
				item: Extender.extends(Extender.Default, {}, this.state.item, { [field]: e.target.value }),
			});
		}
	}
	private getForm(): React.ReactNode {
		let form = null;
		if (this.state.item) {
			switch (this.state.item.getType()) {
				case PersistibleType.PROJECT: {
					form = <PersistibleForm item={this.state.item} change={this.handleChange.bind(this)} />;
					break;
				}
				default: {
					form = <PersistibleForm item={this.state.item} change={this.handleChange.bind(this)} />;
					break;
				}
			}
		}
		return form;
	}
}
