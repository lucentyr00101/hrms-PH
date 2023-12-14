export const state = {
  addLeaveGroupModal: false,
  editLeaveGroupModal: false
}

export const getters = {
  addLeaveGroupModal: state => state.addLeaveGroupModal
}

export const mutations = {
  TOGGLE_ADD_LEAVE_GROUP_MODAL: (state) => {
    state.addLeaveGroupModal = !state.addLeaveGroupModal
  },
  TOGGLE_EDIT_LEAVE_GROUP_MODAL: (state) => {
    state.editLeaveGroupModal = !state.editLeaveGroupModal
  }
}
