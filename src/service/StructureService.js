import $api from 'http'
import $apiJSON from 'http/apiJSON'

export async function getUserStructure(data) {
  return $api.get(`/organizations/employee-organizations/`, data)
}

export async function getStructureDataId(data) {
  return $api.get(`/organizations/organizations/`, data)
}

export async function createStructureData(data) {
  return $apiJSON.post(`/organizations/organizations/`, data)
}

export async function GetPositionOfStructure(structure_name, id, data) {
  return $apiJSON.get(`/organizations/posts/${structure_name}/${id}/`, data)
}
export async function GetEmpOfStructure(structure_name, id, data) {
  return $apiJSON.get(`/organizations/employees/${structure_name}/${id}/`, data)
}

export async function createPositionToStructure(
  structure_name,
  id,
  { title, state, wage },
) {
  return $apiJSON.post(`/organizations/posts/${structure_name}/${id}/`, {
    title,
    state,
    wage,
  })
}
export async function createEmpToStructure(
  structure_name,
  id,
  { mov_employee_id, post, state, stavka },
) {
  return $apiJSON.post(`/organizations/employees/${structure_name}/${id}/`, {
    mov_employee_id,
    post,
    state,
    stavka,
  })
}
