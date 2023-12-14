import deductions from './deductions'
import payroll from './payroll'
import workInformation from './work-information'
import resignation from './resignation'
import moment from 'moment'

import {
  fetchList as _fetchList,
  addEmployee, get,
  fetchDepartmentDropdown,
  fetchNumberDropdown,
  fetchLastNameDropdown,
  exportEmployee,
  editEmployee,
  fetchEmailDropdown
} from '@/api/employee-setup'

const downloadFromBlob = (blob, filename) => {
  const blobData = new Blob([blob])
  const link = document.createElement('a')
  link.href = window.URL.createObjectURL(blobData)
  link.download = filename
  link.click()
}

export default {

  namespaced: true,
  modules: {
    deductions,
    payroll,
    workInformation,
    resignation
  },
  state: {
    employee: {}
  },
  getters: {
    employee: (state) => state.employee
  },
   mutations: {
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_EMPLOYEE: (state, employee) => {
      state.employee = { ...employee }
    }
  },
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
    async fetchDepartmentDropdown (_, queryParameters = {}) {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await fetchDepartmentDropdown(queryParameters)
          resolve(res)
        } catch (e) {
          reject(e)
        }
      })
    },
    async exportEmployee (_, queryParameters = {}) {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await exportEmployee(queryParameters)
          const date = moment().format('YYYYMMDDHHmmss')
          downloadFromBlob(res, `Employee_Setup_ExportedFile_${date}.csv`)
          resolve(res)
        } catch (e) {
          reject(e)
        }
      })
    },
    async fetchNumberDropdown (_, queryParameters = {}) {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await fetchNumberDropdown(queryParameters)
          resolve(res)
        } catch (e) {
          reject(e)
        }
      })
    },
    async fetchEmailDropdown (_, queryParameters = {}) {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await fetchEmailDropdown(queryParameters)
          resolve(res)
        } catch (e) {
          reject(e)
        }
      })
    },
    async fetchLastNameDropdown (_, queryParameters = {}) {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await fetchLastNameDropdown(queryParameters)
          resolve(res)
        } catch (e) {
          reject(e)
        }
      })
    },
    async get ({ commit }, id) {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await get(id)
          commit('SET_EMPLOYEE', res)
          if (res.employee_setup_resignation) {
            const { status } = res.employee_setup_resignation
            commit('resignation/SET_EMPLOYEE_RESIGNATION', res.employee_setup_resignation)
            commit('resignation/SET_STATUS', status)
          } else {
            commit('resignation/SET_EMPLOYEE_RESIGNATION', {})
            commit('resignation/SET_STATUS', '')
          }

          resolve(res)
        } catch (e) {
          reject(e)
        }
      })
    },
    async addEmployee (_, payload) {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await addEmployee(payload)
          resolve(res)
        } catch (e) {
          reject(e)
        }
      })
    },
    async editEmployee (_, { id, data }) {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await editEmployee(id, data)
          resolve(res)
        } catch (e) {
          reject(e)
        }
      })
    }
  }
}
