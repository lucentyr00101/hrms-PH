import request from '@/utils/request'

const api = {
  list: '/company_departments',
  add: '/company_departments'
}

// company
export function fetchList (params) {
  return request({
    url: api.list,
    method: 'get',
    params
  })
}

export function addDepartment (data) {
  return request({
    url: api.add,
    method: 'post',
    data
  })
}
