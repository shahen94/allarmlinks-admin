import IAppStateData from "../IAppStateData";
import IAdminRecord from "./IAdminRecord";

export interface IAdminState extends IAppStateData {
    data: IAdminRecord[] | []
}