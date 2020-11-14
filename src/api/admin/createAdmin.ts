import { post } from '../../utils/fetch';
import { AxiosRequestConfig } from 'axios';
import { endpoint } from './../../config';
import { IAdminRequestData } from '../../types/admins/IAdminRequestData';

const createAdmin = async (data: IAdminRequestData): Promise<any> => {
    const { name, surname, email, password } = data;
    try {
        const response: AxiosRequestConfig = await post(`${endpoint}/admin/addAdmin`, { name, surname, email, password });
        return response;
    } catch (error) {
        return error.response;
    }
}

export default createAdmin;