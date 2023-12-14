import axios from "axios";
import { getCookie } from "typescript-cookie";

const httpClient = axios.create({});

httpClient.interceptors.request.use(function (config) {
  const token = getCookie("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    config.headers["Content-Type"] = "application/json";
  }
  return config;
});

export default httpClient;
