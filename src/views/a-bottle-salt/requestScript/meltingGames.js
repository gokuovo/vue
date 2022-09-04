import request from '@/views/a-bottle-salt/util/fileRequest'

export function getNewsLink(query) {
  return request({
    url: '/SaltNewsLink/getNewsLinkOne',
    method: 'get',
    params: query,
  })
}

export function getImagesByImageCode(query) {
  return request({
    url: '/SaltHomepage/getImagesByImageCode',
    method: 'get',
    params: query,
  })
}



