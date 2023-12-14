import {
  fetchDictTypeList,
  fetchValuesList as _fetchValuesList,
  toggleStatus,
  addDictionary,
  addValues,
  editValues,
  toggleStatusValue,
  getDropdownValues,
  getDropdownFilterValues
} from '@/api/dictionary'

export default {
  namespaced: true,
  actions: {
    async fetchList (_, queryParameters = {}) {
      return new Promise(async (resolve, reject) => {
        const res = await fetchDictTypeList(queryParameters)
        resolve(res)
      })
    },
    async fetchValuesList (_, queryParameters = {}) {
      return new Promise(async (resolve, reject) => {
        const res = await _fetchValuesList(queryParameters)
        resolve(res)
      })
    },
    async addDictionary (_, payload) {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await addDictionary(payload)
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
    },
    async addValues (_, payload) {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await addValues(payload)
          resolve(res)
        } catch (e) {
          reject(e)
        }
      })
    },
    async editValues (_, { id, data }) {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await editValues(id, data)
          resolve(res)
        } catch (e) {
          reject(e)
        }
      })
    },
    async updateStatusValue (_, { id, status }) {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await toggleStatusValue(id, { enabled: status })
          resolve(res)
        } catch (e) {
          reject(e)
        }
      })
    },
    async getDropdownValues (_, type) {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await getDropdownValues(type)

          resolve(res.dictionary_setup_values)
        } catch (e) {
          reject(e)
        }
      })
    },
    async getDropdownFilterValues (_, type) {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await getDropdownFilterValues(type)

          resolve(res)
        } catch (e) {
          reject(e)
        }
      })
    }
  }
}
