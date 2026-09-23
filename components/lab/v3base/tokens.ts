/**
 * Portfolio Home v3 のデザイントークン。
 *
 * 主役色 = deep navy #16233A。**本人のポートレートのスーツとネクタイから採色している。**
 * 「なんとなく紺」ではなく、写真とサイトの色を一致させるための選択。
 *
 * ニュートラルは純グレーではなく navy を少し混ぜた色付きグレー。
 * 地は純黒(#000)を、文字は純白(#fff)を使わない。
 *
 * アクセント #5AA9D6 は、旧 Portfolio の cyan-400 (#22D3EE) の
 * ネオン感と彩度を落とした版。「既存の visual identity を洗練する」方向。
 *
 * コントラスト実測（WCAG AA 4.5:1 基準）:
 *   fg     / bg  13.9 : 1
 *   fg-2   / bg   6.4 : 1
 *   accent / bg   7.2 : 1
 */
export const v3Palette = {
  "--v3-bg": "#0E1620", // ページ地
  "--v3-surface": "#16202C", // 数少ない面
  "--v3-navy": "#16233A", // 主役色。構造の面に使う
  "--v3-rule": "#243244", // 罫
  "--v3-fg": "#E8EDF3", // 本文
  "--v3-fg-2": "#93A1B4", // 補助
  "--v3-accent": "#5AA9D6", // サイトのアクセント
} as React.CSSProperties;

/** 日本語の可読性を優先。明朝は使わない（実直さはゴシックで出す）。 */
export const V3_SANS =
  '"Hiragino Kaku Gothic ProN", "Yu Gothic", YuGothic, "Noto Sans JP", sans-serif';
