import axios from "axios";
import { apiUrl } from "./constant";

let accessToken = null;
export const setAccessToken = (t) => (accessToken = t);
export const clearAccessToken = () => (accessToken = null);

// Create an Axios instance
const apiClient = axios.create({
  baseURL: apiUrl,
  // credentials: "include", --> with Fetch;
  withCredentials: true, //--> with axios // for refresh token
});

// Attach access token to requests
apiClient.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Auto-refresh on 401 once
let refreshing = null;

apiClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;

    // if 401 and not already retried
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;

      // single-flight refresh
      if (!refreshing) {
        refreshing = apiClient
          .post("/auth/refresh")
          .then((res) => res.data.accessToken)
          .finally(() => {
            refreshing = null;
          });
      }

      const newAccess = await refreshing;
      if (newAccess) {
        setAccessToken(newAccess);
        original.headers.Authorization = `Bearer ${newAccess}`;
        return apiClient(original); // retry original request
      }
    }

    return Promise.reject(error);
  }
);

// Define common API methods
const _get = (url, config = {}) => apiClient.get(url, config);
const _delete = (url, config = {}) => apiClient.delete(url, config);
const _put = (url, data = {}, config = {}) => apiClient.put(url, data, config);
const _post = (url, data = {}, config = {}) =>
  apiClient.post(url, data, config);
const _patch = (url, data = {}, config = {}) =>
  apiClient.patch(url, data, config);

export { _get, _delete, _put, _post, _patch };
