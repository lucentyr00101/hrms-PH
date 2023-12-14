import request from '@/utils/request'

const api = {
  add: '/employee_setups_payroll_info/',
  get: (id) => `/employee_setups_payroll_info/${id}`,
  put: (id) => `/employee_setups_payroll_info/${id}`
}

export function addPayroll (data) {
    return request({
        url: api.add,
        method: 'post',
        data
    })
}

export function getPayroll (id) {
  return request({
    url: api.get(id),
    method: 'get'
  })
}

export function updatePayroll (id, data) {
  return request({
    url: api.put(id),
    method: 'put',
    data
  })
}
