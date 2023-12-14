export const state = {
  addPhicTypeModal: false,
  editPhicTypeModal: false
}

export const mutations = {
  TOGGLE_ADD_PHIC_TYPE_MODAL: (state) => {
    state.addPhicTypeModal = !state.addPhicTypeModal
  },
  TOGGLE_EDIT_PHIC_TYPE_MODAL: (state) => {
    state.editPhicTypeModal = !state.editPhicTypeModal
  }
}
