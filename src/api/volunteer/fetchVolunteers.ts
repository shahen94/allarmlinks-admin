import { get } from '../../utils/fetch'
import { AxiosRequestConfig } from 'axios';
const fetchVolunteers = async (): Promise<object> => {
    const records: AxiosRequestConfig = await get('MOCK_DATA.json')
    return records.data
}
export default fetchVolunteers