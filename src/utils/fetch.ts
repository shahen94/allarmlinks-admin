import axios from 'axios';
import {generateConfigHeaderWithToken} from './localStorageUtils';

export const post = async (url: string, body: object): Promise<object> => {
    return axios.post(url, body, generateConfigHeaderWithToken())
}
export const put = async (url: string, body: object): Promise<object> => {
    return axios.put(url, body, generateConfigHeaderWithToken())
}
export const get = async (url: string): Promise<object> => {
    return axios.get(url, generateConfigHeaderWithToken())
}
export const del = async (url: string): Promise<object> => {
    return axios.delete(url, generateConfigHeaderWithToken())
}