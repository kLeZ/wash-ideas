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

class MyMath {
	public static rate(x: number): number {
		return this.roundNearest(Math.min(Math.max(0, x), 100) / 20, 1);
	}

	public static roundNearest(num: number, acc: number): number {
		if (acc < 0) {
			return Math.round(num * acc) / acc;
		} else {
			return Math.round(num / acc) * acc;
		}
	}
}
export default MyMath;
