import axios from "axios";
import axiosRetry from "axios-retry";
import { refreshToken } from "../auth";

const $api = axios.create({
  withCredentials: true,
})

axiosRetry($api, {
  retries: 1,
  retryCondition: async (error) => {
    if (error.response.status === 403) {
      try {
        const response = await refreshToken();

        localStorage.setItem('jwt', `Bearer ${response.data.access_token}`)
        return true;
      } catch (e) {
        console.log(e.response.data)
        return false;
      }
    }
    return false;
  },
})

$api.interceptors.request.use(config => {
  config.headers.Authorization = localStorage.getItem('jwt');
  return config;
});


export default $api;