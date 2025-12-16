# Handler

Handler は、 API の振る舞いを定義する関数です。

sonolus-fastapi において、すべての API は handler として実装されます。

## Rules

- Handler は async function である
- HTTP / FastAPI の詳細を知らない
- JSON を直接返さない
- Response Model を必ず指定する
- None を返してはいけない