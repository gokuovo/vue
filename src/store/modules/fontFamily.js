const state={
  fontFamily:'',
  maxHeight:'',
}

const mutations = {
  CHANGE_FONT_FAMILY: (state, fontFamily) => {
    state.fontFamily = fontFamily;
  },

  CHANGE_MAX_HEIGHT: (state, maxHeight) => {
    state.maxHeight = maxHeight;
  }
}

const actions = {
  changeFontFamily({ commit }, fontFamily) {
    commit('CHANGE_FONT_FAMILY', fontFamily)
  },
  changeMaxHeight({ commit }, maxHeight) {
    commit('CHANGE_MAX_HEIGHT', maxHeight)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
