import axios from 'axios';
import { generateConfigHeaderWithToken } from './localStorageUtils';

export const post = async (url: string, body: object): Promise<object> => {
    const config = generateConfigHeaderWithToken();
    return axios.post(url, body, config);
}
export const put = async (url: string, body: object): Promise<object> => {
    const config = generateConfigHeaderWithToken();
    return axios.put(url, body, config);
}
export const get = async (url: string): Promise<object> => {
    const config = generateConfigHeaderWithToken();
    return axios.get(url, config);
}
export const del = async (url: string): Promise<object> => {
    const config = generateConfigHeaderWithToken();
    return axios.delete(url, config);
}