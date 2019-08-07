module.exports = {
  title: '前端面试总结',
  base: '/interview-highlights/',
  theme: 'api',
  dest: 'dist',
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
  locales: {
    '/': {
      lang: 'en-US',
      title: 'Hello, World.',
      text: 'english',
      description: '📦 🎨 A api-friendly theme for VuePress.',
    },
    '/zh/': {
      lang: 'zh-hans',
      title: 'Hello, World.',
      text: '中文',
      description: '📦 🎨 一个面向 RESTful API 设计的开箱即用主题。',
    },
  },
  themeConfig: {
    locales: {
      '/': {
        selectText: 'Languages',
        label: 'English',
      },
      '/zh/': {
        selectText: '选择语言',
        label: '简体中文',
      },
    },
    // 假定是 GitHub. 同时也可以是一个完整的 GitLab URL
    repo: 'https://github.com/berlinen/interview-highlights',
    // 自定义仓库链接文字。默认从 `themeConfig.repo` 中自动推断为
    // "GitHub"/"GitLab"/"Bitbucket" 其中之一，或是 "Source"。
    // 假如文档不是放在仓库的根目录下：
    docsDir: 'docs',
      // 假如文档放在一个特定的分支下：
    docsBranch: 'master',

    repoLabel: '查看源码',
    // 默认是 false, 设置为 true 来启用
    editLinks: true,
    // 默认为 "Edit this page"
    editLinkText: '帮助我改善此页面！',
    // editLinkText: 'Help us improve this page',
    lastUpdated: 'Last Updated', // string | boolean

    sidebarGroupOrder: [
      'getting-started',
      'configurations'
    ],
  },
  serviceWorker: false

}
