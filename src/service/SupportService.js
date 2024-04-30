import $api from 'http'
import $apiJSON from 'http/apiJSON'

export async function getAllSupport(data) {
  return $api.get(`/appeals/`, data)
}

export async function getEmployeeSupport(data) {
  return $api.get(`/employee-appeals/`, data)
}

export async function getSupportDataById(id, data) {
  return $api.get(`/employee-appeals/${id}/`, data)
}

export async function getSupportMessagesById(id, data) {
  return $api.get(`/appeal-responses/${id}/`, data)
}

export async function getSupportTypes(data) {
  return $api.get(`/application-types/`, data)
}

export async function createEmployeeSupport(request_type, topic, message) {
  return $apiJSON.post(`/employee-appeals/`, { request_type, topic, message })
}

export async function createSupportMessage(id, commentm) {
  return $apiJSON.post(`/appeal-responses/${id}/`, { commentm })
}

export async function updateSupportMessage(id, data) {
  return $apiJSON.patch(`/employee-appeals/${id}/`, data)
}
