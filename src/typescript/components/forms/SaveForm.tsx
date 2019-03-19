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

import { Button, Dialog, DialogActions, DialogTitle } from "@material-ui/core";
import { Cancel as CancelIcon, Save as SaveIcon } from "@material-ui/icons";
import * as React from "react";
import { container } from "../../ioc/inversify.config";
import { IContext } from "../../models/IContext";
import { IGitRepositoryConfiguration } from "../../models/IGitRepositoryConfiguration";
import { IPersistible } from "../../models/IPersistible";
import { IRepository } from "../../repository/IRepository";
import { Types } from "../../repository/Symbols";
import Extender from "../../util/Extender";
import Localization from "../../util/Localization";
import { logComponent } from "../../util/Logging";
import PersistibleForm from "./PersistibleForm";
import ProjectForm from "./ProjectForm";

interface ISaveFormState {
	show: boolean;
	edit: boolean;
	item: IPersistible;
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
		this.close = this.close.bind(this);
		this.save = this.save.bind(this);
		this.getForm = this.getForm.bind(this);
		this.state = {
			show: false,
			edit: false,
			item: undefined,
		};
	}

	public render() {
		const l10n = container.get<Localization>(Types.LOCALIZATION).t("app.save_form", { returnObjects: true });
		const Form = this.state.item ? this.getForm : () => <span />;
		return (
			<Dialog aria-labelledby="responsive-dialog-title" maxWidth={"md"} fullWidth open={this.state.show}>
				<DialogTitle id="responsive-dialog-title">{l10n.header}</DialogTitle>
				<Form />
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

	public async open(title?: string, defaultItem?: IPersistible) {
		logComponent.trace(`Just called SaveForm.open(${title})`);
		let item = null;
		let edit = false;
		if (title) {
			const ctx = container.get<IContext>(Types.CONTEXT);
			const type: string = (ctx.configuration as IGitRepositoryConfiguration).oauth2format;
			const repository = container.get<IRepository<IPersistible>>(type);
			item = await repository.findOne(title);
			edit = true;
		} else {
			item = defaultItem;
		}
		const show = item !== undefined && item !== null;
		logComponent.trace(
			`SaveForm data while opening: { show: ${show}, edit: ${edit}, item: ${JSON.stringify(item)} }`
		);
		this.setState({
			edit,
			show,
			item,
		});
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
		if (this.state.edit === false) {
			repository.create(this.state.item).then(() => {
				that.close();
			});
		} else {
			repository.update(this.state.item.title, this.state.item).then(() => {
				that.close();
			});
		}
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
				/*
				 * FIXME: e.target.value è una stringa, mentre io sto tentando
				 * di salvare in un attributo che potrebbe non esserlo.
				 * Possibili side effects.
				 */
			});
		}
	}

	private getForm(): JSX.Element {
		let form: JSX.Element = null;
		switch (this.state.item.type) {
			case "Project": {
				form = <ProjectForm edit={this.state.edit} item={this.state.item} change={this.handleChange.bind(this)} />;
				break;
			}
			default: {
				form = <PersistibleForm  edit={this.state.edit} item={this.state.item} change={this.handleChange.bind(this)} />;
				break;
			}
		}
		return form;
	}
}
