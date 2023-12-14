import {
  fetchList as _fetchList,
  addUser,
  toggleStatus,
  resetPassword,
  editAccount
} from '@/api/users'

export default {
  namespaced: true,
  actions: {
    resetPassword (_, { id, password }) {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await resetPassword(id, { password })
          resolve(res)
        } catch (e) {
          reject(e)
        }
      })
    },
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
    async addUser (_, payload) {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await addUser(payload)
          resolve(res)
        } catch (e) {
          reject(e)
        }
      })
    },
    async editAccount (_, payload) {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await editAccount(payload)
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
