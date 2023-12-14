import request from '@/utils/request'

const api = {
  list: '/dictionary_setups',
  add: '/dictionary_setups',
  status: id => `/dictionary_setups/${id}/status`,
  values: '/dictionary_setups_values',
  editValues: id => `/dictionary_setups_values/${id}`,
  statusValue: id => `/dictionary_setups_values/${id}/status`,
  typeValue: type => `/dictionary_setups/${type}`,
  typeFilterValue: type => `/filters/${type}`
}

export const type = {
  HOLIDAY: 'holiday_type',
  GENDER: 'gender',
  EDUCATION: 'highest_education',
  MARITAL: 'marital_status',
  NATIONALITY: 'nationality',
  LASTNAME: 'employee_last_name',
  NUMBER: 'employee_number',
  DEPARTMENT: 'department'
}

export function fetchDictTypeList (params) {
  return request({
    url: api.list,
    method: 'get',
    params
  })
}

export function fetchValuesList (params) {
  return request({
    url: api.values,
    method: 'get',
    params
  })
}

export function addDictionary (data) {
  return request({
    url: api.add,
    method: 'post',
    data
  })
}

export function toggleStatus (id, data) {
  return request({
    url: api.status(id),
    method: 'put',
    data
  })
}

export function addValues (data) {
  return request({
    url: api.values,
    method: 'post',
    data
  })
}

export function editValues (id, data) {
  return request({
    url: api.editValues(id),
    method: 'put',
    data
  })
}

export function toggleStatusValue (id, data) {
  return request({
    url: api.statusValue(id),
    method: 'put',
    data
  })
}

export function getDropdownValues (type) {
  return request({
    url: api.typeValue(type),
    method: 'get'
  })
}

export function getDropdownFilterValues (type) {
  return request({
    url: api.typeFilterValue(type),
    method: 'get'
  })
}
