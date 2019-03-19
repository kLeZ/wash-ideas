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

import { injectable } from "inversify";
import Prando from "prando";
import { IPersistible } from "../models/IPersistible";
import Project from "../models/Project";
import Extender from "../util/Extender";
import { logRepo } from "./../util/Logging";
import { IRepository } from "./IRepository";

@injectable()
export class TestRepository<T extends IPersistible> implements IRepository<T> {
	private items: IPersistible[];

	constructor() {
		this.items = [];
		logRepo.trace("TestRepository constructed!");
	}

	public open(): Promise<void> {
		const that = this;
		return new Promise((resolve, reject) => {
			const rng = new Prando();
			const items: IPersistible[] = [];
			for (let i = 1; i <= rng.nextInt(1, 10); i++) {
				const created = new Date();
				created.setHours(created.getHours() - rng.nextInt(1, 6));
				items.push({
					title: `Test title ${i}`,
					encoding: "utf-8",
					// tslint:disable-next-line:max-line-length
					description: "Lorem ipsum dolor sit amet consectetur adipiscing elit convallis ullamcorper egestas, faucibus diam habitant integer lacus suscipit libero scelerisque facilisis eu, vivamus enim euismod conubia nulla pretium sapien leo porta. Tempor consequat luctus commodo dapibus aenean magnis dis, cum ut malesuada sodales inceptos fringilla, porttitor varius nunc risus at donec.",
					repoUrl: "https://github.com/kLeZ/wash-ideas",
					progress: rng.nextInt(0, 100),
					stars: rng.next(0.0, 5.0000000000000001),
					nextTaskHardness: rng.nextInt(1, 30),
					created,
					modified: new Date(),
					author: {
						name: "kLeZ",
						email: "klez@pm.me",
					},
					editor: {
						name: "kLeZ",
						email: "klez@pm.me",
					},
					type: "Project",
				} as Project);
			}
			that.items = items;
			resolve();
		});
	}
	public close(): Promise<void> {
		const that = this;
		return new Promise((resolve, reject) => {
			that.items.splice(0, that.items.length);
			resolve();
		});
	}
	public create(item: T): Promise<boolean> {
		const that = this;
		return new Promise((resolve, reject) => {
			that.items.push(item);
			resolve(true);
		});
	}
	public update(id: string, item: T): Promise<boolean> {
		const that = this;
		return new Promise((resolve, reject) => {
			const found = that.items.filter(v => v.title === id);
			if (found.length > 0) {
				const el = found.pop();
				that.items.splice(that.items.indexOf(el), 1, Extender.extends(Extender.Default, el, item));
				resolve(true);
			} else {
				resolve(false);
			}
		});
	}
	public delete(id: string): Promise<boolean> {
		const that = this;
		return new Promise((resolve, reject) => {
			const found = that.items.filter(v => v.title === id);
			if (found.length > 0) {
				const el = found.pop();
				that.items.splice(that.items.indexOf(el), 1);
				resolve(true);
			} else {
				resolve(false);
			}
		});
	}
	public find(comparer: (value: T) => boolean): Promise<T[]> {
		const that = this;
		return new Promise((resolve, reject) => {
			const found = that.items.filter(comparer);
			if (found.length > 0) {
				resolve((found as T[]));
			} else {
				reject("no item found");
			}
		});
	}
	public findOne(id: string): Promise<T> {
		const that = this;
		return new Promise((resolve, reject) => {
			const found = that.items.filter(v => v.title === id);
			if (found.length > 0) {
				resolve(found.pop() as T);
			} else {
				reject("no item found");
			}
		});
	}
}
