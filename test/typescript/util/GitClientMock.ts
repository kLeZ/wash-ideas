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

@injectable()
export class GitClientMock implements IGitClient {
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
		return false;
	}
	public init(): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			resolve();
		});
	}
	public mkdir(path: string): void {
		return;
	}
	public readdir(path: string): void {
		return;
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
		return;
	}
}
