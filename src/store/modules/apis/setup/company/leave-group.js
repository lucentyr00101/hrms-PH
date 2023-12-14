import {
  fetchList,
  addLeaveGroup,
  toggleStatus
} from '@/api/setup/company/leave-group'

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
    async addLeaveGroup (_, payload) {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await addLeaveGroup(payload)
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
