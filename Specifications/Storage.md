# Storage

Sonolusのアイテム情報などを保存する機能です。
切り替えるだけで、保存先を変更することが可能です。

`memory`,`json`,`database`の三つが使えます。

- memory: 開発用(デフォルト)
- json: 小規模・デモ向け
- database: 本番・拡張向け

## Supported Data

以下のデータがストレージに保存されます:

- **Items**: Level, Skin, Background, Effect, Particle, Engine, Post, User
- **Community Comments**: アイテムごとのコメント
- **Leaderboard Records**: リーダーボードのレコード

## Memory

```py
import time
from sonolus_fastapi import Sonolus
from sonolus_fastapi.model.items import PostItem
from sonolus_fastapi.model.sections import PostSection

sonolus = Sonolus(
    address="https://example.com",
    port=8000,
    dev=False,
    enable_cors=True,
)

now = int(time.time() * 1000) # to milliseconds
new_post = PostItem(
    name="example-post-1",
    author="example-author",
    title="Example Post",
    tags=[],
    description="This is an example post item.",
    time=now,
    thumbnail=None
)
sonolus.items.post.add(new_post)
```

## JSON

```py
import time
from sonolus_fastapi import Sonolus
from sonolus_fastapi.model.items import PostItem
from sonolus_fastapi.model.sections import PostSection

sonolus = Sonolus(
    address="https://example.com",
    port=8000,
    dev=False,
    enable_cors=True,
    backend=StorageBackend.JSON,
    backend_options={"path": "./data"}   
)

now = int(time.time() * 1000) # to milliseconds
new_post = PostItem(
    name="example-post-1",
    author="example-author",
    title="Example Post",
    tags=[],
    description="This is an example post item.",
    time=now,
    thumbnail=None
)
sonolus.items.post.add(new_post)
```

## DataBase

```py
import time
from sonolus_fastapi import Sonolus
from sonolus_fastapi.model.items import PostItem
from sonolus_fastapi.model.sections import PostSection

sonolus = Sonolus(
    address="https://example.com",
    port=8000,
    dev=False,
    enable_cors=True,
    backend=StorageBackend.DATABASE, 
    backend_options={"url": "sqlite:////data/sonolus.db"}
)

now = int(time.time() * 1000) # to milliseconds
new_post = PostItem(
    name="example-post-1",
    author="example-author",
    title="Example Post",
    tags=[],
    description="This is an example post item.",
    time=now,
    thumbnail=None
)
sonolus.items.post.add(new_post)
```

## Community Comments Storage

コメントも同じバックエンドを使用します。

### Memory

```py
from sonolus_fastapi import Sonolus, StorageBackend
from sonolus_models import ServerItemCommunityComment
import time

sonolus = Sonolus(
    address="https://example.com",
    port=8000,
    backend=StorageBackend.MEMORY
)

# コメントストアにアクセス
store = sonolus.items.level_comments.for_item("example-level")

# コメントを追加
comment = ServerItemCommunityComment(
    name=f"comment-{int(time.time())}",
    author="User1",
    time=int(time.time() * 1000),
    content="Great level!",
    actions=[]
)
store.add(comment)

# コメント一覧を取得
comments = store.list(limit=10, offset=0)
```

### JSON

データ構造: `data/comments/{item_type}/{item_name}.json`

```py
from sonolus_fastapi import Sonolus, StorageBackend

sonolus = Sonolus(
    address="https://example.com",
    port=8000,
    backend=StorageBackend.JSON,
    path="./data"
)

# 同じAPI
store = sonolus.items.level_comments.for_item("example-level")
store.add(comment)
```

### Database

テーブル: `comments` (parent_type, parent_name, time でインデックス)

```py
from sonolus_fastapi import Sonolus, StorageBackend

sonolus = Sonolus(
    address="https://example.com",
    port=8000,
    backend=StorageBackend.DATABASE,
    url="sqlite:///./data/sonolus.db"
)

# 同じAPI
store = sonolus.items.level_comments.for_item("example-level")
store.add(comment)
```

## Leaderboard Records Storage

リーダーボードレコードも同様に保存されます。

### Memory

```py
from sonolus_fastapi import Sonolus, StorageBackend
from sonolus_models import ServerItemLeaderboardRecord

sonolus = Sonolus(
    address="https://example.com",
    port=8000,
    backend=StorageBackend.MEMORY
)

# レコードストアにアクセス
store = sonolus.items.level_leaderboards.for_item("example-level", "standard")

# レコードを追加
record = ServerItemLeaderboardRecord(
    name="record1",
    rank="1",
    player="TopPlayer",
    playerUser=None,
    value="999999"
)
store.add(record)

# レコード一覧を取得
records = store.list(limit=10, offset=0)
```

### JSON

データ構造: `data/leaderboards/{item_type}/{item_name}/{leaderboard_name}.json`

```py
from sonolus_fastapi import Sonolus, StorageBackend

sonolus = Sonolus(
    address="https://example.com",
    port=8000,
    backend=StorageBackend.JSON,
    path="./data"
)

# 同じAPI
store = sonolus.items.level_leaderboards.for_item("example-level", "standard")
store.add(record)
```

### Database

テーブル: `leaderboard_records` (parent_type, parent_name, leaderboard_name, rank でインデックス)

```py
from sonolus_fastapi import Sonolus, StorageBackend

sonolus = Sonolus(
    address="https://example.com",
    port=8000,
    backend=StorageBackend.DATABASE,
    url="sqlite:///./data/sonolus.db"
)

# 同じAPI
store = sonolus.items.level_leaderboards.for_item("example-level", "standard")
store.add(record)
```

## Store API

すべてのストアは共通のAPIを提供します:

```py
# 取得
item = store.get(name)

# 一覧（ページネーション対応）
items = store.list(limit=10, offset=0)

# 追加
store.add(item)

# 更新
store.update(item)

# 削除
store.delete(name)

# 件数
count = store.count()
```