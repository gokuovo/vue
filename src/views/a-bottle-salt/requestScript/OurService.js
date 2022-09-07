import request from '@/views/a-bottle-salt/util/fileRequest'

export function getVideo(query) {
  return request({
    url: '/SaltOurService/getVideo',
    method: 'get',
    params: query
  })
}

export function getVideoList() {
  return request({
    url: '/SaltOurService/getVideoList',
    method: 'get'
  })
}




export function getRotation(query) {
  return request({
    url: '/SaltOurService/getRotation',
    method: 'get',
    params: query
  })
}


export function getWord() {
  return request({
    url: '/SaltOurService/getWord',
    method: 'get'
  })
}


export function getWordOne(id) {
  return request({
    url: '/SaltOurService/getWordOne',
    method: 'get',
    params: id
  })
}

export function getImagesByImageCode(query) {
  return request({
    url: '/SaltHomepage/getImagesByImageCode',
    method: 'get',
    params: query,
  })
}