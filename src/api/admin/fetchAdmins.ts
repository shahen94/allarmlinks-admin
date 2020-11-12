import { get } from '../../utils/fetch';
import { AxiosRequestConfig } from 'axios';
import { endpoint } from './../../config';

const fetchAdmins = async (): Promise<object> => {
    const records: AxiosRequestConfig = await get(`${endpoint}/admin/admins`);
    return records.data;
}

export default fetchAdmins;