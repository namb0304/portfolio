/**
 * /design-lab 用の共有コンテンツ。
 *
 * 3案（A/B/C）は**同じ内容**を使う。違うのは構図・密度・階層・インタラクションだけ。
 * ここにあるのは TOP の teaser レベルの短さに削ったコピー。詳細は /work/hirolia に逃がす前提。
 * テキストはすべて仮。
 */

export const labProfile = {
  name: "南保 俊輔",
  nameEn: "Shunsuke Nambo",
  meta: "武蔵野大学 データサイエンス学部 3年 / 2028卒",
  /** 一言の方向性。Hero に置く。 */
  direction: "作って終わりにせず、店舗で動き続けるところまで持つ。",
  github: "https://github.com/namb0304",
} as const;

/** TOP では 3〜5秒で伝わる分だけ。 */
export const labHirolia = {
  name: "Hirolia",
  what: "飲食店向けモバイルオーダー",
  /** 「実際に使われている」の証拠 */
  live: "本契約4店舗で運用中",
  liveDetail: "本契約 4店舗（2026年9月時点）",
  since: "2025年11月 企画・設計 / 12月 開発開始",
  team: "5人チーム / エンジニア2名",
  /** 「自分がどこまで関わっているか」 */
  scope: "注文画面・管理画面・API・DB設計から、本番の監視・CI・障害対応まで",
  /** 「何が面白い経験だったのか」 */
  hook: "開発環境では一度も出なかった問題が、店舗に入れた日から出た。",
  href: "/work/hirolia",
} as const;

/** Direction B / C で使うフェーズ。B は切り替え、C はパイプライン表示。 */
export const labPhases = [
  {
    key: "design",
    en: "Design",
    ja: "設計",
    body: "実店舗のメニューは、セット・トッピング・辛さ・表記ゆれを含んでいた。どこまでをデータ構造にし、どこからを店舗の運用に任せるかの線を引き直した。",
    shot: { kind: "placeholder", label: "DB / メニュー構造の図", tone: "diagram" },
  },
  {
    key: "build",
    en: "Build",
    ja: "実装",
    body: "来店客向けの注文画面と、店舗向けのメニュー管理画面、その裏の Backend API を実装した。",
    shot: { kind: "image", label: "注文・管理画面", tone: "app" },
  },
  {
    key: "deploy",
    en: "Deploy",
    ja: "導入",
    body: "店舗の回線・端末・オペレーションの上に載せた。ここから前提が変わった。",
    shot: { kind: "placeholder", label: "店舗での利用風景 / 実機写真", tone: "photo" },
  },
  {
    key: "operate",
    en: "Operate",
    ja: "運用",
    body: "落ちたことに店舗からの連絡で気づく状態をやめた。監視・CI・バックアップを入れ、障害は営業を戻すことを優先して対応している。",
    shot: { kind: "placeholder", label: "監視 / デプロイ履歴の画面", tone: "ops" },
    live: true,
  },
] as const;

export const labThankXChain = {
  name: "Thank x Chain",
  what: "感謝を次の人へつなげるSNS",
  /** 「機能を増やした」ではなく「作り直した」ことが1文で分かるように */
  hook: "一度つくって、狙った行動が起きなかったので、コンセプトから作り直した。",
  before: "Thanks",
  after: "Thank x Chain",
  award: "RSS Hackathon 2025 Beyond 奨励賞",
  tech: ["Vue.js", "Firebase", "Vercel"],
  image: "/projects/project-thanks_x_chain.png",
  url: "https://thanks.jkotqmrr.com/",
} as const;

/**
 * 画像の状況。
 * Hirolia の実スクリーンショットはまだ手元にないため、
 * - 実在する前身プロダクト（モバオル）の画面を「差し替え前提」で1枚だけ使う
 * - 残りは何を撮るべきかが分かる placeholder を置く
 */
export const HIROLIA_SHOT = "/projects/project-mobaoru.png";
export const HIROLIA_SHOT_NOTE =
  "画像は前身プロダクト「モバオル」。Hirolia の実画面に差し替え予定";

/* ==========================================================================
 * Hybrid v2 — A（editorial / 大胆なTypography / 実画像）× C（運用の信頼感 / 走査性）
 * ========================================================================== */

export const hybrid = {
  /**
   * Hero コピー候補（検討したもの）:
   *   1. 動くところまではつくれる。使われ続けるところまで、やる。 → 説明的で長い
   *   2. 作るところで、終わらせない。                        → スローガンに寄る
   *   3. 5店舗で、今日も動いている。                        → 主語がプロダクトになり本人が消える
   *   4. 作った。入れた。動かし続けている。                  ← 採用
   *
   * 4を採った理由: 12文字。3つとも事実で、盛っていない。そして
   * 「入れた」「動かし続けている」は、作っただけの学生には書けない。
   * コピーそのものが差別化になっている。
   */
  headline: ["作った。", "入れた。", "動かし続けている。"],

  sub: "飲食店向けモバイルオーダー「Hirolia」を、5人チームのエンジニア2名のうち1人として。",

  /** 少量の personality。等身大で、飲食店という現場からしか出てこない一行。 */
  aside: "障害の連絡が来るのは、だいたい夕食どきです。",

  /** Hero 下端の反転バンド。Cの operation motif を「伝票」の質感で持つ。 */
  band: [
    { label: "稼働", value: "4 STORES LIVE", live: true },
    { label: "内訳", value: "すべて本契約" },
    { label: "運用開始", value: "2026年4月" },
    { label: "本番", value: "Render・監視・CI・バックアップ" },
  ],

  /** Hirolia セクションの一文（明朝を使う2箇所目） */
  thesis: "開発環境では一度も出なかった問題が、店舗に入れた日から出た。",

  caseHref: "/work/hirolia",
} as const;
