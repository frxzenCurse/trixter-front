import * as api from './service/endpoints'
import $api from "./service/request"

export const saveChat = (chat) => {
  return $api.post(api.SAVE_CHAT, chat)
}

export const getChats = (chatsId) => {
  return $api.post(api.GET_CHATS, chatsId)
}