/**
 * 提供 axios 实例，配置请求拦截器、响应拦截器和错误处理
 */
import type { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import axios from 'axios';

export interface RequestConfigExtra {
  // 请求时是否携带 token
  token?: boolean;
  // 是否使用 mock
  mock?: boolean;
  loading?: boolean;
}

const requestHandler = async (
  config: InternalAxiosRequestConfig & RequestConfigExtra,
): Promise<InternalAxiosRequestConfig> => {
  if (import.meta.env.DEV
    && import.meta.env.APP_API_MOCK_URL
    && config.mock) {
    const urlProc = config.url?.replace(ReCutUrlPrefix, '/');
    config.url = import.meta.env.APP_API_MOCK_URL + urlProc;
  }
  if (config.loading) {
    // axiosLoading.addLoading();
  }
  return config;
};

const responseHandler = (response: any): AxiosResponse<any> | Promise<any> | any => {
  return response.data;
};

/**
 * 全局的 axios 请求错误处理
 * @param error
 */
const errorHandler = async (error: AxiosError): Promise<AxiosError> => {
  console.error(error);
  return Promise.reject(error);
};

interface AxiosOptions<T> {
  url: string;
  params?: T;
  data?: T;
}

export const instancePromise = <R = any, T = any>(options: AxiosOptions<T> & RequestConfigExtra): Promise<R> => {
  const { loading } = options;
  return new Promise((resolve, reject) => {
    instance.request(options).then((res) => {
      resolve(res as R);
    }).catch((e: Error | AxiosError) => {
      console.error(`Axios "instancePromise": ${e}.`);
      reject(e);
    }).finally(() => {
      if (loading) {
        // axiosLoading.closeLoading();
      }
    });
  });
};

const instance: AxiosInstance = axios.create({
  baseURL: '/',
  timeout: 30000,
  headers: { 'Content-Type': ContentTypeEnum.JSON },
});

instance.interceptors.request.use(requestHandler);

instance.interceptors.response.use(responseHandler, errorHandler);

export default instance;
