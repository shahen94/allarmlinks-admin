import { get } from '../../utils/fetch';
import { AxiosRequestConfig } from 'axios';
import { endpoint } from './../../config';

const fetchAdminById = async (id: string): Promise<any> => {
    try {
        const response: AxiosRequestConfig = await get(`${endpoint}/admin/admins/${id}`);
        return response;
    } catch (error) {
        return error.response;
    }
}

export default fetchAdminById;