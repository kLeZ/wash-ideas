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

import { EventEmitter } from "events";
import { Sha } from "./Sha";

export interface IAddArgs {
	core?: string;
	fs?: any;
	dir: string;
	gitdir?: string;
	filepath: string;
}
export interface ICloneArgs {
	core?: string;
	fs?: any;
	dir: string;
	gitdir?: string;
	emitter?: EventEmitter;
	url: string;
	corsProxy?: string;
	ref?: string;
	remote?: string;
	username?: string;
	password?: string;
	token?: string;
	oauth2format?: "github" | "bitbucket" | "gitlab";
	depth?: number;
	since?: Date;
	exclude?: string[];
	relative?: boolean;
	singleBranch?: boolean;
	noCheckout?: boolean;
}
export interface ICommitArgs {
	core?: string;
	fs?: any;
	dir: string;
	gitdir?: string;
	message: string;
	author: {
		name?: string;
		email?: string;
		date?: Date;
		timestamp?: number;
		timezoneOffset?: number;
	};
	committer?: {
		name?: string;
		email?: string;
		date?: Date;
		timestamp?: number;
		timezoneOffset?: number;
	};
}
export interface IPullArgs {
	core?: string;
	fs?: any;
	dir: string;
	gitdir?: string;
	ref?: string;
	singleBranch?: boolean;
	fastForwardOnly?: boolean;
	username?: string;
	password?: string;
	token?: string;
	oauth2format?: "github" | "bitbucket" | "gitlab";
	emitter?: EventEmitter;
}
export interface IPushArgs {
	core?: string;
	fs?: any;
	dir: string;
	gitdir?: string;
	ref?: string;
	remoteRef?: string;
	remote?: string;
	url?: string;
	corsProxy?: string;
	force?: boolean;
	username?: string;
	password?: string;
	token?: string;
	oauth2format?: "github" | "bitbucket" | "gitlab";
}
export interface IPushResult {
	ok?: string[];
	errors?: string[];
}

export interface IGitClient {
	add(args: IAddArgs): Promise<void>;
	clone(args: ICloneArgs): Promise<void>;
	commit(args: ICommitArgs): Promise<Sha>;
	exists(path: string): boolean;
	init(): Promise<void>;
	mkdir(path: string): void;
	readdir(path: string): void;
	pull(args: IPullArgs): Promise<void>;
	push(args: IPushArgs): Promise<IPushResult>;
	writeFile(path: string, content: string, encoding: string): void;
}
