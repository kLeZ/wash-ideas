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

import { AppBar, CssBaseline, IconButton, ListItemIcon, MenuItem, Toolbar, Typography } from "@material-ui/core";
import { createMuiTheme, MuiThemeProvider, Theme } from "@material-ui/core/styles";
import {
	Add as AddIcon,
	Assignment as AssignmentIcon,
	Description as DescriptionIcon,
	Menu as MenuIcon,
	Refresh as RefreshIcon,
} from "@material-ui/icons";
import * as React from "react";
import { container } from "../ioc/inversify.config";
import { IContext } from "../models/IContext";
import { IGitRepositoryConfiguration } from "../models/IGitRepositoryConfiguration";
import Project from "../models/Project";
import { Types } from "../repository/Symbols";
import Localization from "../util/Localization";
import { logComponent } from "../util/Logging";
import ActionsMenu from "./ActionsMenu";
import ConfigurationForm from "./forms/ConfigurationForm";
import SaveForm from "./forms/SaveForm";
import SideBar from "./SideBar";
import WashBoard from "./WashBoard";

class App extends React.Component {
	private sidebar: React.RefObject<SideBar>;
	private board: React.RefObject<WashBoard>;
	private saveForm: React.RefObject<SaveForm>;
	private addMenu: React.RefObject<ActionsMenu>;

	constructor(props: any) {
		super(props);
		this.sidebar = React.createRef<SideBar>();
		this.board = React.createRef<WashBoard>();
		this.saveForm = React.createRef<SaveForm>();
		this.addMenu = React.createRef<ActionsMenu>();
		this.onToggleSideBar = this.onToggleSideBar.bind(this);
		this.doLoad = this.doLoad.bind(this);
		this.onRefresh = this.onRefresh.bind(this);
		this.onAdd = this.onAdd.bind(this);
	}

	public render() {
		const theme: Theme = createMuiTheme({
			palette: {
				type: "dark",
			},
		});
		return (
			<MuiThemeProvider theme={theme}>
				<CssBaseline />
				<SideBar open={true} side="left" ref={this.sidebar}>
					<ConfigurationForm load={this.doLoad} />
				</SideBar>
				<AppBar position="sticky" color="default">
					<Toolbar>
						<IconButton className="grow" color="inherit" aria-label="Menu" onClick={this.onToggleSideBar}>
							<MenuIcon />
						</IconButton>
						<Typography className="grow" variant="h6" color="inherit">
							{container.get<Localization>(Types.LOCALIZATION).t("app.title")}
						</Typography>
						<ActionsMenu menuId="persistible-type-menu" buttonContent={<AddIcon />} ref={this.addMenu}>
							<MenuItem onClick={this.onAdd} data-type="Project">
								<ListItemIcon>
									<AssignmentIcon />
								</ListItemIcon>
								<Typography noWrap>
									{container.get<Localization>(Types.LOCALIZATION).t("app.project_item")}
								</Typography>
							</MenuItem>
							<MenuItem onClick={this.onAdd} data-type="Generic">
								<ListItemIcon>
									<DescriptionIcon />
								</ListItemIcon>
								<Typography noWrap>
									{container.get<Localization>(Types.LOCALIZATION).t("app.persistible_item")}
								</Typography>
							</MenuItem>
						</ActionsMenu>
						<IconButton color="inherit" aria-label="Refresh" onClick={this.onRefresh}>
							<RefreshIcon />
						</IconButton>
					</Toolbar>
				</AppBar>
				<WashBoard ref={this.board} />
				<SaveForm onClosing={this.onRefresh} ref={this.saveForm} />
			</MuiThemeProvider>
		);
	}

	private onAdd(e: React.MouseEvent<HTMLElement>) {
		if (container.isBound(Types.CONTEXT)) {
			const ctx = container.get<IContext>(Types.CONTEXT);
			const type = e.currentTarget.dataset.type;
			let item = null;
			switch (type) {
				case "Project": {
					const date = new Date();
					const prj = new Project();
					prj.created = date;
					prj.modified = date;
					prj.author = ctx.user;
					prj.editor = ctx.user;
					item = prj;
					break;
				}
				default: {
					item = {
						title: "",
						encoding: "utf8",
						type: "Generic",
					};
					break;
				}
			}
			this.addMenu.current.close();
			this.saveForm.current.open(undefined, item);
		}
	}

	private onToggleSideBar() {
		this.sidebar.current.toggleSideBar();
	}

	private onRefresh() {
		if (container.isBound(Types.CONTEXT)) {
			const ctx = container.get<IContext>(Types.CONTEXT);
			const type = (ctx.configuration as IGitRepositoryConfiguration).oauth2format;
			this.board.current.loadItems(type);
		}
	}

	private doLoad() {
		this.onToggleSideBar();
		const ctx = container.get<IContext>(Types.CONTEXT);
		logComponent.debug(`Loaded Context :: ${JSON.stringify(ctx)}`);
		const type = (ctx.configuration as IGitRepositoryConfiguration).oauth2format;
		this.board.current.loadItems(type, true);
		logComponent.debug("Just set WashBoard component");
	}
}
export default App;
