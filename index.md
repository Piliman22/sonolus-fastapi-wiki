---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "sonolus-fastapi"
  text: "SonolusサーバーをFastAPIで"
  tagline: "handler ベースで拡張できるSonolusサーバーフレームワーク"

  actions:
    - theme: brand
      text: クイックスタート
      link: /QuickStart/
    - theme: alt
      text: 仕様・設計を見る
      link: /Specifications/
---

## What's New

- `Sonolus` が `FastAPI` 直利用だけでなく `APIRouter` 統合にも対応
- router 統合時は `port` 設定なしで既存アプリへ組み込み可能
- `BaseItem.source` は保存せず、レスポンス返却時に `address`/リクエストURLで動的上書き

詳しくは [Quick Start](/QuickStart/) と [仕様書](/Specifications/) を参照してください。