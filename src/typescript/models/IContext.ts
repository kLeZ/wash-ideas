import { IRepositoryConfiguration } from "./IRepositoryConfiguration";
import { IUser } from "./IUser";

export interface IContext {
	user: IUser;
	configuration: IRepositoryConfiguration;
}
