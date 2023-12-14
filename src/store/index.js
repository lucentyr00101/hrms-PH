import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import user from './modules/user'
import modal from './modules/modal'
import filterList from './modules/filter-list'
import api from './modules/apis/index'
// import dictionary from './modules/apis/setup/dictionary'
// import selectList from './modules/select-list'
// import assets from './modules/assets'
// default router permission control
// import permission from './modules/permission'

// dynamic router permission control (Experimental)
import permission from './modules/async-router'
import getters from './getters'

// import employeeAssets from './modules/employee-assets'
// import deductions from './modules/deductions'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    user,
    permission,
    modal,
    api,
    filterList

    // dictionary,
    // assets,
    // selectList,
    // 'employee-assets': employeeAssets,
    // deductions
  },
  state: {},
  mutations: {},
  actions: {},
  getters
})
