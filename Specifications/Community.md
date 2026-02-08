# Community API

Community APIは、アイテムに対するコメント機能を提供します。

## info

コミュニティ情報を提供します

path: `GET` `/sonolus/{item_type}/{item_name}/community/info`

### Registration

```py
from sonolus_fastapi import Sonolus
from sonolus_models import ServerItemCommunityInfo

@sonolus.level.community.info(ServerItemCommunityInfo)
async def level_community_info(ctx, item_name: str):
    return ServerItemCommunityInfo(
        actions=[
            # アクション定義
        ]
    )
```

## comments

コメント一覧を提供します

path: `GET` `/sonolus/{item_type}/{item_name}/community/comments/list`

### Registration

```py
from sonolus_fastapi import Sonolus
from sonolus_models import ServerItemCommunityCommentList

@sonolus.level.community.comments(ServerItemCommunityCommentList)
async def level_community_comments(ctx, item_name: str, query):
    # コメントストアから取得
    store = sonolus.items.level_comments.for_item(item_name)
    comments = store.list(limit=query.page_size, offset=(query.page - 1) * query.page_size)
    
    return ServerItemCommunityCommentList(
        pageCount=1,
        items=comments
    )
```

## actions

コミュニティアクション（コメント投稿など）を処理します

path: `POST` `/sonolus/{item_type}/{item_name}/community/submit`

### Registration

```py
from sonolus_fastapi import Sonolus
from sonolus_models import ServerSubmitItemCommunityActionResponse, ServerItemCommunityComment
import time

@sonolus.level.community.actions(ServerSubmitItemCommunityActionResponse)
async def level_community_actions(ctx, item_name: str, action_request):
    # コメントを追加
    store = sonolus.items.level_comments.for_item(item_name)
    
    comment = ServerItemCommunityComment(
        name=f"comment-{int(time.time())}",
        author="User",
        time=int(time.time() * 1000),
        content=action_request.get("content", ""),
        actions=[]
    )
    store.add(comment)
    
    return ServerSubmitItemCommunityActionResponse(
        key="",
        hashes=[]
    )
```

## upload

コミュニティファイルアップロードを処理します

path: `POST` `/sonolus/{item_type}/{item_name}/community/upload`

### Registration

```py
from sonolus_fastapi import Sonolus
from sonolus_models import ServerUploadItemCommunityActionResponse

@sonolus.level.community.upload(ServerUploadItemCommunityActionResponse)
async def level_community_upload(ctx, item_name: str, upload_key: str, files: list):
    # ファイルを処理
    for file in files:
        content = await file.read()
        # ファイル保存処理
    
    return ServerUploadItemCommunityActionResponse()
```

## comment_actions

特定コメントに対するアクション（返信など）を処理します

path: `POST` `/sonolus/{item_type}/{item_name}/community/comments/{comment_name}/submit`

### Registration

```py
from sonolus_fastapi import Sonolus
from sonolus_models import ServerSubmitItemCommunityCommentResponse

@sonolus.level.community.comment_actions(ServerSubmitItemCommunityCommentResponse)
async def level_comment_actions(ctx, item_name: str, comment_name: str, action_request):
    # コメントに対するアクション処理
    return ServerSubmitItemCommunityCommentResponse(
        key="",
        hashes=[]
    )
```

## comment_upload

特定コメントに対するファイルアップロードを処理します

path: `POST` `/sonolus/{item_type}/{item_name}/community/comments/{comment_name}/upload`

### Registration

```py
from sonolus_fastapi import Sonolus
from sonolus_models import ServerUploadItemCommunityCommentResponse

@sonolus.level.community.comment_upload(ServerUploadItemCommunityCommentResponse)
async def level_comment_upload(ctx, item_name: str, comment_name: str, upload_key: str, files: list):
    # ファイル処理
    return ServerUploadItemCommunityCommentResponse()
```

## Storage

コメントは自動的にストレージに保存されます。詳細は[Storage](./Storage.md)を参照してください。

```py
# コメントストアへのアクセス
store = sonolus.items.level_comments.for_item("song1")

# コメントの追加
comment = ServerItemCommunityComment(...)
store.add(comment)

# コメントの取得
comments = store.list(limit=10, offset=0)
comment = store.get("comment-123")

# コメント数
count = store.count()
```
