import axios, {
  AxiosResponse,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  InternalAxiosRequestConfig,
} from 'axios';

import { TokenService } from '@services';
import { getBaseUrlApi } from './getBaseUrl';

export interface RefreshTokenRes {
  refreshToken: string;
  accessToken: string;
  data: any;
}

export type AxiosInstanceType = {
  contentType?: 'application/json' | 'multipart/form-data';
  headers?: AxiosRequestHeaders;
};

let isRefreshToken = false;

const AxiosInstance = ({ contentType = 'application/json', headers }: AxiosInstanceType) => {
  const axiosInstance = axios.create({
    baseURL: getBaseUrlApi(),
    timeout: 7000,
  });

  axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = TokenService.getAccessToken();

      if (headers) {
        config.headers = headers;
      } else {
        config.headers = {
          Authorization: `Bearer ${token ?? ''}`,
          Accept: 'application/json',
          'Content-Type': contentType,
        } as AxiosRequestHeaders;
      }

      return config;
    },
    (err) => Promise.reject(err)
  );

  axiosInstance.interceptors.response.use(
    (res) => res,
    async (error) => {
      const originalConfig = error.config;

      if (error?.response?.status === 403 && !originalConfig._retry && !isRefreshToken) {
        originalConfig._retry = true;
        isRefreshToken = true;

        //refresh token
        const currentRefreshToken = TokenService.getRefreshToken();
        console.log(currentRefreshToken)
        const res = await fetch(`${getBaseUrlApi()}/auth/refresh`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ refreshToken: currentRefreshToken }),
        });

        try {
          const parseRes = (await res.json()) as RefreshTokenRes;

          if (parseRes?.refreshToken && parseRes?.accessToken) {
            console.log(res);
            const { accessToken, refreshToken } = parseRes;
            TokenService.clearTokens();
            TokenService.setAccessToken(accessToken);
            TokenService.setRefreshToken(refreshToken);
            originalConfig.headers['Authorization'] = `Bearer ${accessToken}`;
            return axiosInstance(originalConfig);
          }
        } catch (e) {
          console.log(e);

        } finally {
          isRefreshToken = false;
        }
      }
      return Promise.reject(error);
    }
  ); // callback
  return axiosInstance;
};

const responseBody = <ResponseType>(response: AxiosResponse<ResponseType>) => response;

const ApiUtil = {
  get: <ResponseType>(
    url: string,
    headers?: AxiosRequestHeaders,
    requestOption?: AxiosRequestConfig
  ) => AxiosInstance({ headers }).get<ResponseType>(url, requestOption).then(responseBody),

  post: <ResponseType>(url: string, body: {}, headers?: AxiosRequestHeaders) =>
    AxiosInstance({ headers }).post<ResponseType>(url, body).then(responseBody),

  put: <ResponseType>(url: string, body: {}, headers?: AxiosRequestHeaders) =>
    AxiosInstance({ headers }).put<ResponseType>(url, body).then(responseBody),

  patch: <ResponseType>(url: string, body: {}, headers?: AxiosRequestHeaders) =>
    AxiosInstance({ headers }).patch<ResponseType>(url, body).then(responseBody),

  delete: <ResponseType>(
    url: string,
    headers?: AxiosRequestHeaders,
    requestOption?: AxiosRequestConfig
  ) => AxiosInstance({ headers }).delete<ResponseType>(url, requestOption).then(responseBody),

  postFile: <ResponseType>(url: string, body: {}, headers?: AxiosRequestHeaders) =>
    AxiosInstance({ contentType: 'multipart/form-data', headers })
      .post<ResponseType>(url, body)
      .then(responseBody),
} as const;

export default ApiUtil;
