import request from '@/views/a-bottle-salt/util/fileRequest'

/**
 * 获取news的news栏目的标签
 * @param query
 */
export function getNews() {
  return request({
    url: '/SaltNews/getNews',
    method: 'get'
  })
}

/**
 * 获取news的workLog栏目标签
 * @param query
 */
export function getWorkLogNews() {
  return request({
    url: '/SaltNews/getWorklog',
    method: 'get'
  })
}

/**
 * 获取背景可动图
 * @param query
 */
export function getImagesByImageCode(query) {
  return request({
    url: '/SaltHomepage/getImagesByImageCode',
    method: 'get',
    params: query,
  })
}
