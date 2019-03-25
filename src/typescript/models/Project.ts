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

import { IPersistible } from "./IPersistible";
import { IUser } from "./IUser";

class Project implements IPersistible {
	public type: string;
	public title: string; // ✓
	public encoding: string; // ✓
	public description: string; // ✓
	public repoUrl: string; // ✓
	public progress: number; // ✓
	public nextTaskHardness: number; // ✓
	public created: Date;
	public modified: Date; // ✓
	public author: IUser; // ✓
	public editor: IUser;

	constructor() {
		const date = new Date();
		this.title = "";
		this.encoding = "utf-8";
		this.description = "";
		this.repoUrl = "";
		this.progress = 0;
		this.nextTaskHardness = 0;
		this.author = {
			name: "",
			email: "",
		};
		this.editor = {
			name: "",
			email: "",
		};
		this.created = date;
		this.modified = date;
		this.type = "Project";
	}
}
export default Project;
