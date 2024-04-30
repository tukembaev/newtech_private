import $api from 'http'
import $apiJSON from 'http/apiJSON'

//API для получения всех приказов
export async function getProjects(data) {
  return $api.get(`/projects/`, data)
}
export async function createProject(data) {
  return $apiJSON.post(`/projects/`, data)
}
export async function deleteProject(id) {
  return $api.delete(`/projects/${id}/`)
}

export async function getProjectsInfo(id, data) {
  return $api.get(`/projects/${id}/`, data)
}
export async function getAllProjectExpenses(id, data) {
  return $api.get(`/projects-history/${id}/`, data)
}
export async function getAllStageExpenses(id, data) {
  return $api.get(`/stages-history/${id}/`, data)
}
export async function patchProjectsInfo(id, data) {
  return $apiJSON.patch(`/projects/${id}/`, data)
}

export async function getStageInfo(id, data) {
  return $api.get(`/stages/${id}/`, data)
}
export async function patchStageInfo(id, data) {
  return $apiJSON.patch(`/stages/${id}/`, data)
}
export async function patchStageInfoFormData(id, data) {
  return $api.patch(`/stages-files/${id}/`, data)
}
export async function patchStageInfoMember(id, data) {
  return $api.patch(`/stage-member/${id}/`, data)
}
export async function getStageTaskInfo(id, data) {
  return $api.get(`/stage-tasks/${id}/`, data)
}

//-------------------ОБУЧЕНИЕ

export async function getTrainingFlows(data) {
  return $api.get(`/training-stages/`, data)
}

export async function createTrainingFlow(data) {
  return $apiJSON.post(`/training-stages/`, data)
}
