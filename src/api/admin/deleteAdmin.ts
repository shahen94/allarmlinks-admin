import { del } from '../../utils/fetch';
import { AxiosRequestConfig } from 'axios';
import IAdminRecord from '../../types/admins/IAdminRecord';
import { endpoint } from './../../config';

const deleteAdmin = async (id: string): Promise<any> => {
    try {
        const response: AxiosRequestConfig = await del(`${endpoint}/admin/admins/${id}`);
        return response as IAdminRecord;
    } catch (error) {
        return error.response;
    }
}

export default deleteAdmin;