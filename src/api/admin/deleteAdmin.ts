import { del } from '../../utils/fetch';
import { AxiosRequestConfig } from 'axios';
import IAdminRecord from '../../types/admins/IAdminRecord';
import { endpoint } from './../../config';

const deleteAdmin = async (id: string): Promise<object> => {
    const records: AxiosRequestConfig = await del(`${endpoint}/admin/admins/${id}`);
    return records as IAdminRecord;
}

export default deleteAdmin;
