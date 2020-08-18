import storage from 'store'
import { login, logout } from '@/api/login'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { welcome } from '@/utils/util'

const user = {
  state: {
    token: '',
    user: ''
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, { name, welcome }) => {
      state.name = name
      state.welcome = welcome
    },
    SET_USER: (state, userinfo) => {
      state.user = userinfo
    }
  },

  actions: {
    // 登录
    Login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo)
          .then(response => {
            //  console.log(response)
            const result = response.result

            storage.set(ACCESS_TOKEN, result.userId, 7 * 24 * 60 * 60 * 1000)
            commit('SET_USER', result)
            commit('SET_TOKEN', result.userId)
            commit('SET_NAME', { name: result.name, welcome: welcome() })
            storage.set('USERINFO', result)
            resolve()
          })
          .catch(error => {
            //  console.log(error)
            reject(error)
          })
      })
    },

    // 获取用户信息
    GetInfo ({ commit }, state) {
      return new Promise(resolve => {
        // const user = state.user
        resolve(state.user)
      })
    },

    // 登出
    Logout ({ commit, state }) {
      return new Promise(resolve => {
        logout(state.token)
          .then(() => {
            resolve()
          })
          .catch(() => {
            resolve()
          })
          .finally(() => {
            commit('SET_TOKEN', '')
            commit('SET_USER', '')
            storage.remove(ACCESS_TOKEN)
          })
      })
    }
  }
}

export default user
