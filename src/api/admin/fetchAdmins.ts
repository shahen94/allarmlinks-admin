import { get } from '../../utils/fetch';
import { AxiosRequestConfig } from 'axios';
import { endpoint } from './../../config';

const fetchAdmins = async (): Promise<any> => {
    try {
        const response: AxiosRequestConfig = await get(`${endpoint}/admin/admins`);
        return response;
    } catch (error) {
        return error.response;
    }
}

export default fetchAdmins;