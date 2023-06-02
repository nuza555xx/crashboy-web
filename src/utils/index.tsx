import axios, { AxiosRequestConfig } from 'axios';

export function requestAPI<T>(configs: AxiosRequestConfig) {
    return axios.request<T>(configs).then((response) => response.data);
}
