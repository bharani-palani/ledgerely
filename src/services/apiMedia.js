import Axios from "axios";
import { baseUrl } from "../environment";

const token = {};

const apiInstance = Axios.create({
  baseURL: baseUrl(),
});

apiInstance.interceptors.request.use(
  async config => {
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

apiInstance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response.status === 401) {
      // document.location.href = "/dev";
    }
    return Promise.reject(error);
  },
);
export default apiInstance;
