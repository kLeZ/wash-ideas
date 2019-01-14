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

import {
	Avatar,
	Badge,
	Card,
	CardContent,
	CardHeader,
	IconButton,
	LinearProgress,
	Menu,
	MenuItem,
	Typography,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import * as React from "react";
import { container } from "../../ioc/inversify.config";
import Project from "../../models/Project";
import { Types } from "../../repository/Symbols";
import Localization from "../../util/Localization";
import Rating from "../Rating";
import ICardProps from "./ICardProps";

interface IProjectCardState {
	item: Project;
	anchorEl: any;
}

class ProjectCard extends React.Component<ICardProps, IProjectCardState> {
	constructor(props: ICardProps) {
		super(props);
		this.handleMenuClick = this.handleMenuClick.bind(this);
		this.handleMenuClose = this.handleMenuClose.bind(this);
		this.goTo = this.goTo.bind(this);
		this.state = {
			item: props.item as Project,
			anchorEl: null,
		};
	}

	public render() {
		const item: Project = this.state.item;
		return (
			<Card style={this.props.style}>
				<CardHeader
					avatar={
						<Avatar aria-label="Project">
							{item.author.name
								.split(" ")
								.map(w => w.charAt(0).toUpperCase())
								.join("")}
						</Avatar>
					}
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
								<MenuItem onClick={this.goTo(this.state.item.repoUrl)}>
									{container.get<Localization>(Types.LOCALIZATION).t("cards.project.goto_repo_url")}
								</MenuItem>
							</Menu>
						</div>
					}
					title={
						<Badge color="primary" badgeContent={item.nextTaskHardness} style={{ padding: "0 16px" }}>
							{item.title}
						</Badge>
					}
					subheader={item.modified.toLocaleString()}
				/>
				<CardContent>
					<Typography paragraph>{item.description}</Typography>
				</CardContent>
				<LinearProgress variant="determinate" value={item.progress} />
				// Vaffanculo mo so dovuto fa da solo...
				<Rating disabled rating={item.stars} />
			</Card>
		);
	}

	private handleMenuClick(event: React.SyntheticEvent) {
		this.setState({ anchorEl: event.currentTarget });
	}

	private handleMenuClose(event: React.SyntheticEvent) {
		this.setState({ anchorEl: null });
	}

	private goTo(url: string) {
		return (event: React.SyntheticEvent) => {
			window.open(url, "_blank").focus();
		};
	}
}
export default ProjectCard;
