import
{
  addPayroll,
  getPayroll,
  updatePayroll
} from '@/api/setup/employee/employeeSetup/payroll'

export default {
  namespaced: true,
  actions: {
    async addPayroll (_, payload) {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await addPayroll(payload)
          resolve(res)
        } catch (e) {
          reject(e)
        }
      })
    },
    async getPayroll (_, id) {
      return new Promise(async (resolve, reject) => {
        const res = await getPayroll(id)
        resolve(res)
      })
    },
    async updatePayroll (_, { id, data }) {
      return new Promise(async (resolve, reject) => {
          const res = await updatePayroll(id, data)
          resolve(res)
      })
    }
  }
}
