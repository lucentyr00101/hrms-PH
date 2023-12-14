import {
    fetchList,
    addTax,
    toggleStatus
  } from '@/api/setup/payroll/tax'

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
      async addTax (_, payload) {
        return new Promise(async (resolve, reject) => {
          try {
            const res = await addTax(payload)
            resolve(res)
          } catch (e) {
            reject(e)
          }
        })
      },
      async updateStatus (_, { id, status }) {
        return new Promise(async (resolve, reject) => {
          try {
            const res = await toggleStatus(id, { enabled: status })
            resolve(res)
          } catch (e) {
            reject(e)
          }
        })
      }
    }
  }
