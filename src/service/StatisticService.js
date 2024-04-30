import $api from 'http'
import $apiJSON from 'http/apiJSON'

export async function getAllStatistic(id, data) {
  return $api.get(`/statistic/${id}/`, data)
}
export async function getAllStatisticCompany(id, data) {
  return $api.get(`/allstatistic/`, data)
}

export async function getStatistic(data) {
  return $api.get('/employees/divisionstatistic/', data)
}

export async function getTime() {
  return $api.get('/timemanage/')
}

export async function startTimer() {
  return $api.post('/timemanage/')
}
export async function stopTimer(end_datetime) {
  return $api.patch('/timemanage/', { end_datetime })
}
