# Password Generator — エージェント向け指示

Next.js 14（Pages Router）、MUI v5、Jotai、IndexedDB を使ったセキュアなパスワード生成 PWA。

サイト: https://password.tepbyte.dev/

## コマンド

```sh
pnpm dev        # 開発サーバー起動
pnpm build      # 本番ビルド
pnpm export     # 静的エクスポート
pnpm test       # Jest テスト実行
pnpm lint       # next lint による ESLint
```

## アーキテクチャ

```
src/
  core/         # 純粋なロジック & 状態管理（hooks 以外 React 依存なし）
  components/   # UI コンポーネント（MUI ベース）
  pages/        # Next.js ページ（Pages Router）
```

### コアレイヤー (`src/core/`)

| ファイル | 役割 |
|---|---|
| `constant.ts` | 文字セット（`digits`, `lowers`, `uppers`, `symbols`）と `CharType` enum |
| `settings.ts` | `Settings` 型、デフォルト値、`getSetting`/`setSetting`（非同期・IDB 経由） |
| `settings_store.ts` | `getSetting`/`setSetting` をラップした Jotai atoms。マウント時に IDB からハイドレート |
| `use_settings.ts` | `useSettings()` フック — 全設定 atom を一括で読み取る |
| `generate_password.ts` | `generatePassword(options)` — 純粋関数、`getRandom` を使用 |
| `get_random.ts` | `getRandom(max)` — `crypto.getRandomValues` による暗号論的に安全な乱数 |
| `idb.ts` | IndexedDB セットアップ（`PasswordGenerator` DB, v2）。バージョンアップ時はここで対応 |
| `theme.ts` | Material 3 カラートークンで拡張した MUI テーマ |

### 重要な規約

- **ファイル命名**: `src/core/` と `src/components/settings/` 以下は `snake_case`。
- **状態管理**: Jotai atoms は `settings_store.ts` に定義。各設定キーは `settingAtom` ファクトリで 1 atom に対応。設定の読み書きに atoms を迂回しない。
- **乱数**: 必ず `get_random.ts` の `getRandom` を使用 — `Math.random()` は使わない。
- **設定の永続化**: 設定は IndexedDB に保存。新しい設定キーを追加する場合は、`settings.ts` の `Settings` 型への追加 → `DefaultSettings` へのデフォルト値追加 → `settings_store.ts` への atom 追加が必要。マイグレーションが必要なら `idb.ts` の `DB_VERSION` をインクリメントし `upgrade` にブランチを追加。
- **IDB アクセス**: `getAppDatabase()` はブラウザ以外（SSR）でスローする。必要に応じて `typeof window !== "undefined"` でガードする。
- **CharType**: 値と型の両方として使う `const` オブジェクト — 生文字列でなく `CharType.Digit` 等を使う。

## テスト

テストはソースファイルと同じ場所に配置（例: `generate_password.test.ts`）。`pnpm test` で実行。Jest は `jest.config.js` で `next/jest` を使用して設定済み。

## PWA

アプリは PWA（`next-pwa`）。マニフェストとアイコンは `public/` 以下。`public/manifest.json` を変更する場合は `public/icons/` も合わせて更新すること。
