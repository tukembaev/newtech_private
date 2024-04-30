import $api from 'http'
import $apiJSON from 'http/apiJSON'

//API для получения всех приказов
export async function getAllTariffs(data) {
  return $api.get(`/tariff/`, data)
}

export async function sendQouteForAuthUsers(tariff) {
  return $apiJSON.post(`/tariff/`, tariff)
}
export async function sendQouteForNonAuthUsers(data) {
  return $apiJSON.post(`/application-tariff/`, data)
}
