import $api from 'http'
import $apiJSON from 'http/apiJSON'

export async function getUserEvents(data) {
  return $api.get(`/calendar/`, data)
}

export async function getCompanyEvents(data) {
  return $api.get(`/academcalendar/`, data)
}

export async function createEvent(title, description, color, start, end) {
  return $apiJSON.post('/calendar/', { title, description, color, start, end })
}

export async function createEventForAll(title, description, color, start, end) {
  return $apiJSON.post('/academcalendar/', {
    title,
    description,
    color,
    start,
    end,
  })
}
