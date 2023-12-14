import {
    add,
    update,
    get,
    dropdownDepartment,
    dropdownLeaveGroup
} from '@/api/work-information'

export default {
    namespaced: true,
    actions: {
      // async add (_, queryParameters) {
      //   return new Promise(async (resolve, reject) => {
      //     const res = await add(queryParameters)
      //     resolve(res)
      //   })
      // }
      async add (_, payload) {
        return new Promise(async (resolve, reject) => {
          try {
            const res = await add(payload)
            resolve(res)
          } catch (e) {
            reject(e)
          }
        })
      },
      async update (_, { id, data }) {
        return new Promise(async (resolve, reject) => {
          try {
            const res = await update(id, data)
            resolve(res)
          } catch (e) {
            reject(e)
          }
        })
      },
      async get (_, id) {
        return new Promise(async (resolve, reject) => {
          const res = await get(id)
          resolve(res)
        })
      },
      async dropdownDepartment ({ commit }, queryParameters = {}) {
        return new Promise(async (resolve, reject) => {
          try {
            const res = await dropdownDepartment(queryParameters)
            resolve(res)
          } catch (e) {
            reject(e)
          }
        })
      },
      async dropdownLeaveGroup ({ commit }, queryParameters = {}) {
        return new Promise(async (resolve, reject) => {
          try {
            const res = await dropdownLeaveGroup(queryParameters)
            resolve(res)
          } catch (e) {
            reject(e)
          }
        })
      }
    }
  }
