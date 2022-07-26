const NewsRouter = {
  route: null,
  name: null,
  title: 'news菜单管理',
  type: 'folder',
  icon: 'iconfont icon-zidingyi',
  filePath: 'view/partners/',
  order: null,
  inNav: true,
  children: [
    {
      title: 'news列表',
      type: 'view',
      name: 'newsList',
      route: '/news/newslist',
      filePath: 'view/news/news-list.vue',
      inNav: true,
      icon: 'iconfont icon-jiemiansheji',
      permission: null,
      order: 1,
    },
    {
      title: 'worklog列表',
      type: 'view',
      name: 'WorklogList',
      route: '/news/workloglist',
      filePath: 'view/news/worklog-list.vue',
      inNav: true,
      icon: 'iconfont icon-jiemiansheji',
      permission: null,
      order: 2,
    },
    {
      title: 'news内容查看',
      type: 'view',
      name: 'newslinkList',
      route: '/newslink/newslinklist',
      filePath: 'view/newslink/newslink-list.vue',
      inNav: true,
      icon: 'iconfont icon-jiemiansheji',
      permission: null,
      order: 3,
    },
    {
      title: '新增news',
      type: 'view',
      name: 'NewsAdd',
      route: '/news/news',
      filePath: 'view/news/news.vue',
      inNav: true,
      icon: 'iconfont icon-jia',
      permission: null,
      order: 3,
    },
    {
      title: '新增worklog',
      type: 'view',
      name: 'WorklogAdd',
      route: '/news/worklog',
      filePath: 'view/news/worklog.vue',
      inNav: true,
      icon: 'iconfont icon-jia',
      permission: null,
      order: 4,
    },

  ],
}

export default NewsRouter
