export const DOMAIN = "http://localhost:8080"
export const API_DOMAIN = `${DOMAIN}/api`


// auth
export const LOGIN = `${API_DOMAIN}/auth/login`
export const REFRESH_TOKEN = `${API_DOMAIN}/token/refresh`

// chat
export const SAVE_CHAT = `${API_DOMAIN}/chat/`
export const GET_CHATS = `${API_DOMAIN}/chat/get`

// user
export const GET_USER = `${API_DOMAIN}/user/`
export const UPDATE_USER = `${API_DOMAIN}/user/update`
export const UPDATE_USER_AVATAR = `${API_DOMAIN}/user/update/avatar`