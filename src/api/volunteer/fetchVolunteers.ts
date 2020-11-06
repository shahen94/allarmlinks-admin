import { get } from '../../utils/fetch'
import { AxiosRequestConfig } from 'axios'
import IVolunteersRequest from './../../types/volunteers/IVolunteersRequest'
import { endpoint } from './../../config'
import qs from 'qs'
const fetchVolunteers = async (params: IVolunteersRequest): Promise<object> => {
    const query = qs.stringify(params)
    const example = qs.stringify({
        limit: 10,
        filter: {
            name: "Khcho"
        }
    })
    console.log(example)
    // const url = `${endpoint}/volunteer?${query}`
    const url = `${endpoint}/volunteer?${example}`
    const response: AxiosRequestConfig = await get(url)
    console.log(response.data.data)
    return response.data.data
}
export default fetchVolunteers