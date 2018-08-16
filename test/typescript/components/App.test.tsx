import * as React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import App from "../../../src/typescript/components/App";

it("renders without crashing", () => {
	const div = document.createElement("div");
	render(<App />, div);
	unmountComponentAtNode(div);
});
