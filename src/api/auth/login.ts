import { post } from '../../utils/fetch';
import { AxiosRequestConfig } from 'axios';
import IAdminAuthorizeData from '../../types/admins/IAdminAuthorizeData';
import { endpoint } from './../../config'

const login = async (data: IAdminAuthorizeData): Promise<any> => {
    try {
        const { email, password } = data;
        const response: AxiosRequestConfig = await post(`${endpoint}/admin/login`, { email, password });
        return response;
    } catch (error) {
        return error.response;
    }
}

export default login;