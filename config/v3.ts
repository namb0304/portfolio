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
  /**
   * 文単位で持つ。表示側は 1 文を 1 ブロックとして置き、各文は幅に応じて
   * 自然に折り返す。固定の <br> は使わないが、文の切れ目だけは守りたいため。
   */
  statementSub: [
    "事実を確かめ、問題を切り分け、仮説を立てて試す。",
    "そんな進め方で、最後まで形にしてきました。",
  ],
  proof:
    "5人チームで開発している飲食店向けモバイルオーダー「Hirolia」で、注文画面・メニュー管理画面・APIの実装、DB設計、本番運用を担当しています。サービスは本契約4店舗で稼働中です。",
} as const;

/**
 * What I Value — 「できること」ではなく「大切にしていること」。
 * 順序のある手順ではないので 01/02/03 の連番は振らない。
 */
export const v3Values = [
  {
    title: "誰が何に困っているのかを確かめる",
    body: "その仕様が何のためにあるのかを開発者にも確認しながら作りたい。",
  },
  {
    title: "要件から運用改善まで関わる",
    body: "実装だけで区切らず、導入され、使われ、その後改善されるところまで関わりたい。",
  },
  {
    title: "立場の異なる人と一緒に考える",
    body: "Hirolia では営業メンバーを通じて店舗の反応が届く。技術の外にいる人とも前提を揃えられるようになりたい。",
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
  /** 「企画」は課題設定まで主導したように読めるので使わない。 */
  period: "2025年11月 要件定義・設計 / 12月 実装開始",
  /**
   * Home に出すのはこの3点だけ。数字カードを並べた dashboard にはしない。
   * 長い担当一覧・技術一覧は /work/hirolia へ逃がす。
   */
  flow: [
    { step: "Problem", body: "注文対応が一部のスタッフへ集中していた" },
    { step: "My Role", body: "注文画面・メニュー管理画面・APIの実装、DB設計、本番運用" },
    { step: "Current", body: "サービスは本契約4店舗で稼働中（2026年9月時点）" },
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
    forWho: "日常の小さな感謝を可視化し、次の行動につなげるSNS",
    accent: "#3AA6B9",
    /**
     * 受賞したのは Thanks であって Thank x Chain ではない。
     * 「Thank x Chain が奨励賞」と読める書き方をしないこと。
     */
    /**
     * 再設計のきっかけは**チームでの振り返り**であって、
     * ユーザー検証で「狙った行動が起きなかった」と確認したわけではない。
     */
    arc: [
      "Thanks をつくった（RSS Hackathon 2025 Beyond 奨励賞）",
      "チームで見直し、世界観とUI/UXに課題を感じた",
      "コンセプトとUI/UXを再設計し Thank x Chain へ",
    ],
    role: "フロントエンド / 企画",
    resultLabel: "参加",
    result: "技育展2025 予選会",
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
      { label: "見る", href: "https://thanks.jkotqmrr.com/", kind: "external" },
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
    resultLabel: "受賞",
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
    /** 正式名称は「AIによる画像分析とSNS機能を統合したファッション共有・提案システム」。
     *  カード幅では可読性が落ちるため、title と説明に分けて意味は変えない。 */
    name: "ファッション共有・提案システム",
    forWho: "AIによる画像分析とSNS機能を統合。自分の服を登録して共有する",
    accent: "#7E82CF",
    /** 担当はコミット履歴で確認済み。AI解析部分は別メンバーの担当なので書かない。 */
    summary:
      "ゼミ合宿でのチーム開発。自分の服を登録し、SNSのように投稿・閲覧できる部分を担当しました。",
    role: "クローゼット登録・投稿・マイページ・ログインまわりの実装",
    resultLabel: "制作機会",
    result: "ゼミ合宿（2025年）",
    tech: ["php"],
    image: "/projects/project-ai-fashion.png",
    imageFit: "cover",
    imageH: 190,
    width: 380,
    links: [
      { label: "見る", href: "https://gms.gdl.jp/~nambo/sc2025-g3/general.html", kind: "external" },
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
    resultLabel: "制作機会",
    result: "ツクってアソぶハッカソン",
    tech: ["gas"],
    image: "/projects/project-hikoboshi.png",
    imageFit: "cover",
    imageH: 200,
    width: 360,
    links: [
      {
        label: "見る",
        href: "https://script.google.com/macros/s/AKfycbzj4qgiIhltVS79ln_qPxhknENe1KD3Qa7Va4XBj-HInQssBK40rMfbedFWtmEdNvw/exec",
        kind: "external",
      },
    ],
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
      "抽選販売機能を企画・試作するなかで、課題設定を判断基準として持ち続ける難しさを知りました。",
    /** 何をやったか */
    did: {
      lead: "STORES ネットショップ上で、外部サービスや手作業で行われている抽選販売を STORES 内で完結させる「抽選販売機能」を企画し、プロトタイプを制作しました。",
      points: [
        "商品設定 → 応募 → 抽選 → 結果確認 までの最低限のプロトタイプを制作",
        "初期段階でターゲット / AS-IS・TO-BE / 情報の確度 / まだ分からないこと を整理",
        "データ設計・状態管理・二重実行対策・支払い方法・テスト・既存画面への組み込み",
      ],
    },
    /** 何が分かったか */
    learned: {
      lead: "課題は最初に整理するだけでは足りず、開発・機能選定・検証・発表まで判断基準として持ち続ける必要がある、と感じました。",
      points: [
        "実装が進むと、当初設定した課題よりも「完成させること」へ意識が寄っていた",
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
      lead: "1日目は AWS の基礎をハンズオンで学びました。2日目はチームで、2つの構成のトラブルシューティングに取り組みました。",
      points: [
        "1日目: EC2 / VPC / Subnet / Security Group / IaC（AWS CDK）",
        "2日目①: CloudFront → API Gateway → Lambda の構成で、サイトが表示されない状態を切り分け（Method 不一致 / Origin Path）",
        "2日目②: CloudFront → ALB → Target Group → EC2 の構成を確認（Listener / Health Check / Security Group）",
      ],
    },
    learned: {
      lead: "コードを眺めて原因を探すのではなく、システムのどこまでが正常に動いているかを順番に切り分ける、という考え方が一番の収穫でした。",
      points: [
        "Lambda 単体は正常 / API Gateway の POST は正常 / GET は失敗、という事実から Method 周辺へ原因候補を絞った",
        "どこまでが正常かを順に確かめると、原因の範囲が機械的に狭まっていくと分かった",
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
    note: "Hirolia の実運用で使っているもの",
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
    note: "制作で主に使うもの",
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
    note: "制作や学習で使ったもの",
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
      { text: "武蔵野大学データサイエンス学部に入学し、Web開発を始める" },
      {
        text: "Progate Hackathon powered by AWS にチームで参加",
        award: "AppBrew賞（企業賞）",
      },
    ],
  },
  {
    year: "2025",
    items: [
      { text: "未来創造プロジェクト / 電車遅延情報アプリ", award: "学科賞" },
      { text: "Thanks を制作", award: "RSS Hackathon 2025 Beyond 奨励賞" },
      { text: "コンセプトを再設計し Thank x Chain へ。技育展2025 予選会に参加" },
      { text: "11月 Hirolia の要件定義・設計を開始" },
      { text: "12月 ハッカソンに合わせて Hirolia の実装を開始" },
    ],
  },
  {
    year: "2026",
    items: [
      { text: "4月 Hirolia を1店舗目へ試験導入" },
      { text: "7月 1店舗目が正式な有料契約へ移行" },
      { text: "8月 STORES プロダクト開発インターン" },
      { text: "9月 マイナビ クラウドエンジニア体験プログラム" },
      { text: "9月 Hirolia を本契約4店舗で運用中", current: true },
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
