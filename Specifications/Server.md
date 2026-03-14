# Server Handlers

Server handler は、サーバー全体に関わる API を定義します。

> パスは基本形 `/sonolus/...` で記載しています。
> `APIRouter(prefix="/api")` で統合した場合は `/api/sonolus/...` になります。

## server_info

サーバーの基本情報を返します。

### Path
`GET /sonolus/info`

### Registration
```py
from sonolus_fastapi import Sonolus
from sonolus_models import (
    SonolusServerInfo,
    SonolusConfiguration,
    ServerInfoAuthenticationButton,
    ServerInfoItemButton,
    ServerInfoConfigurationButton,
)

sonolus = Sonolus(
    address='https://example.com',
    port=8000,
    enable_cors=True,
    dev=True,
)

@sonolus.server.server_info(SonolusServerInfo) # サーバー情報ハンドラーを登録 Register server info handler
async def get_server_info(ctx):
    return SonolusServerInfo(
        title="Example Sonolus Server",
        description="This is an example Sonolus server.",
        buttons=[
            ServerInfoAuthenticationButton(type='authentication'),
            ServerInfoItemButton(type='post'),
            ServerInfoItemButton(type='level'),
            ServerInfoItemButton(type='skin'),
            ServerInfoItemButton(type='background'),
            ServerInfoItemButton(type='effect'),
            ServerInfoItemButton(type='particle'),
            ServerInfoItemButton(type='engine'),
            ServerInfoConfigurationButton(type='configuration'),
        ],
        configuration=SonolusConfiguration(
            options=[]
        ),
        banner=None,
    )
```

### Rules

サーバーに 1 つだけ存在します

未登録の場合は 404 を返します



## authenticate

サーバー内認証要求の処理

### Path

`POST /sonolus/authenticate`

### Registration
```py
from sonolus_fastapi import Sonolus
from sonolus_models import ServerAuthenticateResponse
from sonolus_fastapi.utils.generate import generate_random_string
import time

sonolus = Sonolus(
    address='https://example.com',
    port=8000,
    enable_cors=True,
    dev=True,
)

@sonolus.server.authenticate(ServerAuthenticateResponse) # 認証ハンドラーを登録 Register authenticate handler
async def authenticate(ctx): # 認証処理 Authentication process
    session = generate_random_string(16) # セッションIDを生成 Generate session ID
    expiration = int(time.time() * 1000) + 3600 * 1000 # 有効期限を1時間後に設定 Set expiration to 1 hour later
    
    return ServerAuthenticateResponse( # 認証レスポンスを返す Return authentication response
        session=session, # セッションID Session ID
        expiration=expiration, # 有効期限 Expiration
    )
```

### Rules

認証要求が行われた場合に呼び出されます

未登録の場合、404 Not Found を返します

ログインに成功したら、ログアウトまたは期限切れになるまでそのサーバー内の全ルートのヘッダに`Sonolus-Session: session`とつきます。