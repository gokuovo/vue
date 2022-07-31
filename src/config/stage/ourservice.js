const OurserviceRouter = {
  route: null,
  name: null,
  title: 'ourservice',
  type: 'folder',
  icon: 'iconfont icon-zidingyi',
  filePath: 'view/ourservice/',
  order: null,
  inNav: true,
  children: [
    {
      title: '文字段列表',
      type: 'view',
      name: 'SaltWord',
      route: '/view/ourservice/list',
      filePath: 'view/ourservice/word-list.vue',
      inNav: true,
      icon: 'iconfont icon-jiemiansheji',
      permission: null,
    },
    {
      title: '轮播图列表',
      type: 'view',
      name: 'Rotation',
      route: '/view/ourservice/rotation-list',
      filePath: 'view/ourservice/rotation-list.vue',
      inNav: true,
      icon: 'iconfont icon-jiemiansheji',
      permission: null,
    },
    {
      title: '视频列表',
      type: 'view',
      name: 'VideoList',
      route: '/view/ourservice/videolist',
      filePath: 'view/ourservice/video.vue',
      inNav: true,
      icon: 'iconfont icon-jiemiansheji',
      permission: null,
    },
  ],
}

export default OurserviceRouter
