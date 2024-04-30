import axios from 'axios'

export const API_URL = `https://tm.unet.kg/api/`

export const $apiJSON = axios.create({
  withCredentials: true,
  baseURL: API_URL,
})

$apiJSON.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  return config
})

export default $apiJSON
