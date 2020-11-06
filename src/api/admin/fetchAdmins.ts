import { get } from '../../utils/fetch';
import { AxiosRequestConfig } from 'axios';

const fetchAdmins = async (): Promise<object> => {
    const records: AxiosRequestConfig = await get('MOCK_DATA_ADMIN.json');
    return records.data;
}

export default fetchAdmins;