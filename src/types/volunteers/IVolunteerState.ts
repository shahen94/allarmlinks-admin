import IAppStateData from "../IAppStateData";
import IVolunteerRecord from "./IVolunteerRecord";

export interface IVolunteerState extends IAppStateData {
    data: IVolunteerRecord[] | [],
    allCount: number,
    hasNext:boolean,
}