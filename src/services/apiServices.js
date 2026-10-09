import { useSyncExternalStore } from "react";
import { Capacitor } from "@capacitor/core";
import { baseUrl } from "../environment";
import Axios from "axios";

const apiInstance = Axios.create({
  baseURL: baseUrl(),
});

// Token is shared by every useAxios() caller; per-component state was lost when LoginForm unmounted.
let sharedToken = {};
const tokenListeners = new Set();
const setSharedToken = newToken => {
  sharedToken = newToken ?? {};
  tokenListeners.forEach(listener => listener());
};
const subscribeToken = listener => {
  tokenListeners.add(listener);
  return () => tokenListeners.delete(listener);
};
const getSharedToken = () => sharedToken;

// Anonymous (login page) requests send an empty sessionId; a logged-in user must have one stored.
// activeSessionId bridges the gap between a successful login response and localStorage being written.
let activeSessionId = null;
export const setActiveSessionId = id => {
  activeSessionId = id || null;
};

export const requestTokens = sessionIdOverride => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  if (sessionIdOverride) {
    activeSessionId = sessionIdOverride;
  }
  const sessionId = sessionIdOverride ?? userData?.sessionId ?? activeSessionId;
  if (userData?.userName && !sessionId) {
    return Promise.reject(new Error("sessionId is not available in localStorage"));
  }
  const formdata = new FormData();
  formdata.append("sessionId", sessionId ?? "");
  return apiInstance.post("/getTokens", formdata);
};

export const killUserSession = () => {
  const formdata = new FormData();
  const deviceId = localStorage.getItem("ledgerely_device_id");
  if (deviceId) {
    formdata.append("deviceId", deviceId);
  }
  formdata.append("platform", Capacitor.getPlatform());
  return apiInstance.post("/killUserSession", formdata);
};

// One interceptor pair for the whole app (it used to be one per useAxios() caller).
apiInstance.interceptors.request.use(config => {
  if (!config.headers["Authorization"] && sharedToken.accessToken) {
    config.headers["Authorization"] = `Bearer ${sharedToken.accessToken}`;
  }
  return config;
});

let refreshing = null;
apiInstance.interceptors.response.use(
  response => response,
  error => {
    const prevRequest = error?.config;
    if (error?.response?.status === 401 && prevRequest && !prevRequest.sent && prevRequest.url !== "/getTokens") {
      prevRequest.sent = true;
      refreshing ??= requestTokens()
        .then(res => {
          setSharedToken(res.data.response);
          return res.data.response;
        })
        .finally(() => {
          refreshing = null;
        });
      return refreshing.then(newToken => {
        prevRequest.headers["Authorization"] = `Bearer ${newToken.accessToken}`;
        return apiInstance(prevRequest);
      });
    }
    return Promise.reject(error);
  },
);

const api = { apiInstance, setToken: setSharedToken };
const useAxios = () => api;

export const useToken = () => useSyncExternalStore(subscribeToken, getSharedToken);
export default useAxios;
