---
outline: deep
---

# 仕様書

sonolus-fastapiが提供する、Sonolus APIの仕様と拡張点を定義します。

本仕様は以下を目的としています。

- Sonolus クライアントとの互換性を保つ
- handler ベースの拡張方法を明確にする
- 実装者が迷わずAPIを実装できるように。

## 重要な更新（新仕様）

- `Sonolus` は `FastAPI` 直利用に加えて `APIRouter` 統合にも対応
- `router` モードでは `port` 設定は不要
- `BaseItem.source` は保存せず、レスポンス返却時に `address`（またはリクエストURL）で動的上書き

各ページの path は基本形として `/sonolus/...` を記載しています。
`APIRouter(prefix="/api")` で統合した場合は `/api/sonolus/...` になります。

## 目次（推奨閲覧順）

### 1. 基本

- [Handlerの基本ルール](/Specifications/Handlers)
- [Server API](/Specifications/Server)
- [Item API](/Specifications/Items)

### 2. 機能拡張

- [Result API](/Specifications/Result)
- [Community API](/Specifications/Community)
- [Leaderboard API](/Specifications/Leaderboard)

### 3. 運用と周辺機能

- [Storage](/Specifications/Storage)
- [Pack](/Specifications/Packs)
- [SPA](/Specifications/SPA)
- [Examples](/Specifications/Examples)