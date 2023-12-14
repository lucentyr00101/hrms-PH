import request from '@/utils/request'

const api = {
  add: '/employee_setups_work_info/',
  update: (id) => `/employee_setups_work_info/${id}`,
  get: (id) => `/employee_setups_work_info/${id}`,
  dropdownDepartment: 'company_departments/active',
  dropdownLeaveGroup: '/company_leave_groups'
}

export function add (data) {
    return request({
      url: api.add,
      method: 'post',
      data
    })
}

export function update (id, data) {
  return request({
    url: api.update(id),
    method: 'put',
    data
  })
}

export function getWorkInfo (id) {
  return request({
    url: api.get(id),
    method: 'get'
  })
}

export function dropdownDepartment (params) {
  return request({
    url: api.dropdownDepartment,
    method: 'get',
    params
  })
}

export function dropdownLeaveGroup (params) {
  return request({
    url: api.dropdownLeaveGroup,
    method: 'get',
    params
  })
}
