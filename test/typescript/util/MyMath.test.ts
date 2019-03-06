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

import MyMath from "../../../src/typescript/util/MyMath";

it("Round number to the nearest number", () => {
	expect(MyMath.roundNearest(3.0, 1)).toBe(3);
	expect(MyMath.roundNearest(3.4, 1)).toBe(3);
	expect(MyMath.roundNearest(3.5, 1)).toBe(4);
	expect(MyMath.roundNearest(3.9, 1)).toBe(4);
	expect(MyMath.roundNearest(4.0, 1)).toBe(4);
});
