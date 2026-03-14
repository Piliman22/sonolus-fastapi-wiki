# Quick Start

このページでは、**最小限のSonolusサーバー**を2通りで立ち上げます。

- FastAPI直利用（従来）
- APIRouter組み込み（新仕様）

## インストール

```bash
pip install sonolus-fastapi
```

## 1) FastAPI直利用（従来）

```py
import time
from fastapi import HTTPException

from sonolus_fastapi import Sonolus
from sonolus_fastapi.backend import StorageBackend
from sonolus_fastapi.utils.context import SonolusContext
from sonolus_fastapi.utils.session import MemorySessionStore
from sonolus_models import (
    PostItem,
    ServerItemDetails,
    ServerInfoAuthenticationButton,
    ServerInfoItemButton,
    SonolusServerInfo,
)

sonolus = Sonolus(
    address="https://example.com",   # 返却される source の基準URL
    port=8000,
    dev=True,
    enable_cors=True,
    session_store=MemorySessionStore(),
    backend=StorageBackend.MEMORY,
)

now = int(time.time() * 1000)
sonolus.items.post.add(
    PostItem(
        name="example_post",
        title="Example Post",
        version=1,
        author="Author Name",
        tags=[],
        description="This is an example post item.",
        time=now,
        thumbnail=None,
    )
)

@sonolus.server.server_info(SonolusServerInfo)
async def get_server_info(ctx: SonolusContext):
    return SonolusServerInfo(
        title="Example Sonolus Server",
        description="QuickStart server",
        buttons=[
            ServerInfoAuthenticationButton(type="authentication"),
            ServerInfoItemButton(type="post"),
        ],
        configuration=None,
        banner=None,
    )

@sonolus.post.detail(ServerItemDetails)
async def get_post_detail(ctx: SonolusContext, name: str):
    post = sonolus.items.post.get(name)
    if post is None:
        raise HTTPException(404, "Post item not found")
    return ServerItemDetails(
        item=post,
        description="Example post detail",
        actions=[],
        hasCommunity=False,
        leaderboards=[],
        sections=[],
    )

if __name__ == "__main__":
    sonolus.run()
```

## 2) APIRouter組み込み（新仕様）

```py
from fastapi import APIRouter, FastAPI
from sonolus_fastapi import Sonolus

app = FastAPI()
api_router = APIRouter(prefix="/api")

sonolus = Sonolus(
    router=api_router,
    dev=True,
)

app.include_router(api_router)
```

ポイント:

- `router=...` を渡すと、Sonolusルートを既存アプリに統合できます
- このモードでは `port` や `address` は必須ではありません
- ルートは `"/api/sonolus/..."` に生えます

## source フィールドの挙動

`BaseItem.source` は以下の仕様です。

- ストレージ（memory/json/database）には保存しません
- レスポンス生成時に動的に上書きします
- 上書き値は `Sonolus.address`（未設定時は現在のリクエストURL）

## 動作確認

standalone モード:

```text
http://localhost:8000/sonolus/info
http://localhost:8000/sonolus/posts/example_post
```

router モード（prefix=/api の場合）:

```text
http://localhost:8000/api/sonolus/info
```

## 次に読む

- [仕様書トップ](/Specifications/)
- [Handlerの基本ルール](/Specifications/Handlers)
- [総合サンプル (Examples)](/Specifications/Examples)
- [ストレージ仕様](/Specifications/Storage)