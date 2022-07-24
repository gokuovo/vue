const ProjectRouter = {
  route: null,
  name: null,
  title: 'project',
  type: 'folder',
  icon: 'iconfont icon-zidingyi',
  filePath: 'view/homepage/',
  order: null,
  inNav: true,
  children: [
    {
      title: 'music',
      type: 'view',
      name: 'LogoUpload',
      route: '/custom/upload-image',
      filePath: 'plugin/custom/view/upload-image.vue',
      inNav: true,
      icon: 'iconfont icon-upload',
      permission: null,
    },
    {
      title: 'video',
      type: 'view',
      name: 'background',
      route: '/custom/tinymce',
      filePath: 'plugin/custom/view/tinymce.vue',
      inNav: true,
      icon: 'iconfont icon-upload',
      permission: null,
    },
    {
      title: 'list',
      type: 'view',
      name: 'background',
      route: '/custom/tinymce',
      filePath: 'plugin/custom/view/tinymce.vue',
      inNav: true,
      icon: 'iconfont icon-upload',
      permission: null,
    },
  ],
}

export default ProjectRouter
