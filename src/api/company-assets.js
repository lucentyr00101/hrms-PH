import request from '@/utils/request'

const api = {
  list: '/company_assets_setups',
  assetList: '/company_assets_setups/available',
  add: '/company_assets_setups'
}

export function fetchList (params) {
  return request({
    url: api.list,
    method: 'get',
    params
  })
}

export function fetchAssetList (params) {
  return request({
    url: api.assetList,
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
