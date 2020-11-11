import { get } from "../../utils/fetch";
import { endpoint } from "../../config";
import { AxiosRequestConfig } from "axios";
import { ISearch } from "../../types/ISearch";
import qs from "qs";
const search = async (params: ISearch, role: string): Promise<object> => {
  const query = qs.stringify(params);
  const records: AxiosRequestConfig = await get(
    `${endpoint}/admin/${role}?${query}`
  );
  return records.data.data;
};
export default search;
