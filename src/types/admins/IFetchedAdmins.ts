import IAdminRecord from './IAdminRecord';
import IResponse from './../IResponse';
export default interface IFetchedAdmins extends IResponse {
    admins: IAdminRecord[] | []
}