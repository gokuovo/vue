const ProjectRouter = {
  route: null,
  name: null,
  title: 'project',
  type: 'folder',
  icon: 'iconfont icon-zidingyi',
  filePath: 'view/project/',
  order: null,
  inNav: true,
  children: [
    {
      title: '专辑列表',
      type: 'view',
      name: 'Album',
      route: '/project/albumlist',
      filePath: 'view/project/album-list.vue',
      inNav: true,
      icon: 'iconfont icon-jiemiansheji',
      permission: null,
    },

    {
      title: 'music列表',
      type: 'view',
      name: 'AlbumMusic',
      route: '/project/albummusic',
      filePath: 'view/project/album-music-list.vue',
      inNav: true,
      icon: 'iconfont icon-jiemiansheji',
      permission: null,
    },
    {
      title: 'video列表',
      type: 'view',
      name: 'AlbumVideo',
      route: '/project/albumvideo',
      filePath: 'view/project/album-video-list.vue',
      inNav: true,
      icon: 'iconfont icon-jiemiansheji',
      permission: null,
    },
    {
      title: 'list列表',
      type: 'view',
      name: 'AlbumList',
      route: '/project/list',
      filePath: 'view/project/list-list.vue',
      inNav: true,
      icon: 'iconfont icon-jiemiansheji',
      permission: null,
    },
    {
      title: '新增专辑',
      type: 'view',
      name: 'AlbumAdd',
      route: '/project/album',
      filePath: 'view/project/album.vue',
      inNav: true,
      icon: 'iconfont icon-upload',
      permission: null,
    },
    {
      title: '添加music',
      type: 'view',
      name: 'MusicAdd',
      route: '/project/music',
      filePath: 'view/project/album-music.vue',
      inNav: true,
      icon: 'iconfont icon-upload',
      permission: null,
    },
    {
      title: '添加video',
      type: 'view',
      name: 'VideoAdd',
      route: '/project/video',
      filePath: 'view/project/album-video.vue',
      inNav: true,
      icon: 'iconfont icon-upload',
      permission: null,
    },
    {
      title: '添加list',
      type: 'view',
      name: 'ListAdd',
      route: '/project/listadd',
      filePath: 'view/project/list.vue',
      inNav: true,
      icon: 'iconfont icon-upload',
      permission: null,
    },
    {
      title: '批量上传音乐',
      type: 'view',
      name: 'addMusics',
      route: '/project/addMusics',
      filePath: 'view/project/addMusics.vue',
      inNav: true,
      icon: 'iconfont icon-upload',
      permission: null,
    },
  ],
}

export default ProjectRouter
