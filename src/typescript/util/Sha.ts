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

export const ShaType = {
	SHA1: Symbol.for("SHA 1"),
	SHA256: Symbol.for("SHA 256"),
};

export class Sha {
	private type: symbol;
	private hash: string;

	constructor(type: symbol, sha: string) {
		if (sha !== null) {
			switch (type) {
				case ShaType.SHA1: {
					if (/[a-fA-F0-9]{40}/.test(sha)) {
						this.hash = sha;
						this.type = type;
					} else {
						throw new Error("Invalid hash!");
					}
					break;
				}
				default: {
					throw new Error("Unknown hash type!");
				}
			}
		} else {
			throw new Error("The hash cannot be null!");
		}
	}
}
