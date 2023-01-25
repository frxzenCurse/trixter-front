import axios from 'axios'
import * as api from './service/endpoints'
import $api from "./service/request"

export const getUser = () => {
  return $api.get(`${api.API_DOMAIN}/user/`)
}

export const updateUser = (body) => {
  return $api.post(`${api.API_DOMAIN}/user/update`, body)
}

export const updateUserAvatar = (body) => {
  return $api.post(`${api.API_DOMAIN}/user/update/avatar`, body)
}