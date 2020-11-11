import {ActionStatus} from "./auth/ILoginData";

export default interface IAppStateData {
    status: ActionStatus,
    error?: string,
}
