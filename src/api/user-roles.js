import request from '@/utils/request'

const api = {
  list: '/security_roles',
  add: '/security_roles',
  status: id => `/security_roles/${id}/status`
}

export function fetchList (params) {
  return request({
    url: api.list,
    method: 'get',
    params
  })
}

export function addRole (data) {
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
