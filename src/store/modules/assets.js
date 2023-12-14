import {
  fetchAssetsList, add, handover, returnAssets
} from '@/api/assets'

export default {
  namespaced: true,
  actions: {
    async fetchList (_, queryParameters = {}) {
      return new Promise(async (resolve, reject) => {
        const res = await fetchAssetsList(queryParameters)
        resolve(res)
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
    },
    async handover (_, id) {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await handover(id)
          resolve(res)
        } catch (error) {
          reject(error)
        }
      })
    },
    async returnAssets (_, id) {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await returnAssets(id)
          resolve(res)
        } catch (error) {
          reject(error)
        }
      })
    }
  }
}
