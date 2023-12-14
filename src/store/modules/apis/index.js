import setup from './setup'
import main from './main'
import security from './security'
import auth from './auth'
import dropdown from './dropdown'

export default {
  namespaced: true,
  modules: {
    setup,
    main,
    security,
    auth,
    dropdown
  }
}
