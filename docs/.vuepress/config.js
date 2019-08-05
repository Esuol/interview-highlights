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

    // Assumes GitHub. Can also be a full GitLab url.
    repo: 'sqrthree/vuepress-theme-api',
    // Customising the header label
    // Defaults to "GitHub"/"GitLab"/"Bitbucket" depending on `themeConfig.repo`
    repoLabel: 'Contribute!',

    // Optional options for generating "Edit this page" link

    // if your docs are in a different repo from your main project:
    docsRepo: 'sqrthree/vuepress-theme-api',
    // if your docs are not at the root of the repo:
    docsDir: 'docs',
    // if your docs are in a specific branch (defaults to 'master'):
    docsBranch: 'master',
    // defaults to false, set to true to enable
    editLinks: true,
    // custom text for edit link. Defaults to "Edit this page"
    // editLinkText: 'Help us improve this page',
    lastUpdated: 'Last Updated', // string | boolean
    sidebarGroupOrder: [
      'getting-started',
      'configurations'
    ],
  },
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
        title: 'Html',
        collapsable: false,
        children: [
                ['html/', 'html']
            ]
        },
        {
            title: 'Css',
            collapsable: false,
            children: [
                   'css/',
                   'css/selector',
                   'css/unit',
                   'css/advanced'
                ]
        },
        {
            title: 'javaCript',
            collapsable: false,
            children: [
                'js/process-one',
                'js/process-two',
                'js/es678',
                'js/react',
                'js/react-two',
                'js/react-three',
                'js/react-four',
                'js/react-router',
                'js/react-international',
                'js/react-testing',
                'js/react-redux',
                'js/react-native',
                // 'js/react-supported',
                'js/vue'
                ]
        },
        {
        title: 'others',
        collapsable: false,
        children: [
                ['others/', '其他']
            ]
        }
    ]
  }
}
/**
 *
 */