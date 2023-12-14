import request from '@/utils/request'

const api = {
  list: '/company_calendars',
  add: '/company_calendars',
  status: id => `/company_calendars/${id}/status`
}

export function fetchList (params) {
  return request({
    url: api.list,
    method: 'get',
    params
  })
}

export function addCalendar (data) {
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
