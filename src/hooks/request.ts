/**
 * 对于 axios.ts 提供的 axios 实例的再封装
 * 包括 GET，POST，PUT，DELETE 请求方法
 */
import type { AxiosRequestConfig } from 'axios';
import type { RequestConfigExtra } from '@/hooks/axios-extends.ts';

export const useGet = <R = any, T = any>(
  url: string,
  params?: T,
  config?: AxiosRequestConfig & RequestConfigExtra,
): Promise<R> => {
  const options = {
    url,
    params,
    method: RequestEnum.GET,
    ...config,
  };
  return instancePromise<R, T>(options);
};

export const usePost = <R = any, T = any>(
  url: string,
  data?: T,
  config?: AxiosRequestConfig & RequestConfigExtra,
): Promise<R> => {
  const options = {
    url,
    data,
    method: RequestEnum.POST,
    ...config,
  };
  return instancePromise<R, T>(options);
};

export const usePut = <R = any, T = any>(
  url: string,
  data?: T,
  config?: AxiosRequestConfig & RequestConfigExtra,
): Promise<R> => {
  const options = {
    url,
    data,
    method: RequestEnum.PUT,
    ...config,
  };
  return instancePromise<R, T>(options);
};

export const useDelete = <R = any, T = any>(
  url: string,
  data?: T,
  config?: AxiosRequestConfig & RequestConfigExtra,
): Promise<R> => {
  const options = {
    url,
    data,
    method: RequestEnum.DELETE,
    ...config,
  };
  return instancePromise<R, T>(options);
};
