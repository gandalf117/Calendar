const state = {
    username: null
}

const getters = {}

const mutations = {
    setStateUsername: (state, data) => {
        state.username = data
    }
}

const actions = {
    setUsername ({ commit }, username) {
        commit('setStateUsername', username)
    }
}
  
export default {
    state,
    getters,
    mutations,
    actions
}
