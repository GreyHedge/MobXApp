import {AxiosResponse} from 'axios';

export interface IAPIConfig {
  baseURL: string;
  timeout: number;
}

export interface IApiClient {
  get: <T>(url: string) => Promise<AxiosResponse<T>>;
  post: <T>(
    url: string,
    params: Record<string, string>,
  ) => Promise<AxiosResponse<T>>;
}
