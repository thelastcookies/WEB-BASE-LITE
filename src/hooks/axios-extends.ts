/**
 * 提供 axios 实例，配置请求拦截器、响应拦截器和错误处理
 */
import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import type { NamingStyleTransfer } from '@/constants/enums/naming-style.ts';

export interface RequestConfigExtra {
  // 请求时是否携带 token
  token?: boolean;
  // 是否使用 mock
  mock?: boolean;
  loading?: boolean;
  namingStyleTransfer?: NamingStyleTransfer;
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
  if (config.token) {
    const { getToken } = useTokenStore();
    const token = getToken();
    if (token) {
      config.headers.set('Authorization', 'Bearer ' + token);
    } else {
      console.error(`Axios "requestHandler": Token is required for request '${config.method}' ${config.url}, but it is missing.`);
    }
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
  if (error.code === 'ERR_NETWORK') {
    message.error({
      content: '网络连接失败',
      key: AXIOS_ERROR_KEY,
    });
  } else if (error.code === 'ERR_CONNECTION_ABORTED') {
    message.error({
      content: '网络连接中断',
      key: AXIOS_ERROR_KEY,
    });
  } else if (error.code === 'ERR_TIMEOUT') {
    message.error({
      content: '请求超时',
      key: AXIOS_ERROR_KEY,
    });
  } else if (error.code === 'ERR_CONNECTION_REFUSED') {
    message.error({
      content: '服务器拒绝连接',
      key: AXIOS_ERROR_KEY,
    });
  }

  // if (error.response) {
  //   const { data, status, statusText } = error.response as AxiosResponse<any>;
  //   if (status === 401) {
  //     message?.error({
  //       message: '401',
  //       content: data?.msg || statusText,
  //       key: AXIOS_ERROR_KEY,
  //     });
  //     token.value = '';
  //     router.push({
  //       path: '/login',
  //       query: {
  //         redirect: router.currentRoute.value.fullPath,
  //       },
  //     }).then(() => {
  //     });
  //   } else if (status === 403) {
  //     message?.error({
  //       message: '403',
  //       content: data?.msg || statusText,
  //       key: AXIOS_ERROR_KEY,
  //     });
  //   } else if (status === 500) {
  //     message?.error({
  //       message: '500',
  //       content: data?.msg || statusText,
  //       key: AXIOS_ERROR_KEY,
  //     });
  //   } else {
  //     message?.error({
  //       message: '服务错误',
  //       content: data?.msg || statusText,
  //       key: AXIOS_ERROR_KEY,
  //     });
  //   }
  // }
  return Promise.reject(error);
};

export const instancePromise = <R = any, T = any>(options: AxiosRequestConfig<T> & RequestConfigExtra): Promise<R> => {
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
