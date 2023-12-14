import request from '@/utils/request'

const api = {
  list: '/employee_work_shift_setups/',
  add: '/employee_work_shift_setups/'
}

export function fetchList (params) {
  return request({
    url: api.list,
    method: 'get',
    params
  })
}
export function addWorkShiftSetup (data) {
    return request({
      url: api.add,
      method: 'post',
      data
    })
}
