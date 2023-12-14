import request from '@/utils/request'

const api = {
  list: '/company_leave_groups',
  add: '/company_leave_groups',
  status: id => `/company_leave_groups/${id}/status`
}

export function fetchList (params) {
  return request({
    url: api.list,
    method: 'get',
    params
  })
}

export function addLeaveGroup (data) {
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
