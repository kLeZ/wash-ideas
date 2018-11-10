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
import {
	IAddArgs,
	ICloneArgs,
	ICommitArgs,
	IGitClient,
	IPullArgs,
	IPushArgs,
	IPushResult,
} from "../../../src/typescript/util/IGitClient";
import { Sha, ShaType } from "../../../src/typescript/util/Sha";
import { MyObject } from "./MyObject";

@injectable()
export class GitClientMock implements IGitClient {
	private elements: Map<string, string>;

	private ROOT_PATH: string = "wash-ideas";
	private tkn: string[] = ["Goofy", "Pluto", "Mickey"];

	public constructor() {
		this.elements = new Map<string, string>();
		this.elements.set(`${this.ROOT_PATH}/${this.tkn[0]}0.json`, JSON.stringify(new MyObject(`${this.tkn[0]}0`, "utf-8")));
		this.elements.set(`${this.ROOT_PATH}/${this.tkn[0]}1.json`, JSON.stringify(new MyObject(`${this.tkn[0]}1`, "utf-8")));
		this.elements.set(`${this.ROOT_PATH}/${this.tkn[0]}2.json`, JSON.stringify(new MyObject(`${this.tkn[0]}2`, "utf-8")));
		this.elements.set(`${this.ROOT_PATH}/${this.tkn[1]}0.json`, JSON.stringify(new MyObject(`${this.tkn[1]}0`, "utf-8")));
		this.elements.set(`${this.ROOT_PATH}/${this.tkn[1]}1.json`, JSON.stringify(new MyObject(`${this.tkn[1]}1`, "utf-8")));
		this.elements.set(`${this.ROOT_PATH}/${this.tkn[1]}2.json`, JSON.stringify(new MyObject(`${this.tkn[1]}2`, "utf-8")));
		this.elements.set(`${this.ROOT_PATH}/${this.tkn[2]}0.json`, JSON.stringify(new MyObject(`${this.tkn[2]}0`, "utf-8")));
		this.elements.set(`${this.ROOT_PATH}/${this.tkn[2]}1.json`, JSON.stringify(new MyObject(`${this.tkn[2]}1`, "utf-8")));
		this.elements.set(`${this.ROOT_PATH}/${this.tkn[2]}2.json`, JSON.stringify(new MyObject(`${this.tkn[2]}2`, "utf-8")));
	}

	public add(args: IAddArgs): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			resolve();
		});
	}
	public clone(args: ICloneArgs): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			resolve();
		});
	}
	public commit(args: ICommitArgs): Promise<Sha> {
		return new Promise<Sha>((resolve, reject) => {
			const res: Sha = new Sha(ShaType.SHA1, "096a8a4a0cbc3c5cada45263d8b61775f54a2ee3");
			resolve(res);
		});
	}
	public exists(path: string): boolean {
		return this.ROOT_PATH === path || this.elements.has(path);
	}
	public init(): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			resolve();
		});
	}
	public mkdir(path: string): void {
		return;
	}
	public readdir(path: string): string[] {
		return Array.from(this.elements.keys());
	}
	public pull(args: IPullArgs): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			resolve();
		});
	}
	public push(args: IPushArgs): Promise<IPushResult> {
		return new Promise<IPushResult>((resolve, reject) => {
			const res: IPushResult = {};
			resolve(res);
		});
	}
	public writeFile(path: string, content: string, encoding: string): void {
		this.elements.set(path, JSON.stringify(new MyObject(content, encoding)));
	}
	public readFile(path: string, encoding: string): string {
		return this.elements.get(path);
	}
	public deleteFile(path: string): void {
		this.elements.delete(path);
	}
}
