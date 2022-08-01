import request from '@/views/a-bottle-salt/util/fileRequest'

/**
 * 获取firstPage的背景图片，移动背景图片，以及图标
 * @param query
 */
export function getImagesByImageCode(query) {
  return request({
    url: '/SaltHomepage/getImagesByImageCode',
    method: 'get',
    params: query,
  })
}
