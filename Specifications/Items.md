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
```