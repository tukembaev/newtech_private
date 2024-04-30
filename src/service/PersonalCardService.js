import $api from 'http'
import $apiJSON from 'http/apiJSON'
//API для получения алертов
export async function getPersonalEmployee(data, language) {
  return $api.get(`/employees/employee-info/`, {
    data: data,
    headers: {
      'Accept-Language': language,
    },
  })
}

export async function patchPersonalEmployee(data, language) {
  return $apiJSON.patch(`/employees/employee-info/`, data, {
    headers: {
      'Accept-Language': language,
    },
  })
}

export async function postQualifications(data, language) {
  return $api.post(`/employees/trainings/`, data, {
    headers: {
      'Accept-Language': language,
    },
  })
}

// export async function postBodyCheck(data) {
//   return $api.post(`/employees/medical-examinations/`,data);
// }

export async function postBodyCheck(data, language) {
  return $api.post(`/employees/medical-examinations/`, data, {
    headers: {
      'Accept-Language': language,
    },
  })
}

export async function postDiplomaticRank(data) {
  return $api.post(`employees/official-ranks/`, data)
}
export async function postAwards(data) {
  return $api.post(`employees/awards/  `, data)
}

// delete Personal info
export async function deleteAwards(id) {
  return $api.delete(`employees/awards/${id}/`)
}
export async function deleteBodyCheck(id) {
  return $api.delete(`employees/medical-examinations/${id}/`)
}
export async function deleteVacations(id) {
  return $api.delete(`employees/vacation-destoy/${id}/`)
}
export async function deleteRanks(id) {
  return $api.delete(`employees/official-ranks/${id}/`)
}
export async function deleteArrivals(id) {
  return $api.delete(`employees/abroad_staying-destoy/${id}/`)
}
export async function deleteReletives(id) {
  return $api.delete(`employees/relative-destoy/${id}/`)
}
export async function deleteActivities(id) {
  return $api.delete(`employees/experience-destoy/${id}/`)
}
export async function deleteTrainings(id) {
  return $api.delete(`employees/trainings/${id}/`)
}
// delete Personal info end
