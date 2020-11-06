import { del } from '../../utils/fetch';
import { AxiosRequestConfig } from 'axios';
import IAdminRecord from '../../types/admins/IAdminRecord';

const deleteAdmin = async (id: string): Promise<object> => {
    const records: AxiosRequestConfig = await del(`/api/admin/${id}`);
    return records as IAdminRecord;
}

export default deleteAdmin;
