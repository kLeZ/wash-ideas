import { IRead } from "./IRead";
import { IWrite } from "./IWrite";

// https://hackernoon.com/generic-repository-with-typescript-and-node-js-731c10a1b98e
// https://medium.freecodecamp.org/beginner-s-guide-to-react-router-53094349669

export interface IRepository<T> extends IWrite<T>, IRead<T> {
	open(): Promise<void>;
	close(): Promise<void>;
}
