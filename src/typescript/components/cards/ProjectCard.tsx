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

import { Avatar, LinearProgress, ListItemIcon, MenuItem, Typography } from "@material-ui/core";
import { Link as LinkIcon } from "@material-ui/icons";
import * as React from "react";
import { container } from "../../ioc/inversify.config";
import Project from "../../models/Project";
import { Types } from "../../repository/Symbols";
import Localization from "../../util/Localization";
import MyMath from "../../util/MyMath";
import Rating from "../Rating";
import Card from "./Card";
import ICardProps from "./ICardProps";
import ICardState from "./ICardState";

class ProjectCard extends React.Component<ICardProps, ICardState> {
	constructor(props: ICardProps) {
		super(props);
		const item: Project = props.item as Project;
		this.state = {
			item,
		};
	}

	public render() {
		const item: Project = this.state.item as Project;
		return (
			<Card
				repoType={this.props.repoType}
				item={item}
				style={this.props.style}
				avatar={
					<Avatar aria-label="Project">
						{item.author.name
							.split(" ")
							.map(w => w.charAt(0).toUpperCase())
							.join("")}
					</Avatar>
				}
				menuItems={
					<MenuItem onClick={this.goTo.bind(this)} data-url={item.repoUrl}>
						<ListItemIcon>
							<LinkIcon />
						</ListItemIcon>
						<Typography noWrap>
							{container.get<Localization>(Types.LOCALIZATION).t("cards.project.goto_repo_url")}
						</Typography>
					</MenuItem>
				}
				title={item.title}
				subheader={item.modified.toLocaleString()}
				footer={[
					<LinearProgress key={0} variant="determinate" value={item.progress} />,
					<Rating key={1} disabled rating={MyMath.rate(item.nextTaskHardness)} />,
				]}
				delete={this.props.delete}
				edit={this.props.edit}
			>
				<Typography paragraph>{item.description}</Typography>
			</Card>
		);
	}

	private goTo(e: React.MouseEvent<HTMLElement>) {
		window.open(e.currentTarget.dataset.url, "_blank").focus();
	}
}
export default ProjectCard;
