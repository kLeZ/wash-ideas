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
import { PersistibleType } from "./Symbols";

class Project implements IPersistible {
	public title: string;
	public encoding: string;
	public description: string;
	public repoUrl: string;
	public progress: number;
	public stars: number;
	public nextTaskHardness: number;
	public created: Date;
	public modified: Date;
	public author: IUser;
	public editor: IUser;
	public getType() {
		return PersistibleType.PROJECT;
	}
}
export default Project;
