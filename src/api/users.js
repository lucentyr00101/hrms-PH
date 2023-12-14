import request from '@/utils/request'

const api = {
  list: '/security_users',
  add: '/security_users',
  editAccount: '/security_users/account',
  status: id => `/security_users/${id}/status`,
  resetPassword: id => `/security_users/${id}/reset_password`
}

export function fetchList (params) {
  return request({
    url: api.list,
    method: 'get',
    params
  })
}

export function addUser (data) {
  return request({
    url: api.add,
    method: 'post',
    data
  })
}

export function editAccount (data) {
  return request({
    url: api.editAccount,
    method: 'put',
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

export function resetPassword (id, data) {
  return request({
    url: api.resetPassword(id),
    method: 'put',
    data
  })
}
