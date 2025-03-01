import axios from "axios";
import queryString from "query-string";
import { BASE_URL } from "../utils/constants";

export const baseURL = BASE_URL;

const BackendAPI = axios.create({
    baseURL,
});

export default BackendAPI;

export const PrivateAPI = axios.create({
    baseURL,
    paramsSerializer: (params) => {
        return queryString.stringify(params)
    },
});

PrivateAPI.interceptors.request.use(async (config: any) => {
    return {
        ...config,
        headers: {
            token: `${localStorage.getItem("token")}`,
        },
    };
});
