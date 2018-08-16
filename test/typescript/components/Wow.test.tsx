import * as React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import Wow from "../../../src/typescript/components/Wow";

it("renders without crashing", () => {
	const div = document.createElement("div");
	render(<Wow />, div);
	unmountComponentAtNode(div);
});
