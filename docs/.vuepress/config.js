module.exports = {
  base: '//interview-highlights/',
  dest: 'dist',
  title: '前端面试',
  description: 'front-end interview',
  head: [
      ['link', { rel: 'icon', href: `/logo.png` }],
      ['link', {rel: 'manifest', href: '/manifest.json'}],
      ['meta', {name: 'theme-color', content: '#3eaf7c'}],
      ['meta', {name: 'apple-mobile-web-app-capable', content: 'yes'}],
      ['meta', {name: 'apple-mobile-web-app-status-bar-style', content: 'black'}],
      ['link', { rel: 'apple-touch-icon', href: `/icons/apple-touch-icon-152x152.png` }],
      ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#3eaf7c' }],
      ['meta', { name: 'msapplication-TileImage', content: '/icons/msapplication-icon-144x144.png' }],
      ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
  ],
  serviceWorker: false,
  themeConfig: {
      repo: 'berlinen/interview-highlights',
      editLinks: true,
      docsDir: 'docs',
      editLinkText: '在 GitHub 上编辑此页',
      lastUpdated: '上次更新',
      nav: [
          {
              text: '个人主页',
              link: 'https://github.com/berlinen/'
          }
      ],
      sidebar: [
        {
          title: '开始',
          collapsable: false,
          children: [
              ['prepare/', 'Introduction']
          ]
       },
       {
        title: '关于html',
        collapsable: false,
        children: [
                ['html/', 'html']
            ]
        },
        {
            title: 'css相关',
            collapsable: false,
            children: [
                   'css/',
                   'css/selector',
                   'css/unit'
                ]
        },
        {
        title: '其他',
        collapsable: false,
        children: [
                ['others/', '其他']
            ]
        }
    ]
  }
}
