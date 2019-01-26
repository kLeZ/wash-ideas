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

import { Button, Input, InputLabel, List, ListItem } from "@material-ui/core";
import * as React from "react";
import { container } from "../ioc/inversify.config";
import { IContext } from "../models/IContext";
import { IGitRepositoryConfiguration } from "../models/IGitRepositoryConfiguration";
import { IPersistible } from "../models/IPersistible";
import { IUser } from "../models/IUser";
import Project from "../models/Project";
import { PersistibleType } from "../models/Symbols";
import { IRepository } from "../repository/IRepository";
import { Types } from "../repository/Symbols";
import Extender from "../util/Extender";
import Localization from "../util/Localization";
import { logComponent } from "../util/Logging";
import "./modal/Modal.css";

interface ISaveFormState {
	project: Project;
	configuration: IGitRepositoryConfiguration;
	user: IUser;
}

interface ISaveFormProps {
	close: () => void;
}

export default class SaveForm extends React.Component<ISaveFormProps, ISaveFormState> {
	private l10n: any;
	private close: () => void;

	constructor(props: ISaveFormProps) {
		super(props);
		this.close = props.close;
		this.save = this.save.bind(this);
		this.l10n = container.get<Localization>(Types.LOCALIZATION).t("app.save_form", { returnObjects: true });
		const context = container.get<IContext>(Types.CONTEXT);
		const loggedUser = context.user;
		const config = context.configuration as IGitRepositoryConfiguration;
		this.state = {
			project: {
				title: "",
				description: "",
				encoding: "utf8",
				repoUrl: config.url,
				progress: 0,
				stars: 0,
				nextTaskHardness: 0,
				created: new Date(),
				modified: null,
				author: loggedUser,
				editor: loggedUser,
				getType() {
					return PersistibleType.PROJECT;
				}
			},
			configuration: config,
			user: loggedUser
		};
	}

	public async save() {
		const repository = container.get<IRepository<IPersistible>>(this.state.configuration.oauth2format);
		await repository.open();
		await repository.create(this.state.project);
		await repository.close();
		this.close();
	}

	public handleProjectChange(name: string) {
		return (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
			if (event.target != null) {
				const prev = JSON.stringify(this.state.project);
				logComponent.debug(`project change :: [${name}]: ${event.target.value} :: prev: ${prev}`);
				this.setState({
					project: Extender.extends(Extender.Default, {}, this.state.project, { [name]: event.target.value })
				});
			}
		};
	}

	public render() {
		return (
			<div>
				<div className="modal-wrapper">
					<div className="modal-header">
						<h3>{this.l10n.header}</h3>
					</div>
					<div className="modal-body">
						<List>
							<ListItem>
								<InputLabel htmlFor="title-compo">{this.l10n.title}</InputLabel>
								<Input
									id="title-compo"
									type="text"
									defaultValue={this.state.project.title}
									onChange={this.handleProjectChange("title")}
								/>
							</ListItem>
							<ListItem>
								<InputLabel htmlFor="description-compo">{this.l10n.description}</InputLabel>
								<Input
									id="description-compo"
									type="text"
									multiline={true}
									rows={6}
									defaultValue={this.state.project.description}
									onChange={this.handleProjectChange("description")}
								/>
							</ListItem>
						</List>
					</div>
					<div className="modal-footer">
						<Button className="btn-cancel" onClick={this.close}>
							{this.l10n.cancel_btn}
						</Button>
						<Button className="btn-save" onClick={this.save}>
							{this.l10n.save_btn}
						</Button>
					</div>
				</div>
			</div>
		);
	}
}
