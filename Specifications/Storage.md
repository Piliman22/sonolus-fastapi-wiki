# Storage

Sonolusのアイテム情報などを保存する機能です。
切り替えるだけで、保存先を変更することが可能です。

`memory`,`json`,`database`の三つが使えます。

- memory: 開発用(デフォルト)
- json: 小規模・デモ向け
- database: 本番・拡張向け

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