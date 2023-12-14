export const state = {
    setupPayrollHDMFModal: false
  }

  export const mutations = {
    TOGGLE_SETUP_PAYROLL_HDMF_MODAL: (state) => {
      state.setupPayrollHDMFModal = !state.setupPayrollHDMFModal
    }
  }
