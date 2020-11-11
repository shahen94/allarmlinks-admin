import {AxiosRequestConfig} from 'axios';
import {ILocalStorageData} from '../types/auth/ILocalStorageData';

export const getLocalStorageData = () => {
    const storageData: string | null = localStorage.getItem('adminAuthData');
    return storageData;
}

export const generateConfigHeaderWithToken = () => {
    const storageData: string | null = localStorage.getItem('adminAuthData');
    let config: AxiosRequestConfig = {}
    if (storageData) {
        const data: ILocalStorageData = JSON.parse(storageData);
        const token = data.accessToken;
        config = {
            headers: {
                "x-access-token": token,
                "Access-Control-Allow-Origin": "*"
            }
        };
    }
    return config;
}