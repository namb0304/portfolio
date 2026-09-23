/**
 * Portfolio Home v3 — 検証用コンテンツ。
 *
 * 主語は Hirolia ではなく **南保 俊輔**。
 * Hirolia は「本人を理解してもらうための最も強い証拠のひとつ」として扱う。
 * テキストはすべて仮。
 */

export function academicStatus(entranceYear: number, now: Date = new Date()) {
  let years = now.getFullYear() - entranceYear;
  if (now.getMonth() + 1 < 4) years--;
  return { grade: years + 1, graduationYear: entranceYear + 4 };
}

export const v3Profile = {
  name: "南保 俊輔",
  nameEn: "Shunsuke Nambo",
  university: "武蔵野大学 データサイエンス学部",
  entranceYear: 2024,
  photo: "/images/profile-icon.jpg",
  github: "https://github.com/namb0304",

  /**
   * Hero コピー。3段構成。
   *   main  … 目指している方向（最も大きい文）
   *   sub   … その方向の具体的な範囲
   *   proof … 現在それをどこで実践しているか
   *
   * 「提案できるエンジニアを目指しています」は自己実現の方向であって、
   * 「提案が得意」という現在の能力の主張ではない。ここは絶対に強めない。
   */
  statement:
    "顧客の課題を理解し、「何をつくるか」から提案できるエンジニアを目指しています。",
  statementSub:
    "要件・仕様の整理から実装、導入後の改善まで、一気通貫で関わることを目指しています。",
  proof:
    "現在は、飲食店向けモバイルオーダー「Hirolia」を実店舗5店舗で運用し、現場の声をもとに改善を続けています。",
} as const;

/**
 * What I Value — 「できること」ではなく「大切にしていること」。
 * 順序のある手順ではないので 01/02/03 の連番は振らない。
 */
export const v3Values = [
  {
    title: "ユーザー・顧客の課題から考える",
    body: "仕様をそのまま実装するだけではなく、誰の何を変えるためのものなのかを理解してから作りたい。",
  },
  {
    title: "要件から運用改善まで関わる",
    body: "実装だけで区切らず、導入され、使われ、その後改善されるところまで関わりたい。",
  },
  {
    title: "技術だけで閉じない",
    body: "営業・事業・ユーザーなど、立場の異なる人と前提を揃えながら開発したい。",
  },
] as const;

/* -------------------------------------------------------------------------- */
/* Selected Projects                                                          */
/* -------------------------------------------------------------------------- */

/**
 * 画像の方針:
 *   image  … 実在するスクリーンショット
 *   pending … 実画像がないもの。**誤解を生む代替画像は置かない**。
 * Hirolia にモバオル（前身プロダクト）の画面を使うのはやめた。
 */
export const v3Featured = {
  name: "Hirolia",
  tagline: "飲食店向けモバイルオーダーSaaS",
  /** 作品ごとの固有色。サイトのブランド色とは分ける。 */
  accent: "#E8991F",
  summary:
    "来店客が自分の端末から注文し、店舗は管理画面からメニューと店舗ごとの設定を管理します。",
  team: "5人チーム（エンジニア2名）",
  role: "顧客UI・管理UI・Backend API・DB設計・本番運用",
  status: "本契約4店舗 / 試験導入1店舗",
  period: "2025年11月 —",
  /**
   * 本人の思考（課題理解 → 実装 → 運用改善）を、カード内の短い流れとして見せる。
   * 長い技術一覧はカードから外し、詳細ページへ送る。
   */
  /** 技術一覧は polish 後のカードには出さない（詳細ページと v3base 用に保持） */
  tech: ["Python / Flask", "PostgreSQL", "Render", "GitHub Actions"],
  flow: [
    { step: "Problem", body: "注文対応が日本語を話せる特定スタッフへ集中していた" },
    { step: "Role", body: "顧客UI / 管理UI / API / DB設計 / 本番運用" },
    { step: "Impact", body: "本契約4店舗 + 試験導入1店舗で継続利用" },
  ],
  href: "/work/hirolia",
  shot: { kind: "pending", label: "注文画面 / 管理画面" },
} as const;

