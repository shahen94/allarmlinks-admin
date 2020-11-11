import { get } from '../../utils/fetch';
import { AxiosRequestConfig } from 'axios';
import { endpoint } from './../../config'

const loginCheck = async (): Promise<object> => {
    const records: AxiosRequestConfig = await get(`${endpoint}/admin/profile`);
    return records.data;
}

export default loginCheck;
