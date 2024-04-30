import $api from 'http'
import $apiJSON from 'http/apiJSON'

//API для авторизации

export async function login(email, password) {
  return $apiJSON.post('account/token/', { username: email, password })
}

export async function logintrash(emailtrash, passwordtrash) {
  return $apiJSON.post('account/token/', {
    username: emailtrash,
    password: passwordtrash,
  })
}

//API вход через почту (не работает)

export async function postToMail(email) {
  return $api.post(`/account/emailauth/`, { email })
}

//API для получения информации пользователя

export async function getUserInfo(id) {
  return $apiJSON.get(`employees/employee/${id}/`)
}
export async function getPersonInfo(id) {
  return $apiJSON.get(`employees/employeeone/${id}/`)
}
export async function getEmailDatacor(emails) {
  return $apiJSON.get(`account/emaillol/${emails}`)
}
export async function getWidgetInfo(id) {
  return $apiJSON.get(`task-app-count/${id}/`)
}

export async function getUserId(data) {
  return $api.get('/employees/userid/', data)
}
//API для изменения профиля пользователя

export async function ChangeProfileImage(imeag) {
  return $api.patch(`employees/profimage/`, { imeag })
}

export async function ChangePassword(new_password) {
  return $apiJSON.patch(`employees/change-password/`, { new_password })
}

export async function ChangePin(pin) {
  return $apiJSON.patch(`employees/change-pin/`, { pin })
}

export async function SendQuizAnswers(data) {
  return $apiJSON.post(`/answer/`, data)
}

export async function SendDevice(device) {
  return $apiJSON.post(`/activity/`, { device })
}

export async function ChangeProfileNumber(number_phone) {
  return $api.patch(`employees/profimage/`, { number_phone })
}
