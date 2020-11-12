import axios from 'axios';
import { generateConfigHeaderWithToken } from './localStorageUtils';

export const post = async (url: string, body: object): Promise<object> => {
    const config = generateConfigHeaderWithToken();
    const response = axios.post(url, body, config);
    // response.catch((err) => {
    //     if (err.response.status === 401) {
    //         Promise.resolve({err})
    //     }
    // });
    return response;
}
export const put = async (url: string, body: object): Promise<object> => {
    const config = generateConfigHeaderWithToken();
    const response = axios.put(url, body, config);
    // response.catch((err) => {
    //     if (err.response.status === 401) {
    //         Promise.resolve({err})
    //     }
    // });
    return response;
}
export const get = async (url: string): Promise<object> => {
    const config = generateConfigHeaderWithToken();
    const response = axios.get(url, config);
    // response.catch((err) => {
    //     if (err.response.status === 401) {
    //         Promise.resolve({err})
    //     }
    // });
    return response;
}
export const del = async (url: string): Promise<object> => {
    const config = generateConfigHeaderWithToken();
    const response = axios.delete(url, config);
    // response.catch((err) => {
    //     if (err.response.status === 401) {
    //         return err
    //     }
    // });
    return response;
}