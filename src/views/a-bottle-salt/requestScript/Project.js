import request from '@/views/a-bottle-salt/util/fileRequest'

/**
 * 获取专辑列表
 */
export function getAlbum() {
  return request({
    url: '/SaltProject/getAlbum',
    method: 'get'
  })
}

/**
 *获取某个专辑下面的音乐和视频
 */
export function getProject(query) {
  return request({
    url: '/SaltProject/getProject/'+query,
    method: 'get'
  })
}

/**
 * 获取list数据
 */
export function getList() {
  return request({
    url: '/SaltProject/getList',
    method: 'get'
  })
}

export function getImagesByImageCode(query) {
  return request({
    url: '/SaltHomepage/getImagesByImageCode',
    method: 'get',
    params: query,
  })
}
