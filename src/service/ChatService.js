import $api from 'http'
import $apiJSON from 'http/apiJSON'

export async function createChat(members) {
  return $apiJSON.post('/chat/chats/', { members })
}

export async function getEmployee_two(data) {
  return $api.get('/empls/', data)
}

export async function getChats(data) {
  return $api.get(`/chat/chats/`, data)
}
export async function getChatData(id, data) {
  return $api.get(`/chat/chats/${id}/`, data)
}
export async function deleteChats(id, data) {
  return $api.delete(`/chat/chats/${id}/`, data)
}

export async function postMessageChat(id, message) {
  return $apiJSON.post(`/chat/message/${id}/`, { chat: id, message })
}
export async function delMessage(id, id_del) {
  return $apiJSON.post(`/chat/messagedel/${id}/`, { id_del })
}
