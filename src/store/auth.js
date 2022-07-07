import api from "@/plugins/api";
import cookie from '@/plugins/cookie'
const state = {
  is_logged: false,
  user: null,
};

const getters = {
  isLogged(state) {
    return state.user ? true : false;
  },
  getUser(state) {
    return state.user
  },
};

const mutations = {
  setUser(state, payload) {
    state.user = payload;
  },
};

const actions = {
  async fetchUser({ commit }, payload) {
    try {
      let res = await api.fetchUser()
      let { user } = res 
      if( user ){
        commit('setUser',user )
      }
    } catch (error) {
      throw error 
    }
  },
  async fetchListUser({} , payload){
    try {
      return await api.fetchListUser(payload)
    } catch (error) {
      throw error 
    }
  },
  logout({}){
    commit('setUser', null )

  }
};

export default {
  state,
  mutations,
  getters,
  actions,
  namespaced: true,
};
