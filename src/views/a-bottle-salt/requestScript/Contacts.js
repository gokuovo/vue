import request from '@/views/a-bottle-salt/util/fileRequest'

/**
 * 获取联系图标
 * @param query
 */
export function getSocialSix() {
  return request({
    url: '/SaltContactUs/getSocialSix',
    method: 'get'
  })
}

/**
 * 获取右侧联系图标
 * @param query
 */
export function getSocialFour() {
  return request({
    url: '/SaltContactUs/getSocialFour',
    method: 'get'
  })
}

/**
 * 获取contact us的背景图片，移动背景图片，以及图标
 * @param query
 */
export function getContactImage_back(query) {
  return request({
    url: '/SaltHomepage/getImagesByImageCode',
    method: 'get',
    params: query,
  })
}

/**
 * 获取联系地址等信息
 */
export function getContact() {
  return request({
    url: '/SaltContactUs/getContact',
    method: 'get'
  })
}


