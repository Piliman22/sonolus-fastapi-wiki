import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Sonolus Fast API",
  description: "Sonolus FastAPI Wiki Page",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: '仕様書', link: '/Specifications' }
    ],

    sidebar: [
      {
        text: '説明',
        items: [
          { text: 'クイックスタート', link: '/QuickStart' },
        ]
      },
      {
        text: '仕様書',
        items: [
          { text: '概要', link: '/Specifications' },
          { text: 'ハンドラ', link: '/Specifications/Handlers' },
          { text: 'サーバー', link: '/Specifications/Server' },
          { text: 'アイテム', link: '/Specifications/Items' },
          { text: 'パック', link: '/Specifications/Packs' },
          { text: 'SPA配信', link: '/Specifications/SPA' },
          { text: 'ストレージ', link: '/Specifications/Storage' },
          { text: '例', link: '/Specifications/Examples' },
        ]
      },
      {
        text: 'バージョン履歴',
        items: [
          { text: '0.2.3.1', link: '/Version/0-2-3-1' },
          { text: '0.2.3', link: '/Version/0-2-3' },
          { text: '0.2.2', link: '/Version/0-2-2' },
          { text: '0.2.1', link: '/Version/0-2-1' },
          { text: '0.2.0', link: '/Version/0-2-0' },
          { text: '0.1.1', link: '/Version/0-1-1' },
          { text: '0.1.0', link: '/Version/0-1-0' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Piliman22/sonolus-fastapi/' }
    ]
  }
})
