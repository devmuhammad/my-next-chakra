import { HEADERS } from "./apiAssets";
import axios from "axios";
import environment from "./environment";

const { baseUrl, apiPath } = environment;

const API_END_POINT = `${baseUrl}${apiPath}`;

const api = axios.create({
  baseURL: API_END_POINT,
});

api.interceptors.request.use(
  (config) => {
    return {
      ...config,
      headers: HEADERS,
    };
  },
  (error) => Promise.reject(error)
);

export default api;
