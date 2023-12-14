import {
    fetchList,
    addSSS,
    toggleStatus
  } from '@/api/setup/payroll/sss'

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
      async addSSS (_, payload) {
        return new Promise(async (resolve, reject) => {
          try {
            const res = await addSSS(payload)
            resolve(res)
          } catch (e) {
            reject(e)
          }
        })
      },
      async updateStatus (_, { id, enabled }) {
        return new Promise(async (resolve, reject) => {
          try {
            const res = await toggleStatus(id, enabled)
            resolve(res)
          } catch (e) {
            reject(e)
          }
        })
      }
    }
  }
