const TeamRouter = {
  route: null,
  name: null,
  title: 'team',
  type: 'folder',
  icon: 'iconfont icon-zidingyi',
  filePath: 'view/team/',
  order: null,
  inNav: true,
  children: [
    {
      title: '员工列表',
      type: 'view',
      name: 'StaffList',
      route: '/team/stafflist',
      filePath: 'view/team/staff-list.vue',
      inNav: true,
      icon: 'iconfont icon-jiemiansheji',
      permission: null,
    },
    {
      title: '新增员工',
      type: 'view',
      name: 'StaffAdd',
      route: '/team/staff',
      filePath: 'view/team/staff.vue',
      inNav: true,
      icon: 'iconfont icon-jia',
      permission: null,
    },
  ],
}

export default TeamRouter
