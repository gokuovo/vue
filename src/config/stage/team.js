const TeamRouter = {
  route: null,
  name: null,
  title: 'team',
  type: 'folder',
  icon: 'iconfont icon-zidingyi',
  filePath: 'view/homepage/',
  order: null,
  inNav: true,
  children: [
    {
      title: '员工管理',
      type: 'view',
      name: 'LogoUpload',
      route: '/custom/upload-image',
      filePath: 'plugin/custom/view/upload-image.vue',
      inNav: true,
      icon: 'iconfont icon-upload',
      permission: null,
    },
  ],
}

export default TeamRouter
