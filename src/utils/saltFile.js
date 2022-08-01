import request from '../utils/fileRequest'

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


export function fileUpload(data,headers) {
  return request({
    url: '/partnersFile',
    method: 'post',
    data: data,
    headers:headers
  })
}
