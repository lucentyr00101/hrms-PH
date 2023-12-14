export const state = {
    addSSSModal: false,
    editSSSModal: false
  }

export const mutations = {
    TOGGLE_ADD_SSS_MODAL: (state) => {
      state.addSSSModal = !state.addSSSModal
    },
    TOGGLE_EDIT_SSS_MODAL: (state) => {
      state.editSSSModal = !state.editSSSModal
    }
}
