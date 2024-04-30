import $api from 'http'
import $apiJSON from 'http/apiJSON'

//API GET
export async function getRaport(id, data) {
  return $api.get(`/conversion/raports/${id}/`, data)
}

export async function getRaportData(id, data) {
  return $api.get(`/conversion/raport/${id}/`, data)
}

export async function getRequirements(data) {
  return $api.get('/conversion/trebovaniya/ ', data)
}

export async function getAllRaports(data) {
  return $api.get(`/conversion/raports/`, data)
}

export async function getAllApproval(data) {
  return $api.get(`/approval/`, data)
}

export async function getChancellery(data) {
  return $api.get(`/conversion/raports/`, data)
}

export async function getSendedForMeRaports(id, data) {
  return $api.get(`/conversion/adressee-raports/${id}/`, data)
}

//API POST

export async function createRaport(formdata) {
  return $api.post('/conversion/raportsforpost/', formdata, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

export async function createRepair(employee, type, podtypezayavki, text, file) {
  return $api.post('/conversion/remont/', {
    employee,
    type,
    podtypezayavki,
    text,
    file,
  })
}

export async function createOrgTech(
  employee,
  type,
  podtypezayavki,
  text,
  file,
) {
  return $api.post('/conversion/orgtech/', {
    employee,
    type,
    podtypezayavki,
    text,
    file,
  })
}

export async function createRequirement({
  company_organization,
  views_operations,
  date_today,
  type,
  warehouse,
  department,
  requestedmen,
  uniq_codes,
  purchaselistproducts,
}) {
  return $apiJSON.post('conversion/trebovaniya/ ', {
    company_organization,
    views_operations,
    date_today,
    type,
    warehouse,
    department,
    requestedmen,
    uniq_codes,
    purchaselistproducts,
  })
}

export async function createWriteOff({
  employee,
  type,
  podtypezayavki,
  text,
  spisanie,
}) {
  return $apiJSON.post('/conversion/spisanie/', {
    employee,
    type,
    podtypezayavki,
    text,
    spisanie,
  })
}

export async function RequestReportStatement(data) {
  return $apiJSON.post(`/conversion/conversion-report/`, data)
}
//API PATCH

export async function SignRaport(id, data) {
  return $apiJSON.patch(`/conversion/raport/${id}/`, data)
}

export async function SingSendReqToZav(id, data) {
  return $apiJSON.patch(`/conversion/raport/${id}/`, data)
}
