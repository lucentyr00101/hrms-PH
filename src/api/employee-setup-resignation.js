import request from '@/utils/request'

const api = {
  add: `/employee_setups_resignation`,
  get: (id) => `/employee_setups_resignation/${id}`,
  upload: (id) => `/employee_setups_resignation/${id}/upload`,
  approve: (id) => `/employee_setups_resignation/${id}/approve`,
  reject: (id) => `/employee_setups_resignation/${id}/reject`,
  withdraw: (id) => `/employee_setups_resignation/routes/${id}/withdraw`
}

export function employeeResignation (id) {
  return request({
    url: api.get(id),
    method: 'get'
  })
}

export function addEmployeeResignation (data) {
  return request({
    url: api.add,
    method: 'post',
    data
  })
}

export function approveResignation (id, data) {
  return request({
    url: api.approve(id),
    method: 'put',
    data
  })
}

export function rejectResignation (id, data) {
  return request({
    url: api.reject(id),
    method: 'put',
    data
  })
}

export function uploadResignation (id, data) {
  return request({
    url: api.upload(id),
    method: 'put',
    data
  })
}

export function withdrawResignation (id) {
  return request({
    url: api.withdraw(id),
    method: 'put'
  })
}
