import request from '@/views/a-bottle-salt/util/fileRequest'

/**
 * 获取合作伙伴图片以及链接
 */
export function getAllPartners() {
  return request({
    url: '/SaltPartners/getPartners',
    method: 'get'
  })
}

/**
 * 获取移动背景图片
 * @param query
 */
export function getContactImage_back(query) {
  return request({
    url: '/SaltHomepage/getImagesByImageCode',
    method: 'get',
    params: query,
  })
}

