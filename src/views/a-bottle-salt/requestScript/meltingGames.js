import request from '@/views/a-bottle-salt/util/fileRequest'

export function getImagesByImageCode(query) {
  return request({
    url: '/SaltHomepage/getImagesByImageCode',
    method: 'get',
    params: query,
  })
}


export function getWord(query) {
  return request({
    url: '/SaltOurService/getWord',
    method: 'get',
    params: query,
  })
}
