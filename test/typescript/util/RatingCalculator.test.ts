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

import RatingCalculator from "../../../src/typescript/util/RatingCalculator";

/**
 * Rating inteval:
 * 1) 0 - 16
 * 2) 17 - 33
 * 3) 34 - 50
 * 4) 51 - 66
 * 5) 67 - 83
 * 6) 84 - 100
 */
describe("Calculate rating from 0 to 5 converting values from 0 to 100", () => {
	const ratingBehaviour = (points: number, expectedRating: number) => {
		const calculator = new RatingCalculator(points);
		expect(calculator.rate()).toBe(expectedRating);
	};

	it("Given minimum value give me minimum rating", () => {
		ratingBehaviour(0, 0);
	});
	it("Given maximum value give me maximum rating", () => {
		ratingBehaviour(100, 5);
	});
	it("First interval: with the maximum value, it should be 0", () => {
		ratingBehaviour(16, 0);
	});
	it("Second interval: with the minimum value, it should be 1", () => {
		ratingBehaviour(17, 1);
	});
	it("Second interval: with the maximum value, it should be 1", () => {
		ratingBehaviour(33, 1);
	});
	it("Third interval: with the minimum value, it should be 2", () => {
		ratingBehaviour(34, 2);
	});
	it("Third interval: with the maximum value, it should be 2", () => {
		ratingBehaviour(50, 2);
	});
	it("Fourth interval: with the minimum value, it should be 3", () => {
		ratingBehaviour(51, 3);
	});
	it("Fourth interval: with the maximum value, it should be 3", () => {
		ratingBehaviour(66, 3);
	});
	it("Fifth interval: with the minimum value, it should be 4", () => {
		ratingBehaviour(67, 4);
	});
	it("Fifth interval: with the maximum value, it should be 4", () => {
		ratingBehaviour(83, 4);
	});
	it("Sixth interval: with the minimum value, it should be 5", () => {
		ratingBehaviour(84, 5);
	});
});
