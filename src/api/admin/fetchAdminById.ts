import {get} from '../../utils/fetch';
import {AxiosRequestConfig} from 'axios';
import {endpoint} from './../../config';

const fetchAdminById = async (id: string): Promise<object> => {
    const records: AxiosRequestConfig = await get(`${endpoint}/admin/admins/${id}`);
    return records.data;
}

export default fetchAdminById;