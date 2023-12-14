export const state = {
    setupPayrollTinView: false
  }

  export const mutations = {
    TOGGLE_SETUP_PAYROLL_TIN_VIEW: (state) => {
      state.setupPayrollTinView = !state.setupPayrollTinView
    }
  }
