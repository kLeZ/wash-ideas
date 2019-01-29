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

import * as React from "react";
import { CSSProperties } from "react";
import { container } from "../ioc/inversify.config";
import { IPersistible } from "../models/IPersistible";
import Project from "../models/Project";
import { PersistibleType } from "../models/Symbols";
import { IRepository } from "../repository/IRepository";
import Card from "./cards/Card";
import ProjectCard from "./cards/ProjectCard";

interface IWashBoardState {
	items: IPersistible[];
	repoType: string;
	isOpen: boolean;
}

class WashBoard extends React.Component<any, IWashBoardState> {
	constructor(props: any) {
		super(props);
		this.state = {
			items: [],
			repoType: "",
			isOpen: false
		};
	}

	public render() {
		const style: CSSProperties = {
			margin: 15,
			width: 320,
		};
		return (
			<div
				className="wash-board"
				style={{
					display: "flex",
					flexWrap: "wrap",
					justifyContent: "space-around",
					overflow: "hidden",
				}}
			>
				{this.state.items.map((item, index) => {
					let card: React.ReactNode = null;
					switch (item.getType()) {
						case PersistibleType.PROJECT:
							{
								card = <ProjectCard repoType={this.state.repoType} style={style} item={item as Project} key={index} />;
								break;
							}
						default:
							{
								card = <Card repoType={this.state.repoType} style={style} item={item} key={index} />;
								break;
							}
					}
					return card;
				})}
			</div>
		);
	}

	public async loadItems(repoType: string) {
		let isOpen = this.state.isOpen;
		const repo = container.get<IRepository<IPersistible>>(repoType);
		if (isOpen === false || repoType !== this.state.repoType) {
			await repo.open();
			isOpen = true;
		}
		const items = await repo.find(_ => true);
		this.setState({ items, repoType, isOpen });
	}
}
export default WashBoard;
