# GitHub Repository Search

Search GitHub repositories with React + TypeScript.


## 日本語

### 起動

```bash
npm install
npm run dev
```

### 技術スタック

- Vite, React 19, TypeScript
- TanStack Query（`useSuspenseQuery`）
- React Router（検索ワードとページをURLで管理）
- react-error-boundary
- CSS Modules（UIライブラリ不使用）

### 機能

- 検索とページネーション
- ローディング中のスケルトン表示
- カードクリックで詳細をダイアログ表示
- レート制限時のエラー表示と再試行
- レスポンシブ、ダークモード対応

### メモ

- Search API は最大1,000件までしか取得できないため、ページ数もそこで制限しています。
- 認証なしの検索は1分10回まで。トークンはフロントエンドに露出してしまうため使っていません。
- TanStack Query でキャッシュし、リクエスト数を抑えています。

## English

### Run

```bash
npm install
npm run dev
```

### Stack

- Vite, React 19, TypeScript
- TanStack Query (`useSuspenseQuery`)
- React Router (query and page are kept in the URL)
- react-error-boundary
- CSS Modules (no UI library)

### Features

- Search with pagination
- Skeleton while loading
- Click a card to see details in a dialog
- Rate limit error message with retry
- Responsive, dark mode

### Notes

- The Search API returns max 1,000 results, so pages are capped at that.
- Unauthenticated search is limited to 10 requests/min. I didn't use a token because it would be exposed in the frontend.
- Results are cached with TanStack Query to save requests.



