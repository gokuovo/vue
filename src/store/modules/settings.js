import variables from '@/styles/element-variables.scss'
import defaultSettings from '@/settings'

const { showSettings, tagsView, fixedHeader, sidebarLogo,language } = defaultSettings

const state = {
  theme: variables.theme,
  showSettings: showSettings,
  tagsView: tagsView,
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo,
  language: language,
  logo:'',
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    // eslint-disable-next-line no-prototype-builtins
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  },
  CHANGE_LANGUAGE: (state, language) => {
    state.language = language
  },
  CHANGE_LOGO: (state, logo) => {
    state.logo = logo
  },
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  },
  changeLanguage({ commit }, language) {
    commit('CHANGE_LANGUAGE', language)
  },
  changeLogo({ commit }, logo) {
    commit('CHANGE_LOGO', logo)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

