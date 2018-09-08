import * as Logging from "../../../src/typescript/util/Logging";

it("Logging in default category with level info without crash", () => {
	Logging.catRepository.info("Logging test done");
});
