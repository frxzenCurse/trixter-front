import axios from "axios"
import * as api from './service/endpoints'
import $api from "./service/request";

export const auth = (data) => {
  return $api.post(api.LOGIN, data);
}

export const refreshToken = () => {
  return $api.get(api.REFRESH_TOKEN, {
    'axios-retry': {
      retries: 0,
    }
  })
}