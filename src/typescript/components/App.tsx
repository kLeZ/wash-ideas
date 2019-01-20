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

import { AppBar, CssBaseline, IconButton, Modal, Toolbar, Typography } from "@material-ui/core";
import { createMuiTheme, MuiThemeProvider, Theme } from "@material-ui/core/styles";
import { Add as AddIcon, Menu as MenuIcon, Refresh as RefreshIcon } from "@material-ui/icons";
import * as React from "react";
import { container } from "../ioc/inversify.config";
import { IContext } from "../models/IContext";
import { IGitRepositoryConfiguration } from "../models/IGitRepositoryConfiguration";
import { Types } from "../repository/Symbols";
import Localization from "../util/Localization";
import { logComponent } from "../util/Logging";
import ConfigurationForm from "./ConfigurationForm";
import SaveForm from "./SaveForm";
import SideBar from "./SideBar";
import WashBoard from "./WashBoard";

class App extends React.Component<any, any> {
	private sidebar: React.RefObject<SideBar>;
	private board: React.RefObject<WashBoard>;

	constructor(props: any) {
		super(props);
		this.sidebar = React.createRef<SideBar>();
		this.board = React.createRef<WashBoard>();
		this.toggle = this.toggle.bind(this);
		this.refresh = this.refresh.bind(this);
		this.handleOpenModal = this.handleOpenModal.bind(this);
		this.loadCallback = this.loadCallback.bind(this);
		this.state = {
			repoType: null,
			showModal: false
		};
	}

	public render() {
		const theme: Theme = createMuiTheme({
			palette: {
				type: "dark"
			}
		});
		return (
			<MuiThemeProvider theme={theme}>
				<CssBaseline />
				<SideBar open={true} side="left" ref={this.sidebar}>
					<ConfigurationForm loadCallback={this.loadCallback} />
				</SideBar>
				<AppBar position="sticky" color="default">
					<Toolbar>
						<IconButton className="grow" color="inherit" aria-label="Menu" onClick={this.toggle}>
							<MenuIcon />
						</IconButton>
						<Typography className="grow" variant="title" color="inherit">
							{container.get<Localization>(Types.LOCALIZATION).t("app.title")}
						</Typography>
						<IconButton color="inherit" aria-label="New" onClick={this.handleOpenModal}>
							<AddIcon />
						</IconButton>
						<IconButton color="inherit" aria-label="Refresh" onClick={this.refresh}>
							<RefreshIcon />
						</IconButton>
					</Toolbar>
				</AppBar>
				<WashBoard ref={this.board} />
				<Modal open={this.state.showModal}>
					<SaveForm />
				</Modal>
			</MuiThemeProvider>
		);
	}

	private handleOpenModal() {
		this.setState({ showModal: true });
	}

	private toggle() {
		this.sidebar.current.toggleSideBar();
	}

	private refresh() {
		const ctx = container.get<IContext>(Types.CONTEXT);
		const type = (ctx.configuration as IGitRepositoryConfiguration).oauth2format;
		this.board.current.loadItems(type);
	}

	private loadCallback() {
		this.toggle();
		const ctx = container.get<IContext>(Types.CONTEXT);
		logComponent.debug(`Loaded Context :: ${JSON.stringify(ctx)}`);
		const type = (ctx.configuration as IGitRepositoryConfiguration).oauth2format;
		this.board.current.loadItems(type);
		logComponent.debug("Just set WashBoard component");
	}
}
export default App;
