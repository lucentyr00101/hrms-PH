import request from '@/utils/request'

const api = {
    getSalaryTypeDropdown: '/dictionary_setups/salary_type',
    getPayFrequencyDropdown: '/dictionary_setups/pay_frequency',
    getTaxCategoryDropdown: '/payroll_tax_setups/active',
    getBankDropdown: '/dictionary_setups/bank',
    getSSSDropdown: '/payroll_sss_setups/active',
    getPHICDropdown: '/payroll_phic_setups/active',
    getHDMFDropdown: '/payroll_hdmf_setups/active'
}

export function fetchSalaryTypeDropdown (params) {
    return request({
        url: api.getSalaryTypeDropdown,
        method: 'get',
        params
    })
}

export function fetchPayFrequencyDropdown (params) {
    return request({
        url: api.getPayFrequencyDropdown,
        method: 'get',
        params
    })
}

export function fetchTaxCategoryDropdown (params) {
    return request({
        url: api.getTaxCategoryDropdown,
        method: 'get',
        params
    })
}

export function fetchBankDropdown (params) {
    return request({
        url: api.getBankDropdown,
        method: 'get',
        params
    })
}

export function fetchSSSDropdown (params) {
    return request({
        url: api.getSSSDropdown,
        method: 'get',
        params
    })
}

export function fetchPHICDropdown (params) {
    return request({
        url: api.getPHICDropdown,
        method: 'get',
        params
    })
}

export function fetchHDMFDropdown (params) {
    return request({
        url: api.getHDMFDropdown,
        method: 'get',
        params
    })
}
