import {post} from '../../utils/fetch';
import {AxiosRequestConfig} from 'axios';
import IAdminAuthorizeData from '../../types/admins/IAdminAuthorizeData';
import {endpoint} from './../../config'

const login = async (data: IAdminAuthorizeData): Promise<object> => {
    const {email, password} = data;
    const records: AxiosRequestConfig = await post(`${endpoint}/admin/login`, {email, password});
    return records.data;
}

export default login;
