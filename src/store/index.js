import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import auth from './auth'
export default new Vuex.Store({
  state: {
    is_loading_error : false,
  },
  getters: {
    
  },
  mutations: {
    setLoadingError(state, payload){
      state.is_loading_error = payload
    }
  },
  actions: {
    
  },
  modules: {
    auth
  }
})
