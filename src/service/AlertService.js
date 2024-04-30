import $api from 'http'
import $apiJSON from 'http/apiJSON'
//API для получения алертов
export async function getAlertData(id, data) {
  return $api.get(`/employees/alert/${id}/`, data)
}

export async function getNewsData(data) {
  return $api.get(`/news/`, data)
}

export async function PostNews(title, description) {
  return $apiJSON.post(`/news/`, { title, description })
}
export async function createRaport(addressee, type, type_doc, text, file) {
  return $api.post('/conversion/raportsforpost/', {
    addressee,
    type,
    type_doc,
    text,
    file,
  })
}

export async function getNewsId(id, data) {
  return $api.get(`/news/${id}/`, data)
}
