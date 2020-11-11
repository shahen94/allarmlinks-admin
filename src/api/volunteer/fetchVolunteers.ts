import { get } from '../../utils/fetch'
import { AxiosRequestConfig } from 'axios'
import IVolunteersRequest from '../../types/volunteers/IVolunteersRequest'
import { endpoint } from './../../config'
import qs from 'qs'
const fetchVolunteers = async (params: IVolunteersRequest): Promise<object> => {
    const query = qs.stringify(params)
    const url = `${endpoint}/admin/volunteers?${query}`
    const response: AxiosRequestConfig = await get(url)
    return response.data.data
}
export default fetchVolunteers