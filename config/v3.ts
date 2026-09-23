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
   * Hero コピー。Will → 現在の行動 → 証拠 の3層。
   *
   * 以前は main / sub がどちらも「目指しています」で終わっていた。
   * main だけを将来像（目指す）にし、sub は現在進行形（重ねています）、
   * proof は事実（運用しています）に変え、語尾で3層の役割が分かるようにした。
   *
   * 「提案が得意」「課題設定が得意」とは書かない。あくまで目指している方向。
   */
  statement:
    "顧客の課題を理解し、「何をつくるか」から提案できるエンジニアを目指しています。",
  statementSub:
    "そのために、要件・仕様の整理から実装、導入後の改善まで、一気通貫で関わる経験を重ねています。",
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
  team: "5人チーム / エンジニア2名",
  period: "2025年11月 —",
  /**
   * Home に出すのはこの3点だけ。数字カードを並べた dashboard にはしない。
   * 長い担当一覧・技術一覧は /work/hirolia へ逃がす。
   */
  flow: [
    { step: "Problem", body: "注文対応が一部のスタッフへ集中していた" },
    { step: "My Role", body: "顧客UI / 管理UI / API / DB / 運用" },
    { step: "Current", body: "本契約4店舗 / 試験導入1店舗" },
  ],
  /** Home では主要技術2〜3点まで */
  tech: ["flask", "postgres", "render"],
  href: "/work/hirolia",
  /**
   * 実画面。ファイルが無い場合はコンポーネント側でワイヤーフレームへ自動で落ちる。
   * 現在は Hirolia のサービスサイト（LP）。2940x1912 の横長。
   */
  shot: {
    kind: "image",
    src: "/projects/hirolia-lp.png",
    label: "サービスサイト",
    alt: "Hirolia のサービスサイト",
    width: 2940,
    height: 1912,
  },
  /**
   * 来店客の注文画面。LP バナーの上に実機フレームで重ねる。
   * 保存先: public/projects/hirolia-order.png
   * 置かれていなければコンポーネント側で自動的に非表示になる。
   */
  phoneShot: {
    src: "/projects/hirolia-order.png",
    alt: "Hirolia の注文画面（来店客の端末）",
    width: 792,
    height: 1628,
  },
} as const;

/* -------------------------------------------------------------------------- */
/* Project Rail — Hirolia 以外。同じ情報量に揃えない。                          */
/* -------------------------------------------------------------------------- */

/**
 * Progate Hackathon はここに入れない。
 * 作品名・技術・担当・画像のいずれも記録がなく（監査 §13.2-9 で7月から未確認）、
 * Project Card にすると中身のない枠になるため、Activities 側の受賞記録として残す。
 */
export const v3Rail = [
  {
    key: "txc",
    name: "Thank x Chain",
    /** 誰向けの何か */
    forWho: "感謝を伝えたい人のためのSNS",
    accent: "#3AA6B9",
    /** 作り直した経緯。受賞作としてではなく、やり直した話として見せる。 */
    arc: ["Thanks をつくった", "狙った行動が起きなかった", "コンセプトから作り直した"],
    role: "フロントエンド / 企画",
    result: "RSS Hackathon 2025 Beyond 奨励賞",
    tech: ["vue", "firebase", "vercel"],
    image: "/projects/project-thanks_x_chain.png",
    imageFit: "cover",
    /** 横長のUI。少し高さを取って見せる。 */
    imageH: 210,
    width: 400,
    /** Thanks（作り直す前）を重ねて、変化が画でも分かるようにする */
    beforeImage: "/projects/project-thanks.png",
    beforeLabel: "Thanks",
    afterLabel: "Thank x Chain",
    links: [
      { label: "サービスを開く", href: "https://thanks.jkotqmrr.com/", kind: "external" },
      { label: "GitHub", href: "https://github.com/namb0304/RSS_Hackathon_namelesz.git", kind: "github" },
    ],
  },
  {
    key: "train",
    name: "電車遅延情報アプリ",
    forWho: "通勤・通学で電車を使う人に、遅延をリアルタイムで知らせる",
    accent: "#5AA9D6",
    summary:
      "自分でテーマを決め、路線を登録すると遅延情報が届くアプリとして制作。ポスター発表まで行いました。",
    role: "企画 / 実装 / 発表（個人開発）",
    result: "未来創造プロジェクト 学科賞",
    tech: ["react", "expo"],
    image: "/projects/project-future.png",
    /** 縦長の端末スクショ。切らずに全体を見せるので、枠も縦長にする。 */
    imageFit: "contain",
    imageH: 300,
    width: 320,
    links: [
      { label: "GitHub", href: "https://github.com/namb0304/TrainLiveInfo.git", kind: "github" },
    ],
  },
  {
    key: "fashion",
    name: "ファッション × SNS × AI",
    forWho: "自分の服を記録して、コーディネートを共有したい人向け",
    accent: "#7E82CF",
    summary:
      "ゼミ合宿でのチーム開発。デジタルクローゼットとAIによるコーデ提案を組み合わせたサービスで、メイン機能の実装を担当しました。",
    role: "メイン機能の実装",
    result: "ゼミ合宿（2025年）",
    tech: ["php"],
    image: "/projects/project-ai-fashion.png",
    imageFit: "cover",
    imageH: 190,
    width: 380,
    links: [
      { label: "GitHub", href: "https://github.com/namb0304/sc2025-g3.git", kind: "github" },
    ],
  },
  {
    key: "hikoboshi",
    name: "彦星浮気チェッカー",
    forWho: "年に一度だけ使いたい、LINEで動く診断ボット",
    accent: "#4CAF6E",
    summary:
      "お題は「一年に一度だけ使いたいもの」。七夕に合わせて、LINEで質問に答えると彦星の浮気度が分かるボットを作りました。",
    role: "実装（ハッカソン）",
    result: "ツクってアソぶハッカソン",
    tech: ["gas"],
    image: "/projects/project-hikoboshi.png",
    imageFit: "cover",
    imageH: 200,
    width: 360,
    links: [],
  },
] as const;

