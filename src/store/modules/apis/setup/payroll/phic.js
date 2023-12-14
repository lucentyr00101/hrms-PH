import {
    fetchList,
    addPHIC,
    toggleStatus
  } from '@/api/setup/payroll/phic'

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
      async addPHIC (_, payload) {
        return new Promise(async (resolve, reject) => {
          try {
            const res = await addPHIC(payload)
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
