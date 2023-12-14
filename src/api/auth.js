import request from '@/utils/request'

const api = {
  me: '/auth/me',
  checkStatus: '/auth/check_status'
}

export function me () {
  return request({
    url: api.me,
    method: 'get'
  })
}

export function checkStatus () {
  return request({
    url: api.checkStatus,
    method: 'get'
  })
}