/* -------------------------------------------------------------------------- */
/* Experience                                                                 */
/* -------------------------------------------------------------------------- */

/**
 * インターン・参加プログラム。
 * 「やったこと → 分かったこと → 次に活かすこと」で統一する。
 * 失敗談を主役にしない。何を経験して何が変わったか、を主役にする。
 */
export const v3Experience = [
  {
    key: "stores",
    org: "STORES",
    program: "プロダクト開発インターン",
    format: "7days / 2026年8月",
    mark: "product",
    /** 閉じているときに出す一言 */
    summary:
      "抽選販売機能の企画・実装を通じて、課題設定を判断基準として持ち続ける難しさを学びました。",
    /** 何をやったか */
    did: {
      lead: "STORES ネットショップ上で、外部サービスや手作業で行われている抽選販売を STORES 内で完結させる「抽選販売機能」を企画・開発しました。",
      points: [
        "商品設定 → 応募 → 抽選 → 結果確認 までの最低限のプロトタイプを作成",
        "初期段階でターゲット / AS-IS・TO-BE / 情報の確度 / まだ分からないこと を整理",
        "データ設計・状態管理・二重実行対策・支払い方法・テスト・既存画面への組み込み",
      ],
    },
    /** 何が分かったか */
    learned: {
      lead: "課題は最初に整理するだけでは足りず、開発・機能選定・検証・発表まで判断基準として持ち続ける必要がある、と分かりました。",
      points: [
        "実装に入ると、完成したかが分かりやすい作業（プロトタイプ・テスト・データ設計）へ意識が寄り、最初に置いた課題から判断が離れていった",
        "情報を集めることと、意思決定することは違う",
      ],
    },
    /** 次にどうするか */
    next: [
      "開発前に「誰のどの課題か」を一文で決めてから着手する",
      "AS-IS / TO-BE を資料に書くだけでなく、開発中の判断にも使う",
      "選択肢を増やすだけでなく、判断基準で捨てる",
    ],
  },
  {
    key: "mynavi",
    org: "マイナビ",
    program: "クラウドエンジニア体験プログラム",
    format: "オンライン・2日間 / 2026年9月",
    mark: "cloud",
    summary:
      "クラウド構成の構築と障害切り分けを通じて、システム全体を順に確認する考え方を学びました。",
    did: {
      lead: "1日目は AWS の基礎をハンズオンで、2日目はチームでのトラブルシューティングに取り組みました。",
      points: [
        "1日目: EC2 / VPC / Subnet / Security Group / IaC（AWS CDK）",
        "2日目: CloudFront → API Gateway → Lambda の構成で、サイトが表示されない状態を切り分け",
        "GET / POST の Method 不一致、CloudFront の Origin Path、ALB Listener、Target Group の Health Check、EC2 の Security Group を確認",
      ],
    },
    learned: {
      lead: "コードを眺めて原因を探すのではなく、システムのどこまでが正常に動いているかを順番に切り分ける、という考え方が一番の収穫でした。",
      points: [
        "Lambda 単体は正常 / API Gateway の POST は正常 / GET は失敗、という事実から Method 周辺へ原因候補を絞る進め方を経験した",
        "クラウドエンジニアはコンソールを触る仕事ではなく、アプリを動かす土台を設計・構築・運用し、障害時に通信経路を切り分けて原因を特定する仕事だと理解が変わった",
      ],
    },
    next: [
      "HTTP / ネットワーク / Security Group など、土台の基礎を復習する",
      "「事実 / 仮説 / 次に確認すること」をセットで共有する",
      "AWS はコンソールで実態を見てから、コードと対応づけて学ぶ",
    ],
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
      { name: "PostgreSQL", icon: "postgres", where: "Hirolia 本番DB / pg_dump で外部バックアップ" },
      { name: "Render", icon: "render", where: "Hirolia 本番環境" },
      { name: "GitHub Actions", icon: "actions", where: "PR ごとに pytest を自動実行" },
      { name: "Better Stack", icon: "betterstack", where: "エラー通知・外形監視（Slack へ通知）" },
      { name: "Cloudinary", icon: "cloudinary", where: "メニュー画像の配信" },
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
      { text: "マイナビ クラウドエンジニア体験プログラム（9月）" },
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
