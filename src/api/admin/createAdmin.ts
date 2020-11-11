import {post} from '../../utils/fetch';
import {AxiosRequestConfig} from 'axios';
import {endpoint} from './../../config';
import {IAdminRequestData} from '../../types/admins/IAdminRequestData';

const createAdmin = async (data: IAdminRequestData): Promise<object> => {
    const {name, surname, email, password} = data;
    const records: AxiosRequestConfig = await post(`${endpoint}/admin/addAdmin`, {name, surname, email, password});
    return records.data;
}

export default createAdmin;
