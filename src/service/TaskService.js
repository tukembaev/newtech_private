import $api from 'http'
import $apiJSON from 'http/apiJSON'

//API GET

export async function getTasks(data) {
  return $api.get(`/tasks/`, data)
}

export async function getTasksData(id, data) {
  return $api.get(`/tasks/${id}/`, data)
}

export async function getSubTasksData(id, data) {
  return $api.get(`/subtasks/${id}/`, data)
}

export async function getTaskChat(id, data) {
  return $api.get(`/comments/${id}/`, data)
}

//Все задачи поставленные мной
export async function getTasksDataUser(id, data) {
  return $api.get(`/employee-tasks/${id}/`, data)
}
//Все подзадачи
export async function getSubTasksDataUser(id, data) {
  return $api.get(`/employee-subtasks/${id}/`, data)
}

export async function getTaskTree(id, data) {
  return $api.get(`/tasks-tree/${id}/`, data)
}

export async function getSubTaskTree(id, data) {
  return $api.get(`/subtasks-tree/${id}/`, data)
}

export async function getEmployee(data) {
  return $api.get('/employees/division/', data)
}

///API POST

export async function createTask({
  task_name,
  is_critical,
  description,
  members,
  deadline_date,
  allow_change_deadline,
  skip_dayoffs,
  check_after_finish,
  determ_by_subtasks,
  report_after_finish,
  subtasks,
  attached_document,
  stage,
  budget,
  resources,
}) {
  return $apiJSON.post('/tasks/', {
    task_name,
    is_critical,
    description,
    members,
    deadline_date,
    allow_change_deadline,
    skip_dayoffs,
    check_after_finish,
    determ_by_subtasks,
    report_after_finish,
    subtasks,
    attached_document,
    stage,
    budget,
    resources,
  })
}

export async function postMessageTask(id, commentm) {
  return $apiJSON.post(`/comments/${id}/`, {
    commentm,
  })
}
//API PATCH

export async function updateStatusTask(id, data) {
  return $api.patch(`/tasks/${id}/`, data)
}
//ДЛЯ ВИДЖЕТОВ ПОДЗАДАЧ ПАТЧ ПЛЕЙ ПАУЗА
export async function createSubTask(id, data) {
  return $apiJSON.patch(`/tasks/${id}/`, data)
}

export async function createSubTaskForSubTask(id, data) {
  return $apiJSON.patch(`/subtasks/${id}/`, data)
}

export async function updateSubTasksData(id, data) {
  return $api.patch(`/subtasks/${id}/`, data)
}
export async function createFinalReport(id, data) {
  return $api.patch(`/tasks/${id}/`, data)
}

export async function createFinalSubTaskReport(id, data) {
  return $api.patch(`/subtasks/${id}/`, data)
}

export async function addTaskDocument(id, data) {
  return $api.patch(`/tasks-files/${id}/`, data)
}

export async function addSubTaskDocument(id, data) {
  return $api.patch(`/subtasks-files/${id}/`, data)
}
export async function delComents(id, id_del) {
  return $apiJSON.post(`/comment/${id}/`, { id_del })
}

export async function RequestReport(data) {
  return $apiJSON.post(`/tasks-report/`, data)
}
