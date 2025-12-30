# 南保俊輔のポートフォリオサイト

このリポジトリは、南保俊輔の個人ポートフォリオサイトのソースコードです。
Next.js 15、React 19、TypeScript、Tailwind CSS v4を使用したモダンなWebアプリケーションです。

## 📋 目次

- [特徴](#特徴)
- [技術スタック](#技術スタック)
- [プロジェクト構成](#プロジェクト構成)
- [セットアップ方法](#セットアップ方法)
- [開発方法](#開発方法)
- [デプロイ方法](#デプロイ方法)
- [コンテンツの更新方法](#コンテンツの更新方法)

## ✨ 特徴

- **レスポンシブデザイン** - スマホ・タブレット・PCすべてのデバイスに対応
- **スムーズなアニメーション** - Framer Motionによる洗練されたスクロールアニメーション
- **インタラクティブUI** - カルーセル表示、タイムライン切替、フィルタリング機能
- **アクセシビリティ対応** - ARIA属性、キーボード操作、スクリーンリーダー対応
- **パフォーマンス最適化** - React.memo、Next.js Image最適化、エラーバウンダリ実装
- **型安全** - TypeScriptによる堅牢な型チェック

## 🛠 技術スタック

### フレームワーク・ライブラリ

- **Next.js 15.5.9** - Reactフレームワーク（App Router使用）
- **React 19.1.0** - UIライブラリ
- **TypeScript 5.x** - 型安全な開発環境
- **Tailwind CSS v4** - ユーティリティファーストのCSSフレームワーク

### アニメーション・UI

- **Framer Motion 12.23.12** - スクロールアニメーション
- **Embla Carousel React 8.6.0** - プロジェクトカルーセル表示
- **React Icons 5.5.0** - アイコンライブラリ

### 開発ツール

- **Turbopack** - 高速なビルドツール
- **ESLint** - コード品質チェック
- **PostCSS** - CSS処理

## 📁 プロジェクト構成

```
portfolio/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # ルートレイアウト（ヘッダー・フッター）
│   ├── page.tsx             # トップページ
│   └── globals.css          # グローバルスタイル
│
├── components/              # Reactコンポーネント
│   ├── GlobalHeader.tsx     # ヘッダーナビゲーション
│   ├── ProfileHeader.tsx    # プロフィールセクション
│   ├── Skills.tsx           # スキル一覧
│   ├── ProjectsSection.tsx  # プロジェクト表示（カルーセル/グリッド切替）
│   ├── ProjectsCarousel.tsx # カルーセル表示
│   ├── ProjectsGrid.tsx     # グリッド表示
│   ├── ProjectCard.tsx      # プロジェクトカード
│   ├── Timeline.tsx         # 活動タイムライン
│   ├── TimelineItem.tsx     # 縦型タイムラインアイテム
│   ├── HorizontalTimelineItem.tsx # 横型タイムラインアイテム
│   ├── GitHubActivity.tsx   # GitHub活動グラフ
│   ├── Contact.tsx          # コンタクトセクション
│   ├── Footer.tsx           # フッター
│   ├── Modal.tsx            # モーダルコンポーネント
│   ├── MotionWrap.tsx       # アニメーションラッパー
│   ├── FilterButton.tsx     # フィルターボタン
│   └── ErrorBoundary.tsx    # エラーハンドリング
│
├── config/                  # 設定ファイル
│   └── index.ts            # サイト設定・コンテンツデータ
│
├── hooks/                   # カスタムフック
│   ├── useCopyToClipboard.ts      # クリップボードコピー
│   └── useEmblaSelected.ts        # カルーセル選択状態
│
├── types/                   # TypeScript型定義
│   └── index.ts            # 共通型定義
│
├── public/                  # 静的ファイル
│   ├── images/             # プロフィール画像など
│   └── projects/           # プロジェクト画像
│
├── next.config.ts          # Next.js設定
├── tailwind.config.ts      # Tailwind CSS設定
├── tsconfig.json           # TypeScript設定
└── package.json            # 依存関係
```

## 🚀 セットアップ方法

### 必要な環境

- **Node.js** 18.x以上
- **npm** または **yarn**

### インストール手順

1. **リポジトリをクローン**

```bash
git clone https://github.com/namb0304/portfolio.git
cd portfolio
```

2. **依存パッケージをインストール**

```bash
npm install
```

3. **環境変数の設定（EmailJS設定）**

お問い合わせフォームを動作させるために、EmailJSの環境変数を設定する必要があります。

#### EmailJSのセットアップ手順

1. [EmailJS](https://www.emailjs.com/) にアクセスしてアカウントを作成（無料プランでOK）
2. **Email Services** でGmailなどのメールサービスを連携
3. **Email Templates** で新しいテンプレートを作成:
   ```
   件名: {{subject}}

   差出人: {{from_name}}
   メールアドレス: {{from_email}}

   メッセージ:
   {{message}}
   ```
4. **Account** → **General** でPublic Keyを取得

#### 環境変数ファイルの作成

プロジェクトルートに `.env.local` ファイルを作成します。

```bash
# EmailJS設定
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

**重要**: `.env.local` ファイルは `.gitignore` に含まれているため、GitHubにプッシュされません。Vercelデプロイ時は、Vercelの環境変数設定で同じ値を設定してください。

## 💻 開発方法

### 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開くと、開発中のサイトが表示されます。

ファイルを編集すると、自動的にページが更新されます（ホットリロード機能）。

### ビルドの実行

本番環境用にビルドする場合：

```bash
npm run build
```

ビルドされたファイルをローカルで確認する場合：

```bash
npm run start
```

### コードの品質チェック

ESLintでコードの問題をチェック：

```bash
npm run lint
```

## 🌐 デプロイ方法

このプロジェクトは **Vercel** へのデプロイに最適化されています。

### Vercelへのデプロイ手順

1. [Vercel](https://vercel.com) にアクセスしてアカウントを作成
2. 「New Project」をクリック
3. GitHubリポジトリを連携
4. このリポジトリ（portfolio）を選択
5. **Environment Variables** で以下を設定:
   - `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
   - `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
   - `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`
6. 「Deploy」ボタンをクリック

デプロイは自動的に実行され、数分で完了します。
mainブランチにプッシュすると、自動的に再デプロイされます。

**注意**: 環境変数を後から追加・変更した場合は、Vercelで再デプロイが必要です。

### その他のデプロイ先

- **Netlify** - GitHubと連携して自動デプロイ可能
- **Cloudflare Pages** - 同様に自動デプロイ対応

## 📝 コンテンツの更新方法

サイトのコンテンツ（プロフィール、スキル、プロジェクト、タイムラインなど）は、すべて **`config/index.ts`** ファイルで管理されています。

### プロフィール情報の更新

```typescript
// config/index.ts
export const siteConfig = {
  author: {
    name: "南保 俊輔",
    nameEn: "Nambo Shunsuke",
    catchphrase: "あなたのキャッチフレーズ",
    bio: "自己紹介文...",
    email: "your.email@example.com",
    github: "https://github.com/yourusername",
  },
  // ...
};
```

### 新しいプロジェクトを追加

```typescript
// config/index.ts の projects 配列に追加
projects: [
  {
    title: "プロジェクト名",
    description: "プロジェクトの説明文",
    category: "personal", // personal | university | hackathon | zemi
    tags: ["Next.js", "TypeScript"],
    image: "/projects/your-image.png", // public/projects/ に画像を配置
    url: "https://your-project-url.com",
    github: "https://github.com/yourusername/project",
  },
  // 既存のプロジェクト...
],
```

### タイムラインに新しいイベントを追加

```typescript
// config/index.ts の timeline 配列に追加
timeline: [
  {
    date: "2025年12月",
    title: "新しいイベント",
    description: "イベントの詳細説明",
    tags: ["大学", "開発"], // タグでフィルタリング可能
  },
  // 既存のイベント...
],
```

### スキルの更新

```typescript
// config/index.ts の skills オブジェクトを編集
skills: {
  frontend: [
    {
      name: 'HTML5',
      icon: FaHtml5,
    },
    // 新しいスキルを追加...
  ],
  // backend, database, tools も同様に編集可能
},
```

### 画像の追加方法

1. プロジェクト画像は `public/projects/` フォルダに配置
2. プロフィール画像は `public/images/` フォルダに配置
3. config/index.tsで画像パスを指定（例: `/projects/my-project.png`）

## 🤝 開発に参加したい方へ

このプロジェクトは個人ポートフォリオですが、改善提案やバグ報告は歓迎します。

1. このリポジトリをフォーク
2. 新しいブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add some amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## 📄 ライセンス

このプロジェクトは個人利用のために作成されています。

## 📧 お問い合わせ

南保 俊輔
- GitHub: [@namb0304](https://github.com/namb0304)
- Email: shunsukenamb0304@gmail.com

---

**このポートフォリオサイトを見ていただき、ありがとうございます！**
