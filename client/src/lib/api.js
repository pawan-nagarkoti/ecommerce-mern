import axios from "axios";
import { apiUrl } from "./constant";
import { getCookie, addCookie, deleteCookie } from "../hooks/useCookie";

// Create an Axios instance
const apiClient = axios.create({
  baseURL: apiUrl,
  // credentials: "include", --> with Fetch;
  withCredentials: true, //--> with axios // for refresh token
});

// Attach access token to requests
apiClient.interceptors.request.use((config) => {
  const token = getCookie("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
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
          .then(async (res) => {
            addCookie("accessToken", res.data.accessToken);
            await res.data.accessToken;
          })
          .catch(async (e) => {
            await _post("auth/logout");
            deleteCookie("accessToken");
            deleteCookie("loginUserInfo");
            deleteCookie("otpEmail");
            deleteCookie("totalAmountAfterCoupon");
          })
          .finally(() => {
            refreshing = null;
          });
      }

      const token = getCookie("accessToken");
      if (token) {
        original.headers.Authorization = `Bearer ${token}`;
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
