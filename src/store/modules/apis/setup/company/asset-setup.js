import {
  fetchList,
  fetchAssetList,
  add
} from '@/api/company-assets'

export default {
  namespaced: true,
  actions: {
    async fetchList (_, queryParameters = {}) {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await fetchList(queryParameters)
          resolve(res)
        } catch (e) {
          reject(e)
        }
      })
    },
    async fetchAssetList (_, queryParameters = {}) {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await fetchAssetList(queryParameters)
          resolve(res)
        } catch (e) {
          reject(e)
        }
      })
    },
    async add (_, payload) {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await add(payload)
          resolve(res)
        } catch (error) {
          reject(error)
        }
      })
    }
  }
}
