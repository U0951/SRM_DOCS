module.exports = {
  title: '',
  description: 'srm前端文档',
  themeConfig: {
    sidebar: 'auto',
    logo: '/srm-logo.png',
    nav: [
      {
        text: 'utils',
        items: [
          {
            text: '页面',
            link: '/utils/pages/list/'
            // items: [
            //   { text: 'List', link: '/utils/pages/list/' }
            // ]
          },
          {
            text: '模块',
            link: '/utils/modules/table/'
          },
          {
            text: '功能',
            link: '/utils/functions/operation'
          },
          {
            text: '其他',
            link: '/utils/other/print'
          }
        ]
      },
      {
        text: '起步',
        items: [
          {
            text: '页面',
            link: '/start/pages/list/'
          }
        ]
      },
      {
        text: '常见用法',
        items: [
          {
            text: '常见按钮',
            link: '/usage/jurisdiction/jurisdiction'
          }
        ]
      },
      {
        text: 'WMS',
        items: [
          {
            text: '起步',
            link: '/wms/start/introduece'
          }
        ]
      },
      {
        text: '面试',
        items: [
          {
            text: '笔试',
            link: '/interview/written'
          },
          {
            text: '面试',
            link: '/interview/face'
          }
        ]
      }
    ],
    sidebar: {
      '/start/': [
        {
          title: '快速上手',
          collapsable: false,
          children: [
            {
              title: '页面',
              collapsable: false,
              children: [
                'speed/introduece',
                'speed/base',
                'speed/work'
              ]
            }
          ]
        },
        {
          title: '页面',
          collapsable: false,
          children: [
            {
              title: '页面',
              collapsable: false,
              children: [
                'pages/list',
                'pages/add',
                'pages/modify'
              ]
            }
          ]
        }
      ],
      '/utils/': [
        '',
        {
          title: 'utils',
          collapsable: false,
          children: [
            {
              title: '页面',
              collapsable: false,
              children: [
                'pages/list',
                'pages/form'
              ]
            },
            {
              title: '模块',
              collapsable: false,
              children: [
                'modules/table',
                'modules/multipleTable',
                'modules/search',
                'modules/tabs',
                'modules/detail',
                'modules/jurisdiction',
                'modules/pagination',
                'modules/tableSelect'
              ]
            },
            {
              title: '功能',
              collapsable: false,
              children: [
                'functions/operation',
                'functions/options',
                'functions/select',
                'functions/dialog'
              ]
            },
            {
              title: '其他',
              collapsable: false,
              children: [
                'other/print',
                'other/exportAndImport'
              ]
            }
          ]
        }
      ],
      '/usage/': [
        '',
        {
          title: '常见用法',
          collapsable: false,
          children: ['jurisdiction/jurisdiction']
        }
      ],
      '/wms/': [
        {
          title: 'WMS',
          collapsable: false,
          children: [
            {
              title: '起步',
              collapsable: false,
              children: [
                'start/introduece',
                'start/lib',
                'start/utils',
                'start/other'
              ]
            },
            {
              title: '页面',
              collapsable: false,
              children: [
                'pages/list',
                'pages/form',
                'pages/detail'
              ]
            }
          ]
        }
      ],
      '/interview/': [
        '',
        'written',
        'face'
      ]
    }
  }
}
