import request from '@/utils/request'

const api = {
  list: '/payroll_tax_setups',
  add: '/payroll_tax_setups',
  status: id => `/payroll_tax_setups/${id}/status`
}

export function fetchList (params) {
  return request({
    url: api.list,
    method: 'get',
    params
  })
}

export function addTax (data) {
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
