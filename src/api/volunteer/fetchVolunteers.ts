import { get } from '../../utils/fetch'
import { AxiosRequestConfig } from 'axios'
import IVolunteersRequest from '../../types/volunteers/IVolunteersRequest'
import { endpoint } from './../../config'
import qs from 'qs'

const fetchVolunteers = async (params: IVolunteersRequest): Promise<any> => {
    try {
        const query = qs.stringify(params)
        const url = `${endpoint}/admin/volunteers?${query}`
        const response: AxiosRequestConfig = await get(url)
        return response;
    } catch (error) {
        return error.response;
    }
}

export default fetchVolunteers;