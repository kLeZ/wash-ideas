import { IPersistible } from "../models/IPersistible";
import { IContext } from "./../models/IContext";
import { IRead } from "./IRead";
import { IWrite } from "./IWrite";

// https://hackernoon.com/generic-repository-with-typescript-and-node-js-731c10a1b98e
// https://medium.freecodecamp.org/beginner-s-guide-to-react-router-53094349669

export interface IRepository<T extends IPersistible> extends IWrite<T>, IRead<T> {
	context: IContext;
	init(context: IContext): void;
	open(): Promise<void>;
	close(): Promise<void>;
}
