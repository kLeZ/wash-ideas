import browserfs from "browserfs";
import * as React from "react";
import { render } from "react-dom";
import "typeface-roboto";
import "../scss/main.scss";
import App from "./components/App";
import DummyGitRepository from "./repository/DummyGitRepository";

render(<App />, document.getElementById("root"));
(async () => {
	const repo = new DummyGitRepository();
	await repo.open();
	await repo.log();
	await repo.close();
})();
