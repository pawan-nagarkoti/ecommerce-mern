import axios from "axios";
import { apiUrl } from "./constant";

// Create an Axios instance
const apiClient = axios.create({
  baseURL: apiUrl,
});

// Define common API methods
const _get = (url, config = {}) => apiClient.get(url, config);
const _delete = (url, config = {}) => apiClient.delete(url, config);
const _put = (url, data = {}, config = {}) => apiClient.put(url, data, config);
const _post = (url, data = {}, config = {}) =>
  apiClient.post(url, data, config);
const _patch = (url, data = {}, config = {}) =>
  apiClient.patch(url, data, config);

export { _get, _delete, _put, _post, _patch };
