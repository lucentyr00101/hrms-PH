import
{
    fetchSalaryTypeDropdown,
    fetchPayFrequencyDropdown,
    fetchTaxCategoryDropdown,
    fetchBankDropdown,
    fetchSSSDropdown,
    fetchPHICDropdown,
    fetchHDMFDropdown
} from '@/api/dropdown'

export default {
  namespaced: true,
  actions: {
    async fetchSalaryTypeDropdown (_, queryParameters = {}) {
      return new Promise(async (resolve, reject) => {
        const res = await fetchSalaryTypeDropdown(queryParameters)
        resolve(res)
      })
    },
    async fetchPayFrequencyDropdown (_, queryParameters = {}) {
      return new Promise(async (resolve, reject) => {
        const res = await fetchPayFrequencyDropdown(queryParameters)
        resolve(res)
      })
    },
    async fetchTaxCategoryDropdown (_, queryParameters = {}) {
        return new Promise(async (resolve, reject) => {
          const res = await fetchTaxCategoryDropdown(queryParameters)
          resolve(res)
        })
    },
    async fetchBankDropdown (_, queryParameters = {}) {
        return new Promise(async (resolve, reject) => {
          const res = await fetchBankDropdown(queryParameters)
          resolve(res)
        })
    },
    async fetchSSSDropdown (_, queryParameters = {}) {
        return new Promise(async (resolve, reject) => {
          const res = await fetchSSSDropdown(queryParameters)
          resolve(res)
        })
    },
    async fetchPHICDropdown (_, queryParameters = {}) {
        return new Promise(async (resolve, reject) => {
          const res = await fetchPHICDropdown(queryParameters)
          resolve(res)
        })
    },
    async fetchHDMFDropdown (_, queryParameters = {}) {
        return new Promise(async (resolve, reject) => {
          const res = await fetchHDMFDropdown(queryParameters)
          resolve(res)
        })
    }
  }
}
