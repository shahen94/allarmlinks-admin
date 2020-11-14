import { get } from "../../utils/fetch";
import { endpoint } from "../../config";
import { AxiosRequestConfig } from "axios";
import { ISearch } from "../../types/ISearch";
import qs from "qs";

const search = async (params: ISearch, role: string): Promise<any> => {
    try {
        const query = qs.stringify(params);
        const response: AxiosRequestConfig = await get(
            `${endpoint}/admin/${role}?${query}`
        );
        return response;
    } catch (error) {
        return error.response;
    }
}

export default search;