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
        ]
      },
      {
        text: 'Basic API',
        items: [
          { text: 'サーバー', link: '/Specifications/Server' },
          { text: 'アイテム', link: '/Specifications/Items' },
        ]
      },
      {
        text: 'Extended API',
        items: [
          { text: 'コミュニティ', link: '/Specifications/Community' },
          { text: 'リーダーボード', link: '/Specifications/Leaderboard' },
          { text: 'リザルト', link: '/Specifications/Result' },
        ]
      },
      {
        text: '機能',
        items: [
          { text: 'ストレージ', link: '/Specifications/Storage' },
          { text: 'パック', link: '/Specifications/Packs' },
          { text: 'SPA配信', link: '/Specifications/SPA' },
        ]
      },
      {
        text: 'リソース',
        items: [
          { text: '例', link: '/Specifications/Examples' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Untitled-Sekai/sonolus-fastapi' }
    ]
  }
})
