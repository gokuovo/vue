const PartnerRouter = {
  route: null,
  name: null,
  title: '合作商管理',
  type: 'folder',
  icon: 'iconfont icon-zidingyi',
  filePath: 'view/partners/',
  order: null,
  inNav: true,
  children: [
    {
      title: '友商列表',
      type: 'view',
      name: 'PartnersList',
      route: '/partners/list',
      filePath: 'view/partners/partners-list.vue',
      inNav: true,
      icon: 'iconfont icon-jiemiansheji',
      permission: null,
    },
    {
      title: '新增友商',
      type: 'view',
      name: 'PartnersAdd',
      route: '/partners/partners',
      filePath: 'view/partners/partners.vue',
      inNav: true,
      icon: 'iconfont icon-jia',
      permission: null,
    },
  ],
}

export default PartnerRouter
