import storage from 'store'
import expirePlugin from 'store/plugins/expire'
import { login, getInfo, refreshToken, logout } from '@/api/login'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/store/mutation-types'
import { welcome } from '@/utils/util'

storage.addPlugin(expirePlugin)
const user = {
  state: {
    token: '',
    name: '',
    welcome: '',
    avatar: '',
    roles: [],
    info: {}
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, { name, welcome }) => {
      state.name = name
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    }
  },

  actions: {
    // 登录
    RefreshToken ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        refreshToken().then(response => {
          const tokenExpiration = new Date().getTime() + (1000 * response.expires_in)
          const refreshTokenExp = new Date().getTime() + (1000 * response.refresh_expires_in)
          storage.set(ACCESS_TOKEN, response.access_token, tokenExpiration)
          storage.set(REFRESH_TOKEN, response.refresh_token, refreshTokenExp)
          commit('SET_TOKEN', response.access_token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    Login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          const tokenExpiration = new Date().getTime() + (1000 * response.expires_in)
          const refreshTokenExp = new Date().getTime() + (1000 * response.refresh_expires_in)
          storage.set(ACCESS_TOKEN, response.access_token, tokenExpiration)
          storage.set(REFRESH_TOKEN, response.refresh_token, refreshTokenExp)
          commit('SET_TOKEN', response.access_token)
          commit('SET_CLEAR_FILTER')
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          const result = response.result

          if (result.role && result.role.permissions.length > 0) {
            const role = result.role
            role.permissions = result.role.permissions
            role.permissions.map(per => {
              if (per.actionEntitySet != null && per.actionEntitySet.length > 0) {
                const action = per.actionEntitySet.map(action => { return action.action })
                per.actionList = action
              }
            })
            role.permissionList = role.permissions.map(permission => { return permission.permissionId })
            commit('SET_ROLES', result.role)
            commit('SET_INFO', result)
          } else {
            reject(new Error('getInfo: roles must be a non-null array !'))
          }

          commit('SET_NAME', { name: result.name, welcome: welcome() })
          commit('SET_AVATAR', result.avatar)

          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    Logout ({ commit }) {
      return new Promise((resolve, reject) => {
        logout().then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          storage.clearAll()
          resolve()
        }).catch((err) => {
          console.log('logout fail:', err)
          reject(err)
          // resolve()
        }).finally(() => {
        })
      })
    }

  }
}

export default user
