import { get } from '../../utils/fetch'
const fetchVolunteers = async (): Promise<object> => {
    const records: object = await get('/api/volunteers')
    return records
}
export default fetchVolunteers