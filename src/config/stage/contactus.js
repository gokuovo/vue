const ContactUsRouter = {
    route: null,
    name: null,
    title: 'contact us',
    type: 'folder',
    icon: 'iconfont icon-zidingyi',
    filePath: 'view/contactus/',
    order: null,
    inNav: true,
    children: [
      {
        title: '联系方式',
        type: 'view',
        name: 'ContactusList',
        route: '/contactus/contactlist',
        filePath: 'view/contactus/contactus-list.vue',
        inNav: true,
        icon: 'iconfont icon-jiemiansheji',
        permission: null,
      },
      {
        title: 'our social',
        type: 'view',
        name: 'OurSocial',
        route: '/contactus/sociallist',
        filePath: 'view/contactus/social-list.vue',
        inNav: true,
        icon: 'iconfont icon-jiemiansheji',
        permission: null,
      },
      {
        title: '新增social',
        type: 'view',
        name: 'SocialAdd',
        route: '/contactus/social',
        filePath: 'view/contactus/social.vue',
        inNav: true,
        icon: 'iconfont icon-jia',
        permission: null,
      },
    ],
}

export default ContactUsRouter
