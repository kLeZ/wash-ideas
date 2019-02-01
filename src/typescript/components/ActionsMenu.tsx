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

import { IconButton, Menu } from "@material-ui/core";
import * as React from "react";

interface IActionsMenuProps {
	menuId: string;
	buttonContent: React.ReactNode;
}

interface IActionsMenuState {
	anchorEl: HTMLElement;
}

class ActionsMenu extends React.Component<IActionsMenuProps, IActionsMenuState> {
	constructor(props: IActionsMenuProps) {
		super(props);
		this.handleMenuClick = this.handleMenuClick.bind(this);
		this.handleMenuClose = this.handleMenuClose.bind(this);
		this.state = {
			anchorEl: undefined
		};
	}

	public render() {
		return (
			<div>
				<IconButton
					aria-owns={this.state.anchorEl ? this.props.menuId : undefined}
					aria-haspopup="true"
					onClick={this.handleMenuClick}
				>
					{this.props.buttonContent}
				</IconButton>
				<Menu
					id={this.props.menuId}
					anchorEl={this.state.anchorEl}
					open={Boolean(this.state.anchorEl)}
					onClose={this.handleMenuClose}
				>
					{this.props.children}
				</Menu>
			</div>
		);
	}

	private handleMenuClick(e: React.MouseEvent<HTMLElement>) {
		this.setState({ anchorEl: e.currentTarget });
	}

	private handleMenuClose(e: React.SyntheticEvent<{}>) {
		this.setState({ anchorEl: null });
	}
}
export default ActionsMenu;
