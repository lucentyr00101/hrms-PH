import {
    fetchList,
    addWorkShiftSetup
} from '@/api/setup/employee/work-shift-setup'

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
    async addWorkShiftSetup (_, payload) {
        return new Promise(async (resolve, reject) => {
            try {
            const res = await addWorkShiftSetup(payload)
            resolve(res)
            } catch (e) {
            reject(e)
            }
        })
        }
    }
}
