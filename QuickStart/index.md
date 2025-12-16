# Quick Start

このページでは**最小限のSonolusサーバー**を立ち上げます。

## インストール
```bash
pip install sonolus-fastapi
```

## 最小構成

```py
from sonolus_fastapi import Sonolus

sonolus = Sonolus(
    port=8000
    dev=True
)

if __name__ == "__main__":
    sonolus.run()
```

これだけで、FastAPIサーバーが起動します。
`dev=True`はローカル開発向けの設定です。

## ServerInfoを追加

```py
from sonolus_fastapi import Sonolus
from sonolus_fastapi.model.base import SonolusServerInfo, SonolusConfiguration, SonolusButton, SonolusButtonType

sonolus = Sonolus(
    port=8000
    dev=True
)

@sonolus.server.server_info(SonolusServerInfo) # サーバー情報ハンドラーを登録 Register server info handler
async def get_server_info(ctx):
    return SonolusServerInfo(
        title="Example Sonolus Server",
        description="This is an example Sonolus server.",
        buttons=[
            SonolusButton(type=SonolusButtonType.AUTHENTICATION),
            SonolusButton(type=SonolusButtonType.POST),
            SonolusButton(type=SonolusButtonType.LEVEL),
            SonolusButton(type=SonolusButtonType.SKIN),
            SonolusButton(type=SonolusButtonType.BACKGROUND),
            SonolusButton(type=SonolusButtonType.EFFECT),
            SonolusButton(type=SonolusButtonType.PARTICLE),
            SonolusButton(type=SonolusButtonType.ENGINE),
            SonolusButton(type=SonolusButtonType.CONFIGURATION)
        ],
        configuration=SonolusConfiguration(
            options=[]
        ),
        banner=None,
    )

if __name__ == "__main__":
    sonolus.run()
```

このようにして追加することができます。

## アイテムを追加

```py
import time
from fastapi import HTTPException
from sonolus_fastapi import Sonolus
from sonolus_fastapi.model.items.post import PostItem
from sonolus_fastapi.model.ServerItemDetails import ServerItemDetails

now = int(time.time() * 1000)

post_item = PostItem(
    name="example_post",
    title="Example Post",
    version=1,
    author="Author Name",
    tags=[],
    description="This is an example post item.",
    time=now,
    thumbnail=None,
)
sonolus.ItemMemory.Post.push(post_item) # メモリにPostItemを追加 Add PostItem to memory

@sonolus.post.detail(ServerItemDetails) # Postの詳細ハンドラーを登録 Register Post detail handler
async def get_post_detail(ctx, name: str): # Postの詳細を取得 Get Post details
    post = sonolus.ItemMemory.Post.get_name(name) # メモリからPostItemを取得 Get PostItem from memory
    
    if post is None: # PostItemが見つからない場合 If PostItem not found
        raise HTTPException(404, "Post item not found") # 404エラーを返す Return 404 error
    
    return ServerItemDetails( # ServerItemDetailsを返す Return ServerItemDetails
        item=post, # PostItem
        description="This is the detail of the example post item.", # 詳細説明 Detail description
        actions=[], # アクションのリスト List of actions
        hasCommunity=False, # コミュニティがあるかどうか Whether there is a community
        leaderboards=[], # リーダーボードのリスト List of leaderboards
        sections=[], # セクションのリスト List of sections
    )

if __name__ == "__main__":
    sonolus.run()
```

## ブラウザでの確認

サーバーを起動し、以下にアクセスをしてみてください。

```
http://localhost:8000/sonolus/info
http://localhost:8000/sonolus/posts/example
```

JSONが返ってきたら成功です。

次は仕様書を見てみましょう。