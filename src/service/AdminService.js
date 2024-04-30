import $api from 'http'
import $apiJSON from 'http/apiJSON'

export async function createNewUser(
  gender,
  first_name,
  last_name,
  middle_name,
  data_of_birth,
  number_phone,
  email,

  inn,
  password,
) {
  return $apiJSON.post('/account/register/', {
    gender,
    first_name,
    last_name,
    middle_name,
    data_of_birth,
    number_phone,
    email,

    inn,
    password,
  })
}
export async function getPositionData(data) {
  return $api.get(`/position/`, data)
}
export async function getTopPositionData(data) {
  return $api.get(`/position-empl/`, data)
}

export async function getPositionEmpData(id, data) {
  return $api.get(`/posempl/${id}/`, data)
}
