import axios from "axios";
import configs from "../config";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  timeout: 3 * 60 * 1000,
  baseURL: configs.API_DOMAIN,
});

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${Cookies.get("token") || Cookies.get('admin-token')}`;
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.status !== 401) {
      return Promise.reject(error);
    }
  }
);

export const sendGet = (url, params) =>
  axiosInstance.get(url, { params }).then((res) => res);

export const sendPost = (url, params, queryParams) =>
  axiosInstance
    .post(url, params, { params: queryParams })
    .then((res) => res);

export const sendPut = (url, params) =>
  axiosInstance.put(url, params).then((res) => res);

export const sendPatch = (url, params) =>
  axiosInstance.patch(url, params).then((res) => res);

export const sendDelete = (url, params) =>
  axiosInstance.delete(url, { params }).then((res) => res);
