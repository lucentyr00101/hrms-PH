import request from '@/utils/request'

const api = {
  list: '/employee_assets_lists',
  add: '/employee_assets_lists',
  handover: '/employee_assets_lists/search/handover',
  return: (id) => `/employee_assets_lists/${id}/return`
}

export function fetchAssetsList (params) {
  return request({
    url: api.list,
    method: 'get',
    params
  })
}

export function add (data) {
  return request({
    url: api.add,
    method: 'post',
    data
  })
}

export function handover (id) {
  return request({
    url: api.handover,
    method: 'get',
    params: { employee_id: id }
  })
}

export function returnAssets (id) {
  return request({
    url: api.return(id),
    method: 'put'
  })
}
