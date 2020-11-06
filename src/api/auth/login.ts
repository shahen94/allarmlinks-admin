import { post } from '../../utils/fetch';
import { AxiosRequestConfig } from 'axios';
import IAdminAuthorizeData from '../../types/admins/IAdminAuthorizeData';

const login = async (data: IAdminAuthorizeData): Promise<object> => {
    const records: AxiosRequestConfig = await post('/admin/login', { ...data });
    return records.data;
}

export default login;
