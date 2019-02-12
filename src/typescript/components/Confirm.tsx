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

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@material-ui/core";
import * as React from "react";

interface IConfirmState {
	show: boolean;
	onClosing: (...args: any[]) => any;
}

interface IConfirmProps {
	title: string;
	message: string;
	agreeText: string;
	disagreeText: string;
}

class Confirm extends React.Component<IConfirmProps, IConfirmState> {
	constructor(props: IConfirmProps) {
		super(props);
		this.close = this.close.bind(this);
		this.ok = this.ok.bind(this);
		this.state = {
			show: false,
			onClosing: () => {
				/*boh */
			},
		};
	}

	public render() {
		return (
			<Dialog aria-labelledby="responsive-dialog-title" maxWidth={"md"} fullWidth open={this.state.show}>
				<DialogTitle id="responsive-dialog-title">{this.props.title}</DialogTitle>
				<DialogContent>
					<Typography noWrap>{this.props.message}</Typography>
				</DialogContent>
				<DialogActions>
					<Button onClick={this.close}>{this.props.disagreeText}</Button>
					<Button onClick={this.ok}>{this.props.agreeText}</Button>
				</DialogActions>
			</Dialog>
		);
	}

	public open(onClosing: (...args: any[]) => any) {
		this.setState({ show: true, onClosing });
	}

	private close() {
		this.setState({ show: false });
	}

	private ok() {
		this.close();
		this.state.onClosing();
	}
}
export default Confirm;
