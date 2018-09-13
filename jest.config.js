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

module.exports = {
	'roots': [
		'<rootDir>/src',
		'<rootDir>/test'
	],
	'transform': {
		'.*\.tsx?$': 'ts-jest'
	},
	'testRegex': '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
	'moduleFileExtensions': [
		'ts',
		'tsx',
		'js',
		'jsx',
		'json',
		'node'
	],
	'moduleNameMapper': {
		'\.(css|jpg|png)$': '<rootDir>/empty-module.js',
	},
	'collectCoverageFrom': [
		'src/**/*.{ts,tsx}',
		'!src/typescript/index.tsx',
		'!src/typescript/ioc/inversify.config.ts',
	]
};
