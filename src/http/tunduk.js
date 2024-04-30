import axios from 'axios'

export const API_URL = `https://{securityserver}/r1/{serviceId}/v2/pets/1124`

export const $apiJSON = axios.create({
  withCredentials: true,
  baseURL: API_URL,
})

$apiJSON.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  return config
})

export default $apiJSON
