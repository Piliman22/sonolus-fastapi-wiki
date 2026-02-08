# Item Handler

Item handler は、ItemType ごとの API を定義します。

## info

アイテムのinfoを提供します。

path: `GET` `/sonolus/{item_type}/info`

### Registration

```py
from sonolus_fastapi import Sonolus
from sonolus_fastapi.model.ServerItemInfo import ServerItemInfo

sonolus = Sonolus(
    address='https://example.com',
    port=8000,
    enable_cors=True,
    dev=True,
)

@sonolus.level.info(ServerItemInfo) # 例でlevelとしたが、level以外も可
```

## list

アイテムのlistを提供します

path: `GET` `/sonolus/{item_type}/list`

### Registration

```py
from sonolus_fastapi import Sonolus
from sonolus_fastapi.model.ServerItemList import ServerItemList

sonolus = Sonolus(
    address='https://example.com',
    port=8000,
    enable_cors=True,
    dev=True,
)

@sonolus.level.list(ServerItemList) # 例でlevelとしたが、level以外も可
```

## detail

アイテムの詳細情報を提供します

path: `GET` `/sonolus/{item_type}/{item_name}`

### Registration

```py
from sonolus_fastapi import Sonolus
from sonolus_fastapi.model.ServerItemDetails import ServerItemDetails

sonolus = Sonolus(
    address='https://example.com',
    port=8000,
    enable_cors=True,
    dev=True,
)

@sonolus.level.detail(ServerItemDetails) # 例でlevelとしたが、level以外も可
async def level_detail(ctx, name: str):
    # nameでアイテムを取得
    level = sonolus.items.level.get(name)
    return ServerItemDetails(
        item=level,
        description="Level description",
        actions=None,
        hasCommunity=False,
        leaderboards=[],
        sections=[]
    )
```

## actions

アイテムのアクション（submit）を処理します

path: `POST` `/sonolus/{item_type}/{item_name}/submit`

### Registration

```py
from sonolus_fastapi import Sonolus
from sonolus_models import ServerSubmitItemActionResponse

sonolus = Sonolus(
    address='https://example.com',
    port=8000,
    enable_cors=True,
    dev=True,
)

@sonolus.level.actions(ServerSubmitItemActionResponse)
async def level_actions(ctx, name: str, action_request):
    # action_requestにはフォームの値が入っている
    # アクションに応じた処理を実行
    return ServerSubmitItemActionResponse(
        shouldUpdateItem=True,
        shouldRemoveItem=False,
        key="upload-key-123",  # ファイルアップロードが必要な場合
        hashes=[]  # アップロードが必要なファイルのハッシュ
    )
```

## upload

アイテムのファイルアップロードを処理します

path: `POST` `/sonolus/{item_type}/{item_name}/upload`

### Registration

```py
from sonolus_fastapi import Sonolus
from sonolus_models import ServerUploadItemActionResponse

sonolus = Sonolus(
    address='https://example.com',
    port=8000,
    enable_cors=True,
    dev=True,
)

@sonolus.level.upload(ServerUploadItemActionResponse)
async def level_upload(ctx, name: str, upload_key: str, files: list):
    # upload_key: actions時に返したkey
    # files: アップロードされたファイルのリスト
    for file in files:
        filename = file.filename
        content = await file.read()
        # ファイルを保存
    
    return ServerUploadItemActionResponse(
        shouldUpdateItem=True
    )
```