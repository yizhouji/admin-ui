import { productsCategories, getUnits } from '@/api/product'

const good = {
  state: {
    categories: '',
    units: ''
  },

  mutations: {
    SET_CATEGORIES: (state, categories) => {
      state.categories = categories
    },
    SET_UNITS: (state, units) => {
      state.units = units
    }
  },

  actions: {
    // 登录
    getCategories ({ commit }) {
      return new Promise((resolve, reject) => {
        productsCategories()
          .then(response => {
            commit('SET_CATEGORIES', response.result)
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    getunits ({ commit }) {
      return new Promise((resolve, reject) => {
        getUnits()
          .then(response => {
            commit('SET_UNITS', response.result)
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  }
}

export default good
