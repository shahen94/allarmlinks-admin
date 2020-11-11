import { put } from '../../utils/fetch';
import { AxiosRequestConfig } from 'axios';
import { endpoint } from './../../config';
import { IAdminUpdateData } from '../../types/admins/IAdminRequestData';

const updateAdmin = async (id: string, data: IAdminUpdateData): Promise<object> => {
    const records: AxiosRequestConfig = await put(`${endpoint}/admin/admins/${id}`, { ...data });
    return records.data;
}

export default updateAdmin;
