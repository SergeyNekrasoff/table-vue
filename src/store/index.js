import Vue from 'vue'
import Vuex from 'vuex'
import timeoutPromise from '@/http/mockData'
const data = require('@/http/data.json')

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    items: [],
    loading: false
  },
  getters: {
    getItems: state => state.items
  },
  mutations: {
    SET_ITEMS(state, data) {
      state.items = data
    },
    SET_LOADING(state, status) {
      state.loading = status
    }
  },
  actions: {
    async getItems ({ commit }) {
      commit('SET_LOADING', true)
      try {
          const response = await timeoutPromise(2000, data)

          if (response.status === 200) {
              commit('SET_ITEMS', response.data)
              commit('SET_LOADING', false)
              return response
          }
      } catch (error) {
          console.log(`status: ${error.status}, message: ${error.message}`)
      }
    }
  }
})
