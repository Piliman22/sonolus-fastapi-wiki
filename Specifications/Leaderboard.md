# Leaderboard API

Leaderboard APIは、アイテムに対するリーダーボード機能を提供します。

## detail

リーダーボード詳細を提供します

path: `GET` `/sonolus/{item_type}/{item_name}/leaderboards/{leaderboard_name}`

### Registration

```py
from sonolus_fastapi import Sonolus
from sonolus_models import ServerItemLeaderboardInfo

@sonolus.level.leaderboard.detail(ServerItemLeaderboardInfo)
async def level_leaderboard_detail(ctx, item_name: str, leaderboard_name: str):
    return ServerItemLeaderboardInfo(
        actions=[]
    )
```

## records

リーダーボードレコード一覧を提供します

path: `GET` `/sonolus/{item_type}/{item_name}/leaderboards/{leaderboard_name}/records/list`

### Registration

```py
from sonolus_fastapi import Sonolus
from sonolus_models import ServerItemLeaderboardRecordList

@sonolus.level.leaderboard.records(ServerItemLeaderboardRecordList)
async def level_leaderboard_records(ctx, item_name: str, leaderboard_name: str, query):
    # レコードストアから取得
    store = sonolus.items.level_leaderboards.for_item(item_name, leaderboard_name)
    records = store.list(limit=query.page_size, offset=(query.page - 1) * query.page_size)
    
    return ServerItemLeaderboardRecordList(
        pageCount=1,
        items=records
    )
```

## record_detail

特定レコードの詳細（リプレイ一覧）を提供します

path: `GET` `/sonolus/{item_type}/{item_name}/leaderboards/{leaderboard_name}/records/{record_name}`

### Registration

```py
from sonolus_fastapi import Sonolus
from sonolus_models import ServerItemLeaderboardRecordDetails

@sonolus.level.leaderboard.record_detail(ServerItemLeaderboardRecordDetails)
async def level_leaderboard_record_detail(ctx, item_name: str, leaderboard_name: str, record_name: str):
    # レコードからリプレイを取得
    return ServerItemLeaderboardRecordDetails(
        replays=[
            # リプレイアイテムのリスト
        ]
    )
```

## Storage

リーダーボードレコードは自動的にストレージに保存されます。詳細は[Storage](./Storage.md)を参照してください。

```py
# レコードストアへのアクセス
store = sonolus.items.level_leaderboards.for_item("song1", "standard")

# レコードの追加
from sonolus_models import ServerItemLeaderboardRecord
record = ServerItemLeaderboardRecord(
    name="record1",
    rank="1",
    player="Player1",
    playerUser=None,
    value="1000000"
)
store.add(record)

# レコードの取得
records = store.list(limit=10, offset=0)
record = store.get("record1")

# レコード数
count = store.count()
```

## Example

完全な例:

```py
from sonolus_fastapi import Sonolus
from sonolus_models import (
    ServerItemLeaderboardInfo,
    ServerItemLeaderboardRecordList,
    ServerItemLeaderboardRecordDetails,
    ServerItemLeaderboardRecord
)
import time

sonolus = Sonolus(
    address='https://example.com',
    port=8000,
    enable_cors=True,
    dev=True,
)

# レコードを追加
store = sonolus.items.level_leaderboards.for_item("example-level", "standard")
record = ServerItemLeaderboardRecord(
    name="record1",
    rank="1",
    player="TopPlayer",
    playerUser=None,
    value="999999"
)
store.add(record)

@sonolus.level.leaderboard.detail(ServerItemLeaderboardInfo)
async def level_leaderboard_detail(ctx, item_name: str, leaderboard_name: str):
    return ServerItemLeaderboardInfo(actions=[])

@sonolus.level.leaderboard.records(ServerItemLeaderboardRecordList)
async def level_leaderboard_records(ctx, item_name: str, leaderboard_name: str, query):
    store = sonolus.items.level_leaderboards.for_item(item_name, leaderboard_name)
    records = store.list(limit=20, offset=0)
    
    return ServerItemLeaderboardRecordList(
        pageCount=1,
        items=records
    )

@sonolus.level.leaderboard.record_detail(ServerItemLeaderboardRecordDetails)
async def level_leaderboard_record_detail(ctx, item_name: str, leaderboard_name: str, record_name: str):
    return ServerItemLeaderboardRecordDetails(replays=[])
```
