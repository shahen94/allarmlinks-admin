import IAppStateData from "../IAppStateData";

interface ILoginResponseData {
    _id: string,
    name: string,
    surname: string,
    type: string
}

export enum ActionStatus {
    Initial = "",
    Pending = "PENDING",
    Success = "SUCCESS",
    Error = "ERROR"
}

export default interface ILoginData extends IAppStateData {
    data?: ILoginResponseData | any,
    accessToken?: string | any,
}
