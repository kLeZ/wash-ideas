import { IPersistible } from "../models/IPersistible";

export interface IWrite<T extends IPersistible> {
	create(item: T): Promise<boolean>;
	update(id: string, item: T): Promise<boolean>;
	delete(id: string): Promise<boolean>;
}
