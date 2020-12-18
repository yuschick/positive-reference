import axios, { AxiosRequestConfig } from 'axios';
import { IAxiosCacheAdapterOptions, setupCache } from 'axios-cache-adapter';

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

interface IConfig extends IAxiosCacheAdapterOptions {
  uuid: string;
  store: { removeItem: (key: string) => void };
}

const cache = setupCache({
  maxAge: 15 * 60 * 1000,
  clearOnStale: false,
  readOnError: true,
  invalidate: async (config: IConfig, request: AxiosRequestConfig) => {
    if (request.clearCacheEntry) {
      await config.store.removeItem(config.uuid);
    }
  },
});

const client = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
  adapter: cache.adapter,
});

client.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 404) {
      throw new Error(`${error.config.url} not found`);
    }
    throw error;
  }
);

export default client;
