import { get } from '../../utils/fetch'
import IVolunteerRecord from '../../types/volunteers/IVolunteerRecord';
import { endpoint } from './../../config';
import { AxiosRequestConfig } from 'axios';

const fetchVolunteerById = async (id: string): Promise<any> => {
    try {
        const response: AxiosRequestConfig = await get(`${endpoint}/admin/volunteers/${id}`)
        return response as IVolunteerRecord;
    } catch (error) {
        return error.response;
    }
}

export default fetchVolunteerById;