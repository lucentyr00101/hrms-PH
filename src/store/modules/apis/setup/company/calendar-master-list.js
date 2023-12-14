import {
  fetchList,
  addMasterCalendar,
  toggleStatus,
  fetchActiveList
} from '@/api/setup/company/calendar-master-list'

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
    async addMasterCalendar (_, payload) {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await addMasterCalendar(payload)
          resolve(res)
        } catch (e) {
          reject(e)
        }
      })
    },
    async updateStatus (_, { id, enabled }) {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await toggleStatus(id, { enabled })
          resolve(res)
        } catch (e) {
          reject(e)
        }
      })
    },
    async fetchActiveList (_, queryParameters = {}) {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await fetchActiveList(queryParameters)
          resolve(res)
        } catch (e) {
          reject(e)
        }
      })
    }
  }
}
