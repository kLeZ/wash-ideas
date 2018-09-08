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

import { IPersistible } from "../models/IPersistible";
import { IContext } from "./../models/IContext";
import { IRead } from "./IRead";
import { IWrite } from "./IWrite";

// https://hackernoon.com/generic-repository-with-typescript-and-node-js-731c10a1b98e
// https://medium.freecodecamp.org/beginner-s-guide-to-react-router-53094349669

export interface IRepository<T extends IPersistible>
	extends IWrite<T>,
		IRead<T> {
	context: IContext;
	init(context: IContext): void;
	open(): Promise<void>;
	close(): Promise<void>;
}
