import {get} from '../../utils/fetch'
import IVolunteerRecord from '../../types/volunteers/IVolunteerRecord';
import {endpoint} from './../../config';
import {AxiosRequestConfig} from 'axios';

const fetchVolunteerById = async (id: string): Promise<object> => {
    const records: AxiosRequestConfig = await get(`${endpoint}/admin/volunteers/${id}`)
    return records.data.data as IVolunteerRecord
}
export default fetchVolunteerById
