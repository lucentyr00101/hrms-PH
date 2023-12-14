import {
  checkStatus,
  me
} from '@/api/auth'

export default {
  namespaced: true,
  state: () => ({
    currentUser: null
  }),
  getters: {
    currentUser: state => state.currentUser
  },
  mutations: {
    SET_CURRENT_USER (state, payload) {
      state.currentUser = payload
    }
  },
  actions: {
    fetchCurrentUser ({ commit }) {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await me()
          commit('SET_CURRENT_USER', res)
          resolve()
        } catch (e) {
          console.log(e)
          reject(e)
        }
      })
    },
    async checkStatus () {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await checkStatus()
          resolve(res)
        } catch (e) {
          reject(e)
        }
      })
    }
  }
}
