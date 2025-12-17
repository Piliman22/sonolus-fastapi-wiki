# SPA

ウェブページのSPA配信をすることが可能です。

```py
from sonolus_fastapi import Sonolus, SonolusSpa

sonolus = Sonolus(
    address='https://example.com', # サーバーアドレスを指定してください Specify your server address
    port=8000, # サーバーポートを指定してください Specify your server port
    enable_cors=True, # CORSを有効にするかどうか Whether to enable CORS
    dev=True, # 開発モード Development mode
)

spa = SonolusSpa(
    sonolus.app,
    path="./static", # SPAの静的ファイルのパス Path to SPA static files
    mount="/" # マウントパス Mount path
)

if __name__ == "__main__":
    spa.mount_spa() # SPAをマウントします Mount the SPA
    sonolus.run() # サーバーを起動します Start the server
```

