import axios, { AxiosRequestConfig } from 'axios'
const token: string | null = localStorage.getItem('jwtToken')
const config: AxiosRequestConfig = {
    headers: { Authorization: `Bearer ${token}` }
};

export const post = async (url: string, body: object): Promise<object> => {
    return axios.post(url, body, config)
}
export const put = async (url: string, body: object): Promise<object> => {
    return axios.put(url, body, config)
}
export const get = async (url: string): Promise<object> => {
    return axios.get(url, config)
}
export const del = async (url: string): Promise<object> => {
    return axios.delete(url, config)
}