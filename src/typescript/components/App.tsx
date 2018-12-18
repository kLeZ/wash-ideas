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

import { IconButton } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, MuiThemeProvider, Theme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import * as React from "react";
import { container } from "../../../test/typescript/ioc/inversify.config";
import { IContext } from "../models/IContext";
import { IGitRepositoryConfiguration } from "../models/IGitRepositoryConfiguration";
import { IPersistible } from "../models/IPersistible";
import Project from "../models/Project";
import { IRepository } from "../repository/IRepository";
import { Types } from "../repository/Symbols";
import Localization from "../util/Localization";
import { logComponent } from "../util/Logging";
import ConfigurationForm from "./ConfigurationForm";
import SideBar from "./SideBar";

class App extends React.Component<any, any> {
	private sidebar: React.RefObject<SideBar>;

	constructor(props: any) {
		super(props);
		this.sidebar = React.createRef<SideBar>();
		this.toggle = this.toggle.bind(this);
	}

	public render() {
		const theme: Theme = createMuiTheme();
		return (
			<MuiThemeProvider theme={theme}>
				<CssBaseline />
				<SideBar open={false} side="left" ref={this.sidebar}>
					<ConfigurationForm loadCallback={this.loadCallback()} />
				</SideBar>
				<AppBar position="static" color="default">
					<Toolbar>
						<IconButton color="inherit" aria-label="Menu" onClick={this.toggle}>
							<MenuIcon />
						</IconButton>
						<Typography variant="title" color="inherit">
							{container.get<Localization>(Types.LOCALIZATION).t("app.title")}
						</Typography>
					</Toolbar>
				</AppBar>

			</MuiThemeProvider>
		);
	}

	private toggle() {
		this.sidebar.current.toggleSideBar();
	}

	private loadCallback() {
		const self = this;
		return () => {
			self.toggle();
			const ctx = container.get<IContext>(Types.CONTEXT);
			logComponent.debug(`Loaded Context :: ${JSON.stringify(ctx)}`);
			const type = (ctx.configuration as IGitRepositoryConfiguration).oauth2format;
			this.loadItems(type);
		};
	}

	private async loadItems(type: string) {
		const repo = container.get<IRepository<IPersistible>>(type);
		await repo.open();
		repo.find(_ => true).then(items => {
			for (const item of items) {
				if (item instanceof Project) {
					// TODO: instantiate project card
				}
			}
		});
	}
}
export default App;
