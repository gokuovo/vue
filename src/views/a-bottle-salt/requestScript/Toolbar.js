import request from '@/views/a-bottle-salt/util/fileRequest'

export function getMenu(query) {
  return request({
    url: '/SaltPortalMenu/getMenu',
    method: 'get',
    params: query
  })
}

export function getLogo(query) {
  return request({
    url: '/SaltHomepage/getLogo',
    method: 'get',
    params: query
  })
}
