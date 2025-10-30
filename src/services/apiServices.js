import { useEffect, useState } from "react";
import { baseUrl } from "../environment";
import Axios from "axios";

const apiInstance = Axios.create({
  baseURL: baseUrl(),
});

const useAxios = () => {
  const [token, setToken] = useState({});

  const fetchToken = () => {
    const formdata = new FormData();
    const userData = JSON.parse(localStorage.getItem("userData"));
    formdata.append("username", userData ? userData?.name : null);
    return apiInstance.post("/getTokens", formdata);
  };

  useEffect(() => {
    const requestIntercept = apiInstance.interceptors.request.use(
      config => {
        if (!config.headers["Authorization"] && Object.keys(token).length > 0) {
          config.headers["Authorization"] = `Bearer ${token?.accessToken}`;
        }
        return config;
      },
      error => Promise.reject(error),
    );

    const responseIntercept = apiInstance.interceptors.response.use(
      response => response,
      async error => {
        const prevRequest = error?.config;
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;
          return fetchToken().then(res => {
            const newToken = res.data.response;
            setToken(newToken);
            prevRequest.headers["Authorization"] = `Bearer ${newToken.accessToken}`;
            return apiInstance(prevRequest);
          });
        }
        return Promise.reject(error);
      },
    );

    return () => {
      apiInstance.interceptors.request.eject(requestIntercept);
      apiInstance.interceptors.response.eject(responseIntercept);
    };
  }, [token]);

  return { apiInstance, token, setToken };
};

export default useAxios;
