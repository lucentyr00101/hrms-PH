export default {
  namespaced: true,
  state: {
    employeeFilter: {}
  },
  getters: {
    employeeFilter: (state) => state.employeeFilter
  },
  mutations: {
    SET_EMPLOYEE_FILTER: (state, payload) => {
      state.employeeFilter = payload
    },
    SET_CLEAR_FILTER: (state, _) => {
      state.employeeFilter = {}
    }
  },
  actions: {
    async setEmployeeFilter ({ commit }, payload = {}) {
      return new Promise(async (resolve, reject) => {
        commit('SET_EMPLOYEE_FILTER', payload)
        resolve()
      })
    }
  }
}
