import * as React from "react";
import Wow from "./Wow";

interface IAppProps {
	message: string;
}
export default function({ message }: IAppProps) {
	return (
		<div>
			<h1>Hello {message}</h1>
			<Wow />
		</div>
	);
}