export const v3Projects = [
  {
    name: "Thank x Chain",
    tagline: "感謝を次の人へつなげるSNS",
    accent: "#3AA6B9",
    summary:
      "一度つくって狙った行動が起きなかったので、コンセプトから見直して作り直しました。",
    team: "チーム開発",
    role: "フロントエンド / 企画",
    status: "RSS Hackathon 2025 Beyond 奨励賞",
    tech: ["Vue.js", "Firebase", "Vercel"],
    href: "https://thanks.jkotqmrr.com/",
    shot: { kind: "image", src: "/projects/project-thanks_x_chain.png" },
    span: "wide",
  },
  {
    name: "電車遅延情報アプリ",
    tagline: "未来創造プロジェクト",
    accent: "#5AA9D6",
    summary:
      "自分でテーマを決めて制作し、ポスター発表まで行いました。学科賞を受賞。",
    team: "個人開発",
    role: "企画 / 実装 / 発表",
    status: "学科賞",
    tech: ["React Native", "Expo"],
    href: "https://github.com/namb0304/TrainLiveInfo.git",
    shot: { kind: "image", src: "/projects/project-future.png" },
    span: "tall",
  },
  {
    name: "Progate Hackathon powered by AWS",
    tagline: "2024年6月",
    accent: "#8B9BB4",
    summary: "初参加のハッカソンで企業賞。社外から評価をもらった最初の機会でした。",
    team: "チーム開発",
    role: "実装",
    status: "企業賞",
    tech: ["JavaScript"],
    href: undefined,
    shot: { kind: "pending", label: "作品画面" },
    span: "strip",
  },
] as const;

/* -------------------------------------------------------------------------- */
/* Experience                                                                 */
/* -------------------------------------------------------------------------- */

export const v3Experience = [
  {
    org: "STORES",
    role: "プロダクト開発インターン",
    when: "2026.08",
    body: "抽選販売機能の企画・実装を経験。実装に入ると最初に置いた課題を判断基準として保持しづらくなる自分の癖に気づき、いまは具体と抽象の往復や、判断の根拠を言葉にすることを意識しています。",
  },
  {
    org: "マイナビ",
    role: "クラウドエンジニア体験",
    when: "2026",
    body: "クラウド基盤の構築を体験。アプリケーションの外側にある、動かし続けるための仕組みを知る機会になりました。",
    provisional: true,
  },
] as const;

/* -------------------------------------------------------------------------- */
/* Technical Skills                                                           */
/* -------------------------------------------------------------------------- */

/** icon は components 側で react-icons に対応づける（config に JSX を持ち込まない） */
export const v3Skills = [
  {
    group: "Production",
    note: "実店舗で稼働しているプロダクトで使用・運用",
    items: [
      { name: "Python / Flask", icon: "flask", where: "Hirolia Backend API" },
      { name: "PostgreSQL", icon: "postgres", where: "Hirolia 本番DB・DB設計" },
      { name: "Render", icon: "render", where: "Hirolia 本番環境" },
      { name: "GitHub Actions", icon: "actions", where: "Hirolia の CI" },
      { name: "監視 / バックアップ", icon: "monitor", where: "エラー監視・外形監視" },
    ],
  },
  {
    group: "Main Development",
    note: "チーム開発・個人開発で主に使うもの",
    items: [
      { name: "TypeScript", icon: "ts", where: "このポートフォリオ" },
      { name: "React", icon: "react", where: "個人開発・学内制作" },
      { name: "Next.js", icon: "next", where: "このポートフォリオ" },
      { name: "Vue.js", icon: "vue", where: "Thank x Chain" },
      { name: "Firebase", icon: "firebase", where: "Thank x Chain" },
      { name: "Tailwind CSS", icon: "tailwind", where: "各種フロントエンド" },
    ],
  },
  {
    group: "Other Experience",
    note: "学習・試作の範囲で触れたもの",
    items: [
      { name: "FastAPI", icon: "fastapi", where: "個人開発" },
      { name: "Docker", icon: "docker", where: "ローカル環境構築" },
      { name: "PHP", icon: "php", where: "ゼミ合宿" },
      { name: "React Native / Expo", icon: "expo", where: "電車遅延情報アプリ" },
      { name: "Google Apps Script", icon: "gas", where: "ハッカソン作品" },
    ],
  },
] as const;

/* -------------------------------------------------------------------------- */
/* Activities                                                                 */
/* -------------------------------------------------------------------------- */

export const v3Activities = [
  {
    year: "2024",
    items: [
      { text: "武蔵野大学 データサイエンス学部に入学し、Web開発を始める" },
      { text: "Progate Hackathon powered by AWS", award: "企業賞" },
    ],
  },
  {
    year: "2025",
    items: [
      { text: "未来創造プロジェクト / 電車遅延情報アプリ", award: "学科賞" },
      { text: "Thanks を制作", award: "奨励賞" },
      { text: "コンセプトを見直し Thank x Chain として作り直す" },
      { text: "Hirolia の開発を開始" },
    ],
  },
  {
    year: "2026",
    items: [
      { text: "Hirolia を実店舗へ導入", provisional: true },
      { text: "有料契約へ移行し、監視・CI・バックアップを整備", provisional: true },
      { text: "STORES プロダクト開発インターン" },
      { text: "マイナビ クラウドエンジニア体験", provisional: true },
      { text: "本契約4店舗 / 試験導入1店舗で継続運用", current: true },
    ],
  },
] as const;

export const v3Nav = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#activities", label: "Activities" },
  { href: "#github", label: "GitHub" },
  { href: "#contact", label: "Contact" },
] as const;
