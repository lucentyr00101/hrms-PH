import { addDepartment, fetchList } from '@/api/setup/company/departments'

export default {
  namespaced: true,
  actions: {
    async fetchList ({ commit }, queryParameters = {}) {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await fetchList(queryParameters)
          resolve(res)
        } catch (e) {
          reject(e)
        }
      })
    },
    async add (_, payload) {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await addDepartment(payload)
          resolve(res)
        } catch (e) {
          reject(e)
        }
      })
    }
  }
}
