import request from '@/views/a-bottle-salt/util/fileRequest'

export function getTeam() {
  return request({
    url: '/SaltTeam/getTeam',
    method: 'get'
  })
}
