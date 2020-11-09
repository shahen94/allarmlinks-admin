import { post } from '../../utils/fetch';
import { AxiosRequestConfig } from 'axios';
import { endpoint } from './../../config';
import { IAdminCreateData } from '../../types/admins/IAdminCreateData';

const createAdmin = async (data: IAdminCreateData): Promise<object> => {
    const { name, surname, email, password } = data;
    const records: AxiosRequestConfig = await post(`${endpoint}/admin/addAdmin`, { name, surname, email, password });
    return records.data;
}

export default createAdmin;
