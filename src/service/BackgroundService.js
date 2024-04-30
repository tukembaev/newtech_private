import $api from 'http'
import $apiJSON from 'http/apiJSON'

export async function getImages(data) {
  return $api.get(`/backgrounds/`, data)
}
export async function postImages(data) {
  return $api.post(`/background-post/`, data)
}
export async function getImage(data) {
  return $api.get(`/background-post/`, data)
}
