import {
  fetchList as _fetchList,
  addRole,
  toggleStatus
} from '@/api/user-roles'

export default {
  namespaced: true,
  actions: {
    async fetchList (_, queryParameters = {}) {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await _fetchList(queryParameters)
          resolve(res)
        } catch (e) {
          reject(e)
        }
      })
    },
    async addRole (_, payload) {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await addRole(payload)
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
