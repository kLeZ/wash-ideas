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

import { Card as MUICard, CardContent, CardHeader, ListItemIcon, MenuItem, Typography } from "@material-ui/core";
import { Delete as DeleteIcon, Edit as EditIcon, MoreVert as MoreVertIcon } from "@material-ui/icons";
import * as React from "react";
import { container } from "../../ioc/inversify.config";
import { IPersistible } from "../../models/IPersistible";
import { Types } from "../../repository/Symbols";
import Localization from "../../util/Localization";
import ActionsMenu from "../ActionsMenu";
import Confirm from "../Confirm";
import ICardProps from "./ICardProps";
import ICardState from "./ICardState";

class Card extends React.Component<ICardProps, ICardState> {
	private menu: React.RefObject<ActionsMenu>;
	private confirm: React.RefObject<Confirm>;

	constructor(props: ICardProps) {
		super(props);
		this.delete = this.delete.bind(this);
		this.edit = this.edit.bind(this);
		this.menu = React.createRef();
		this.confirm = React.createRef();
		this.state = {
			title: props.title || props.item.title,
			item: props.item,
		};
	}

	public render() {
		const confirmL10n = container
			.get<Localization>(Types.LOCALIZATION)
			.t("cards.confirm_delete", { returnObjects: true });
		const item: IPersistible = this.state.item;
		return (
			<MUICard style={this.props.style}>
				<CardHeader
					avatar={this.props.avatar}
					action={
						<ActionsMenu menuId="actions-menu" buttonContent={<MoreVertIcon />} ref={this.menu}>
							<MenuItem onClick={this.edit} data-title={item.title}>
								<ListItemIcon>
									<EditIcon />
								</ListItemIcon>
								<Typography noWrap>
									{container.get<Localization>(Types.LOCALIZATION).t("cards.edit_item")}
								</Typography>
							</MenuItem>
							<MenuItem onClick={this.delete} data-title={item.title}>
								<ListItemIcon>
									<DeleteIcon />
								</ListItemIcon>
								<Typography noWrap>
									{container.get<Localization>(Types.LOCALIZATION).t("cards.delete_item")}
								</Typography>
							</MenuItem>
							{this.props.menuItems}
						</ActionsMenu>
					}
					title={this.state.title}
					subheader={this.props.subheader}
				/>
				<CardContent>{this.props.children}</CardContent>
				{this.props.footer}
				<Confirm
					ref={this.confirm}
					title={confirmL10n.title}
					message={confirmL10n.message}
					agreeText={confirmL10n.agreeText}
					disagreeText={confirmL10n.disagreeText}
				/>
			</MUICard>
		);
	}

	private edit(e: React.MouseEvent<HTMLElement>) {
		this.menu.current.close();
		return this.props.edit(e.currentTarget.dataset.title);
	}

	private delete(e: React.MouseEvent<HTMLElement>) {
		this.menu.current.close();
		const title = e.currentTarget.dataset.title;
		this.confirm.current.open(() => {
			this.props.delete(title);
		});
	}
}
export default Card;
