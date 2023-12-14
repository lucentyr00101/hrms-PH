import request from '@/utils/request'

const api = {
  list: '/company_calendars_master_lists',
  add: '/company_calendars_master_lists',
  status: id => `/company_calendars_master_lists/${id}/status`,
  activeList: '/company_calendars_master_lists/active'
}

export function fetchList (params) {
  return request({
    url: api.list,
    method: 'get',
    params
  })
}

export function fetchActiveList (params) {
  return request({
    url: api.activeList,
    method: 'get',
    params
  })
}

export function addMasterCalendar (data) {
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
