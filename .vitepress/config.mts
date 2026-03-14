import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Sonolus Fast API",
  description: "Sonolus FastAPI Wiki Page",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Quick Start', link: '/QuickStart/' },
      { text: '仕様書', link: '/Specifications/' },
      { text: 'Examples', link: '/Specifications/Examples' }
    ],

    sidebar: [
      {
        text: 'はじめに',
        items: [
          { text: 'ホーム', link: '/' },
          { text: 'クイックスタート', link: '/QuickStart/' },
          { text: 'Examples', link: '/Specifications/Examples' },
        ]
      },
      {
        text: '設計と基本',
        items: [
          { text: '仕様書トップ', link: '/Specifications/' },
          { text: 'ハンドラ', link: '/Specifications/Handlers' },
        ]
      },
      {
        text: 'Core API',
        items: [
          { text: 'サーバー', link: '/Specifications/Server' },
          { text: 'アイテム', link: '/Specifications/Items' },
          { text: 'リザルト', link: '/Specifications/Result' },
        ]
      },
      {
        text: 'Extended API',
        items: [
          { text: 'コミュニティ', link: '/Specifications/Community' },
          { text: 'リーダーボード', link: '/Specifications/Leaderboard' },
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
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Piliman22/sonolus-fastapi/' }
    ]
  }
})
