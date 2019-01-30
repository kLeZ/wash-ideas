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

import {
	Card as MUICard,
	CardContent,
	CardHeader,
	IconButton,
	ListItemIcon,
	Menu,
	MenuItem,
	Typography,
} from "@material-ui/core";
import { Delete as DeleteIcon, Edit as EditIcon, MoreVert as MoreVertIcon } from "@material-ui/icons";
import * as React from "react";
import { container } from "../../ioc/inversify.config";
import { IPersistible } from "../../models/IPersistible";
import { Types } from "../../repository/Symbols";
import Localization from "../../util/Localization";
import ICardProps from "./ICardProps";
import ICardState from "./ICardState";

class Card extends React.Component<ICardProps, ICardState> {
	constructor(props: ICardProps) {
		super(props);
		this.handleMenuClick = this.handleMenuClick.bind(this);
		this.handleMenuClose = this.handleMenuClose.bind(this);
		this.delete = this.delete.bind(this);
		this.edit = this.edit.bind(this);
		this.state = {
			title: props.title || props.item.title,
			item: props.item,
			anchorEl: null,
		};
	}

	public render() {
		const item: IPersistible = this.state.item;
		return (
			<MUICard style={this.props.style}>
				<CardHeader
					avatar={this.props.avatar}
					action={
						<div>
							<IconButton
								aria-owns={this.state.anchorEl ? "actions-menu" : undefined}
								aria-haspopup="true"
								onClick={this.handleMenuClick}
							>
								<MoreVertIcon />
							</IconButton>
							<Menu
								id="actions-menu"
								anchorEl={this.state.anchorEl}
								open={Boolean(this.state.anchorEl)}
								onClose={this.handleMenuClose}
							>
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
							</Menu>
						</div>
					}
					title={this.state.title}
					subheader={this.props.subheader}
				/>
				<CardContent>{this.props.children}</CardContent>
				{this.props.footer}
			</MUICard>
		);
	}

	private handleMenuClick(e: React.MouseEvent<HTMLElement>) {
		this.setState({ anchorEl: e.currentTarget });
	}

	private handleMenuClose(e: React.SyntheticEvent<{}>) {
		this.setState({ anchorEl: null });
	}

	private edit(e: React.MouseEvent<HTMLElement>) {
		return this.props.edit(e, e.currentTarget.dataset.title);
	}

	private delete(e: React.MouseEvent<HTMLElement>) {
		return this.props.delete(e, e.currentTarget.dataset.title);
	}
}
export default Card;
