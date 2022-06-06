const state={
  fontFamily:''
}

const mutations = {
  CHANGE_FONT_FAMILY: (state, fontFamily) => {
    state.fontFamily = fontFamily;
  }
}

const actions = {
  changeFontFamily({ commit }, fontFamily) {
    commit('CHANGE_FONT_FAMILY', fontFamily)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
