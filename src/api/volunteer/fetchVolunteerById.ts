import { get } from '../../utils/fetch'
import IVolunteerRecord from '../../types/volunteers/IVolunteer';
import { endpoint } from './../../config';
const fetchVolunteerById = async (id: string): Promise<object> => {
    const records: object = await get(`${endpoint}/volunteers/${id}`)
    return records as IVolunteerRecord
}
export default fetchVolunteerById
