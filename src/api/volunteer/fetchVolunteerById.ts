import { get } from '../../utils/fetch'
import IVolunteerRecord from '../../types/volunteers/IVolunteerRecord';
const fetchVolunteerById = async (id: string): Promise<object> => {
    const records: object = await get(`/api/volunteer/${id}`)
    return records as IVolunteerRecord
}
export default fetchVolunteerById