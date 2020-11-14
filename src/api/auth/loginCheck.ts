import { get } from '../../utils/fetch';
import { AxiosRequestConfig } from 'axios';
import { endpoint } from './../../config'

const loginCheck = async (): Promise<any> => {
    try {
        const response: AxiosRequestConfig = await get(`${endpoint}/admin/profile`);
        return response.data;
    } catch (error) {
        return error.response;
    }
}

export default loginCheck;