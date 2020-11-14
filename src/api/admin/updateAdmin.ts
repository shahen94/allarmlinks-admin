import { put } from '../../utils/fetch';
import { AxiosRequestConfig } from 'axios';
import { endpoint } from './../../config';
import { IAdminUpdateData } from '../../types/admins/IAdminRequestData';

const updateAdmin = async (id: string, data: IAdminUpdateData): Promise<any> => {
    try {
        const response: AxiosRequestConfig = await put(`${endpoint}/admin/admins/${id}`, { ...data });
        return response;
    } catch (error) {
        return error.response;
    }
}

export default updateAdmin;