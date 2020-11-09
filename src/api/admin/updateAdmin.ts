import { put } from '../../utils/fetch';
import { AxiosRequestConfig } from 'axios';
import { endpoint } from './../../config';
import { IAdminUpdateData } from '../../types/admins/IAdminCreateData';

const updateAdmin = async (data: IAdminUpdateData): Promise<object> => {
    const { _id, name, surname, email, password } = data;
    const records: AxiosRequestConfig = await put(`${endpoint}/admin/admins/${_id}`, { name, surname, email, password });
    return records.data;
}

export default updateAdmin;
