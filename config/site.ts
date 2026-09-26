/**
 * 公開URLと、サイト共通のメタ情報。
 *
 * 本番のURLはリポジトリのどこにも書かれていない（独自ドメインの有無も未確定）。
 * 推測で固定値を置くと canonical / OGP が誤ったURLを指すので、ここでは決め打ちしない。
 * 優先順位は次のとおり:
 *
 *   1. NEXT_PUBLIC_SITE_URL … 独自ドメインを使う場合に設定する
 *   2. VERCEL_PROJECT_PRODUCTION_URL … Vercel がビルド時に渡す本番ドメイン
 *   3. localhost … ローカル開発
 *
 * canonical と OG の url はすべて相対パスで書き、ここを基準に解決させる。
 * ドメインが決まったら 1 を設定するだけで全ページが揃う。
 */
const fromEnv =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "");

export const SITE_URL = (fromEnv || "http://localhost:3000").replace(/\/$/, "");

export const SITE_NAME = "南保 俊輔 — ポートフォリオ";

/** 共有画像。1200x630 の静的PNG。組版に使ったHTMLは docs/og-image.html。 */
export const OG_IMAGE = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: "南保 俊輔 / Shunsuke Nambo — 2028卒 エンジニア志望のポートフォリオ",
} as const;
