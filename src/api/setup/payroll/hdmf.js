import request from '@/utils/request'

const api = {
  list: '/payroll_hdmf_setups',
  add: '/payroll_hdmf_setups',
  status: id => `/payroll_hdmf_setups/${id}/status`
}

export function fetchList (params) {
  return request({
    url: api.list,
    method: 'get',
    params
  })
}

export function addHDMF (data) {
  return request({
    url: api.add,
    method: 'post',
    data
  })
}

export function toggleStatus (id, enabled) {
  return request({
    url: api.status(id),
    method: 'put',
    data: { enabled }
  })
}
