import { IPersistible } from "../models/IPersistible";

export interface IRead<T extends IPersistible> {
	find(item: T): Promise<T[]>;
	findOne(id: string): Promise<T>;
}
