import * as types from './mutation-type'

export default {
  [types.SET_LOGGED_IN](state) {
    state.loggedIn = true
  },

  [types.REMOVE_LOGGED_IN](state) {
    state.loggedIn = false
    state.user = null
  },

  [types.SET_USER](state, payload) {
    state.user = payload
  },

  [types.MARK_READ_MESSAGE](state, payload) {
    state.alreadyReadMessages.push(payload)
  },

  [types.MARK_UNREAD_MESSAGE](state, payload) {
    // console.log('===:  ', payload)
    state.unreadMessages.push(payload)
  },

  [types.REMOVE_UNREAD_MESSAGE](state, payload) {
    // payload => message.id
    const { unreadMessages } = state
    const index = unreadMessages.findIndex(el => el.id === payload)
    unreadMessages.splice(index, 1)
  },

  [types.SET_USER_PERMISSIONS](state, permissions) {
    state.permissions = permissions
      .map(permission => Object.values(permission))
      .flat(2)
      .map(p => p.permission)
  },

  [types.SET_REFRESH_OPTION](state, option) {
    state.refreshOptions = option
  },

  /**
   * 存储视频预览组件所需要的数据
   * @param {object} state Vuex 的 state 对象
   * @param {object} data 视频数据
   */
  setVideoPreviewData(state, data) {
    if (data.videoPreviewVisible) {
      state.videoPreview.videoPreviewVisible = data.videoPreviewVisible
      state.videoPreview.videoPreviewList = data.videoPreviewList
      state.videoPreview.defaultActiveIndex = data.activeIndex
    } else {
      state.videoPreview.videoPreviewVisible = false
      state.videoPreview.videoPreviewList = []
      state.videoPreview.defaultActiveIndex = 0
    }
  },

  /**
   * 存储图片预览组件所需要的数据
   * @param {object} state Vuex 的 state 对象
   * @param {object} data 图片数据
   */
  setImgPreviewData(state, data) {
    if(data.imgPreviewVisible) {
      state.imgPreview.imgPreviewVisible = data.imgPreviewVisible
      state.imgPreview.imgPreviewList = data.imgPreviewList
      state.imgPreview.defaultActiveIndex = data.activeIndex
    } else {
      state.imgPreview.imgPreviewVisible = data.false
      state.imgPreview.imgPreviewList = []
      state.imgPreview.defaultActiveIndex = 0
    }
  }
}
