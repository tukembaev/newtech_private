import $api from 'http'
import $apiJSON from 'http/apiJSON'

export async function getTariffSubscription(data) {
  return $api.get(`/subscription/`, data)
}

export async function getTariffOrders(data) {
  return $api.get(`/orders-employee/`, data)
}
export async function createMyMicroService(data) {
  return $apiJSON.post(`/microservice-order/`, data)
}
export async function requestNewTariff(tarif) {
  return $apiJSON.post(`/application-tariff/`, tarif)
}
export async function consultationTariff(tarif) {
  return $apiJSON.post(`/tariff-consultation/`, tarif)
}
export async function createCustomTariff(data) {
  return $apiJSON.post(`/new-tariff/`, data)
}
