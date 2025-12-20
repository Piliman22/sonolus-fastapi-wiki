# Pack

Packは、sonolus.loadを使用し[sonolus-pack](https://github.com/Sonolus/sonolus-pack)で生成されたpackを読み込み、配信する機能です。

## Usage

```py
from sonolus_fastapi import Sonolus
from sonolus_fastapi.pack import freepackpath

sonolus = Sonolus(
    address='https://example.com', # サーバーアドレスを指定してください Specify your server address
    port=8000, # サーバーポートを指定してください Specify your server port
    enable_cors=True, # CORSを有効にするかどうか Whether to enable CORS
    dev=True, # 開発モード Development mode
    session_store=MemorySessionStore(), # セッションストアを指定 Specify session store
    backend=StorageBackend.MEMORY # ストレージバックエンドを指定 Specify storage backend
)

# Sonolusパックを読み込む Load Sonolus pack
sonolus.load(freepackpath) # Sonolus packのパスを指定してください Specify the path to the Sonolus pack
```

このフレームワークは、[sonolus-freepack](https://github.com/Sonolus/sonolus-free-pack)を内蔵しています。

## Custom

オリジナルのパックを読み込みたい場合はこのようにしてください

```
pack/
├── repository/
├── __init__.py
└── db.json
```

__init__.pyはこのように書いてください

```py
# __init__.py

import os

custompackpath = os.path.dirname(os.path.abspath(__file__))
```

そして、このようにするとロードができます。

```py
from sonolus_fastapi import Sonolus
from pack import custompackpath

sonolus = Sonolus(
    address='https://example.com', # サーバーアドレスを指定してください Specify your server address
    port=8000, # サーバーポートを指定してください Specify your server port
    enable_cors=True, # CORSを有効にするかどうか Whether to enable CORS
    dev=True, # 開発モード Development mode
)

# Sonolusパックを読み込む Load Sonolus pack
sonolus.load(custompackpath) # Sonolus packのパスを指定してください Specify the path to the Sonolus pack
```

そして、複数のpackを同時に読み込むことも可能です。