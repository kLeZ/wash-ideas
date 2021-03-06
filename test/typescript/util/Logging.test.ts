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

import { logComponent, logIoc, logRepo, logUtils } from "../../../src/typescript/util/Logging";

it("Logging in repository category with level info without crash", () => {
	logRepo.info("Logging test done");
});
it("Logging in utils category with level info without crash", () => {
	logUtils.info("Logging test done");
});
it("Logging in ioc category with level info without crash", () => {
	logIoc.info("Logging test done");
});
it("Logging in component category with level info without crash", () => {
	logComponent.info("Logging test done");
});
