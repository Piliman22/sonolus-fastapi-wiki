# Result API

Result APIは、レベルのリザルト画面からのリプレイ投稿機能を提供します。

**注意:** Result APIは`levels`専用です。他のitem_typeでは404エラーが返されます。

## result_info

リザルト投稿情報を提供します

path: `GET` `/sonolus/levels/result/info`

### Registration

```py
from sonolus_fastapi import Sonolus
from sonolus_models import ServerLevelResultInfo, ServerForm

sonolus = Sonolus(
    address='https://example.com',
    port=8000,
    enable_cors=True,
    dev=True,
)

@sonolus.level.result_info(ServerLevelResultInfo)
async def level_result_info(ctx):
    return ServerLevelResultInfo(
        submits=[
            ServerForm(
                type="replayUpload",
                title="リプレイを投稿",
                options=[]
            )
        ]
    )
```

## result_submit

リザルトからのリプレイ投稿を処理します

path: `POST` `/sonolus/levels/result/submit`

### Registration

```py
from sonolus_fastapi import Sonolus
from sonolus_models import ServerSubmitLevelResultRequest, ServerSubmitLevelResultResponse

@sonolus.level.result_submit(ServerSubmitLevelResultResponse)
async def level_result_submit(ctx, submit_request: ServerSubmitLevelResultRequest):
    # submit_request.replay: リプレイアイテム
    # submit_request.values: フォームの値
    
    # リプレイを処理
    replay = submit_request.replay
    
    # ファイルアップロードが必要な場合
    return ServerSubmitLevelResultResponse(
        key="upload-key-456",
        hashes=[
            # アップロードが必要なファイルのハッシュ
        ]
    )
```

## result_upload

リザルト投稿時のファイルアップロードを処理します

path: `POST` `/sonolus/levels/result/upload`

### Registration

```py
from sonolus_fastapi import Sonolus
from sonolus_models import ServerUploadLevelResultResponse

@sonolus.level.result_upload(ServerUploadLevelResultResponse)
async def level_result_upload(ctx, upload_key: str, files: list):
    # upload_key: result_submit時に返したkey
    # files: アップロードされたファイルのリスト
    
    for file in files:
        filename = file.filename
        content = await file.read()
        # ファイルを保存
    
    return ServerUploadLevelResultResponse()
```

## Example

完全な例:

```py
from sonolus_fastapi import Sonolus
from sonolus_models import (
    ServerLevelResultInfo,
    ServerSubmitLevelResultRequest,
    ServerSubmitLevelResultResponse,
    ServerUploadLevelResultResponse,
    ServerForm,
    ReplayItem
)
import time

sonolus = Sonolus(
    address='https://example.com',
    port=8000,
    enable_cors=True,
    dev=True,
)

@sonolus.level.result_info(ServerLevelResultInfo)
async def level_result_info(ctx):
    return ServerLevelResultInfo(
        submits=[
            ServerForm(
                type="replayUpload",
                title="Submit Replay",
                options=[]
            )
        ]
    )

@sonolus.level.result_submit(ServerSubmitLevelResultResponse)
async def level_result_submit(ctx, submit_request: ServerSubmitLevelResultRequest):
    # リプレイをストアに保存
    replay = submit_request.replay
    sonolus.items.replay.add(replay)
    
    # ファイルアップロードは不要
    return ServerSubmitLevelResultResponse(
        key="",
        hashes=[]
    )

@sonolus.level.result_upload(ServerUploadLevelResultResponse)
async def level_result_upload(ctx, upload_key: str, files: list):
    # ファイル処理（必要な場合のみ）
    return ServerUploadLevelResultResponse()

if __name__ == "__main__":
    sonolus.run()
```

## Level Only

Result APIは`levels`のみで動作します:

```py
# ✅ 動作する
@sonolus.level.result_info(ServerLevelResultInfo)

# ❌ 定義はできるが実行時に404エラー
@sonolus.skin.result_info(ServerLevelResultInfo)
```

`GET /sonolus/skins/result/info`にアクセスすると:
```json
{
    "detail": "result info is only available for levels"
}
```
