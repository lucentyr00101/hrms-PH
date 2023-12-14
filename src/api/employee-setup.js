import request from '@/utils/request'

const api = {
  list: '/employee_setups',
  add: '/employee_setups',
  export: `/employee_setups/export`,
  get: (id) => `/employee_setups/${id}`,
  department: '/filters/department',
  lastName: '/filters/employee_last_name',
  number: '/filters/employee_number',
  email: '/filters/email'
}

export function exportEmployee (parameter) {
  return request({
    url: api.export,
    method: 'get',
    params: parameter
  })
}

export function fetchList (params) {
  return request({
    url: api.list,
    method: 'get',
    params
  })
}

export function fetchLastNameDropdown (params) {
  return request({
    url: api.lastName,
    method: 'get',
    params
  })
}

export function fetchNumberDropdown (params) {
  return request({
    url: api.number,
    method: 'get',
    params
  })
}

export function fetchEmailDropdown (params) {
  return request({
    url: api.email,
    method: 'get',
    params
  })
}

export function fetchDepartmentDropdown (params) {
  return request({
    url: api.department,
    method: 'get',
    params
  })
}

export function get (id) {
  return request({
    url: api.get(id),
    method: 'get'
  })
}

export function addEmployee (data) {
  return request({
    url: api.add,
    method: 'post',
    data
  })
}

export function editEmployee (id, data) {
  return request({
    url: api.get(id),
    method: 'put',
    data
  })
}
