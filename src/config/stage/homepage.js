const HomepageRouter = {
  route: null,
  name: null,
  title: '首页管理',
  type: 'folder',
  icon: 'iconfont icon-zidingyi',
  filePath: 'view/homepage/',
  order: null,
  inNav: true,
  children: [
    {
      title: 'logo上传',
      type: 'view',
      name: 'LogoUpload',
      route: '/homepage/logo',
      filePath: 'view/homepage/logo/upload-image',
      inNav: true,
      icon: 'iconfont icon-upload',
      permission: null,
    },
    {
      title: '首页背景图',
      type: 'view',
      name: 'background',
      route: '/homepage/background',
      filePath: 'view/homepage/background/background-list.vue',
      inNav: true,
      icon: 'iconfont icon-upload',
      permission: null,
    },
  ],
}

export default HomepageRouter
