# Bolt Shadcn Template

Bolt AI で利用するための Vite 6 + React 19 SPA テンプレートです。
shadcn/ui と独自のデザインシステムを組み合わせ、Bolt が構成を壊さずに開発できるよう設計されています。

---

## 技術スタック

| カテゴリ | ライブラリ |
|---|---|
| フレームワーク | Vite 6 + React 19 |
| 言語 | TypeScript |
| スタイリング | Tailwind CSS v3 |
| UI コンポーネント | shadcn/ui |
| ルーティング | react-router-dom v6 |
| アイコン | Lucide React |
| Linter/Formatter | Biome |

---

## 開発手順

```bash
npm install
npm run dev      # 開発サーバー起動（port 3000）
npm run build    # プロダクションビルド
npm run lint     # Biome でチェック
npm run lint:fix # Biome で自動修正
```

---

## ディレクトリ構成

```
src/
├── components/
│   ├── layout/     # レイアウトコンポーネント（Header, Sidebar 等）
│   ├── shared/     # 複数ページで使う汎用コンポーネント
│   └── ui/         # shadcn/ui コンポーネント（自動生成・編集禁止）
├── lib/
│   ├── utils.ts    # shadcn/ui 用 cn() ユーティリティ
│   └── constants.ts # 定数定義
├── pages/
│   ├── HomePage.tsx          # ページコンポーネント（ルートと1対1）
│   └── settings/
│       ├── SettingsPage.tsx
│       └── _components/      # そのページ専用のコンポーネント
│           └── SettingsForm.tsx
├── tokens/         # デザイントークン（ここを編集してテーマ変更）
│   ├── colors.ts   # カラー定義（hex 値）
│   ├── theme.ts    # CSS 変数マッピング + injectTheme()
│   ├── spacing.ts  # スペーシング定義
│   ├── typography.ts # タイポグラフィ定義
│   └── index.ts    # 一括エクスポート
├── App.tsx         # ルーティング定義
├── main.tsx        # エントリーポイント（injectTheme() 呼び出し）
└── index.css       # Tailwind ディレクティブのみ
```

---

## デザインシステム

### カラーの変更方法

`src/tokens/colors.ts` の hex 値を変更するだけで、shadcn/ui コンポーネントを含むテーマ全体が更新されます。

```ts
// src/tokens/colors.ts

export const brand = {
  primary:   { light: '#8892D1', base: '#2E3A97', dark: '#1B2266' }, // ← ここを変える
  secondary: { light: '#94A3B8', base: '#475569', dark: '#1E293B' },
  tertiary:  { light: '#34D399', base: '#059669', dark: '#064E3B' },
}
```

### 仕組み

```
colors.ts（hex）
    ↓ theme.ts が hex → CSS 変数へ変換
:root に CSS 変数をセット（main.tsx の injectTheme()）
    ↓
tailwind.config.ts が var(--primary) で参照
    ↓
shadcn/ui コンポーネントが bg-primary 等で利用
```

### Tailwind クラスでの使用

```tsx
// 正しい使い方（Tailwind クラスを使う）
<button className="bg-primary text-primary-foreground">ボタン</button>
<p className="text-muted-foreground">説明文</p>
<div className="border border-border">カード</div>

// 使わない（CSS 変数の直接参照）
<button style={{ backgroundColor: "var(--primary)" }}>ボタン</button>
```

---

## レイアウトコンポーネント

`src/components/layout/` に配置されているコンポーネントを再利用してください。

### Sidebar

```tsx
import { Sidebar } from "@/components/layout/Sidebar"
// ナビ項目の変更: Sidebar.tsx 内の navItems 配列を編集する
```

### Breadcrumb

```tsx
import { Breadcrumb } from "@/components/layout/Breadcrumb"

<Breadcrumb
  items={[
    { label: "ホーム", href: "/" },
    { label: "設定", href: "/settings" },
    { label: "プロフィール" },  // href なし = 現在ページ
  ]}
/>
```

### PageTitle

```tsx
import { PageTitle } from "@/components/layout/PageTitle"

<PageTitle title="ページタイトル" />
```

---

## コンポーネント設計ルール

### コンポーネントの配置

| 種類 | 配置場所 |
|---|---|
| 複数ページで使う汎用パーツ | `src/components/shared/` |
| 1ページ内だけで使うパーツ | `src/pages/<page>/_components/` |
| レイアウト要素 | `src/components/layout/`（既存を再利用） |

### shadcn/ui プリミティブと shared/ の使い分け

`Button`, `Dialog`, `Input` 等の **shadcn/ui プリミティブは `src/components/ui/` からそのまま直接使います**。
ボタンカラー等はすでに CSS 変数でテーマ制御されているため、shared/ への wrapping は不要です。

`src/components/shared/` に作るのは以下のケースのみ：

| ケース | 例 |
|---|---|
| 複数 shadcn コンポーネントを組み合わせた固定パターン | `ConfirmDialog`（Dialog + キャンセル + 実行ボタン） |
| プロジェクト固有のロジックや固定 props を持つもの | `DeleteConfirmDialog`（destructive + 確認文言） |
| 複数ページで使うフォーム部品 | `FormField`（Label + Input + エラー表示） |

```tsx
// ✅ プリミティブはそのまま使う
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"

<Button variant="destructive">削除</Button>

// ✅ パターン化されたものは shared/ に作る
import { ConfirmDialog } from "@/components/shared/ConfirmDialog"

<ConfirmDialog
  title="削除しますか？"
  onConfirm={handleDelete}
/>
```

### バリアントの使い方

コンポーネントの見た目の違いは `variant` props で表現し、`cva` で定義します。

```tsx
import { cva } from "class-variance-authority"

const badgeVariants = cva("rounded-full px-3 py-1 text-sm font-medium", {
  variants: {
    variant: {
      default:     "bg-primary text-primary-foreground",
      secondary:   "bg-secondary text-secondary-foreground",
      destructive: "bg-destructive text-destructive-foreground",
    },
  },
  defaultVariants: { variant: "default" },
})
```

### ページコンポーネントでの直接指定禁止

`src/pages/` 配下のページコンポーネントでは以下を直接書かない。
必ずコンポーネント化してスタイルをそこに閉じ込めること。

```tsx
// ❌ ページで直接書かない
<p className="text-sm text-red-500 mt-4">エラーメッセージ</p>

// ✅ コンポーネントに切り出す
// src/components/shared/ErrorMessage.tsx
export function ErrorMessage({ children }: { children: React.ReactNode }) {
  return <p className="text-sm text-destructive mt-4">{children}</p>
}
```

禁止クラスの例:
- テキストサイズ: `text-xs` `text-sm` `text-base` `text-lg` `text-xl` 等
- カラースケール直指定: `text-red-500` `bg-blue-600` `border-gray-300` 等
- スペーシング直指定: `p-4` `mt-8` `gap-3` 等

---

## shadcn/ui コンポーネントの追加

```bash
npx shadcn add <component-name>
# 例: npx shadcn add dialog
```

追加されたコンポーネントは `src/components/ui/` に配置されます。
このディレクトリのファイルは直接編集しないでください。
