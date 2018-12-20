import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    anonymousVotingAdd: ""
  },
  mutations: {
    anonymousVoting (state, address) {
      state.anonymousVotingAdd = address
    }
  },
  actions: {
    anonymousVoting(context, address) {
      context.commit('anonymousVoting', address)
    }
  }
})
