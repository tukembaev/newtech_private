import $api from 'http'
import $apiJSON from 'http/apiJSON'
//API для получения алертов
export async function getPublications(data) {
  return $api.get(`/publications/`, data)
}

export async function postPublications(
  title,
  description,
  kind,
  link,
  doi,
  issn,
  eid,
  isni,
  wikipedia_url,
  wikidata,
  country,
  published,
  authors,
) {
  return $apiJSON.post(`/publications/`, {
    title,
    description,
    kind,
    link,
    doi,
    issn,
    eid,
    isni,
    wikipedia_url,
    wikidata,
    country,
    published,
    authors,
  })
}

export async function getPublicationInfo(id, data) {
  return $api.get(`/publications/${id}/`, data)
}
export async function patchPublicationInfo(id, data) {
  return $api.patch(`/publications/${id}/`, data)
}
