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
		let ret: number;

		ret = Math.max(0, x);
		ret = Math.min(x, 100);

		ret = ret / 20;

		ret = this.roundUp(ret, 2);
		ret = ret = Math.ceil(ret);

		return ret;
	}

	/**
	 * @param num The number to round
	 * @param precision The number of decimal places to preserve
	 */
	public static roundUp(num: number, precision: number): number {
		precision = Math.pow(10, precision);
		return Math.ceil(num * precision) / precision;
	}
}
export default MyMath;
