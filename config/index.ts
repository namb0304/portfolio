import {
  FaPython,
  FaDocker,
  FaPhp,
  FaHtml5,      // 修正
  FaCss3Alt,
  FaGithub,
  FaDatabase    // 修正 (NoSQLの汎用アイコンとして)
} from 'react-icons/fa';
import {
  SiJavascript,
  SiFirebase,
  SiPostgresql,
  SiSqlite,
  SiFlutter,
  SiVercel,
  SiRender,
} from 'react-icons/si';
// ↑↑↑ ここまで ↑↑↑

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  // --- プロフィール情報 (変更なし) ---
  author: {
    name: "南保 俊輔",
    nameEn: "Nambo Shunsuke", 
    catchphrase: "初めて触れる人でも使いやすく、自然と使いたくなるサービスを創り続ける",
    bio: "初めて触れる人でも迷わず使え、自然とまた使いたくなる。\nそんな体験を目指して、Webアプリケーションの開発に取り組んでいます。\n \n開発では技術そのものだけでなく、「誰が・どんな状況で・どのように使うのか」を意識しながら考えることを大切にしています。\nUI/UXを中心に、フロントエンドを軸としつつ、バックエンドやデータベースにも触れながら学んできました。\n \n将来的には、ユーザーに近い立場からサービスの体験をより良くしていけるフロントエンジニアを目指しています。",
    email: "shunsukenamb0304@gmail.com",
    github: "https://github.com/namb0304",
  },
  
  // --- 大学情報 (変更なし) ---
  university: {
    name: "武蔵野大学 データサイエンス学部",
    entranceYear: 2024,
  },

  // ★★★ スキルセットのアイコンを修正しました ★★★
  skills: {
    frontend: [
      {
        name: 'HTML5',
        icon: FaHtml5, // 修正: FaReact -> FaHtml5
      },
      {
        name: 'CSS3',
        icon: FaCss3Alt,
        frameworks: ['Tailwind CSS']
      },
      {
        name: 'JavaScript / TypeScript',
        icon: SiJavascript,
        frameworks: ['React', 'Vue.js', 'Next.js']
      },
    ],
    backend: [
      {
        name: 'Python',
        icon: FaPython,
        frameworks: ['Flask', 'FastAPI']
      },
      {
        name: 'PHP',
        icon: FaPhp,
      },
    ],
    database: [
      { name: 'PostgreSQL', icon: SiPostgresql }, // 修正: SiFirebase -> SiPostgresql
      { name: 'SQLite', icon: SiSqlite },       // 修正: SiFirebase -> SiSqlite
      { name: 'NoSQL', icon: FaDatabase },      // 修正: SiSupabase -> FaDatabase (汎用アイコン)
    ],
    tools: [
      { name: 'GitHub', icon: FaGithub },
      { name: 'Firebase', icon: SiFirebase },
      { name: 'Docker', icon: FaDocker },
      { name: 'Flutter', icon: SiFlutter },
      { name: 'Vercel', icon: SiVercel },
      { name: 'Render', icon: SiRender },
    ]
  },


  // 作品リスト
  // config/index.ts

  // ... (author, university, skills はそのまま) ...

  // 作品リスト
  projects: [
    {
      title: "ポートフォリオサイト",
      description: "Next.jsとTailwind CSS,vercelで制作した、こちらのサイトです。",
      category: "personal",
      tags: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
      image: "/projects/project-portfolio.png",
      url: "#",
      github: "https://github.com/namb0304/portfolio.git",
    },
    {
        title: "モバオル",
        description: "学部内ハッカソン期間中に開発したモバイルオーダーシステムです。",
        category: "university",
        tags: ["Python", "Flask", "SQLite"],
        image: "/projects/project-mobaoru.png",
        url: "https://gms.gdl.jp/s_yugo2/general/explamation",
        github: "https://github.com/namb0304/ds_hakka.git"
    },
    {
      title: "Thanks",
      description: "RSS Hackathon 2025で制作した、感謝をつなげるSNSです。",
      category: "hackathon",
      tags: ["Vue.js", "firebase", "vercel"],
      image: "/projects/project-thanks.png",
      url: "https://rss-hackathon-namelesz-k1f8bbvz1-shunsukenambo-8040s-projects.vercel.app/",
      github: "https://github.com/namb0304/RSS_Hackathon_namelesz.git",
    },
    {
      title: "Thank x Chain",
      description: "技育展2025の予選会に向けたThanksの改良版です。コンセプトの見直しからリファクタリング・UI/UXの改善などを重点的に行いました。",
      category: "hackathon",
      tags: ["Vue.js", "firebase", "vercel"],
      image: "/projects/project-thanks_x_chain.png",
      url: "https://thanks.jkotqmrr.com/",
      github: "https://github.com/namb0304/RSS_Hackathon_namelesz.git",
    },
    {
      title: "彦星浮気チェッカー",
      description: "（織姫が）一年に一度使いたいアプリとしてツクってアソぶハッカソンで開発した、彦星の浮気をチェックするアプリです。",
      category: "hackathon",
      tags: ["Google Apps Script", "LINE bot"],
      image: "/projects/project-hikoboshi.png",
      url: "https://script.google.com/macros/s/AKfycbzj4qgiIhltVS79ln_qPxhknENe1KD3Qa7Va4XBj-HInQssBK40rMfbedFWtmEdNvw/exec",
      github: "なし",
    },
    {
        title: "AIによる画像分析とSNS機能を統合したファッション共有・提案システム", 
        description: "2025年のゼミ合宿で開発した、AIを活用したファッションとSNSの融合サービスです。メイン機能の実装を担当しました。",
        category: "zemi",
        tags: ["php","python","AI"],
        image: "/projects/project-ai-fashion.png",
        url: "https://gms.gdl.jp/~nambo/sc2025-g3/general.html",
        github: "https://github.com/namb0304/sc2025-g3.git",
    },
    {
        title: "リアルタイムで電車の遅延情報を提供するモバイルアプリ",
        description: "未来創造プロジェクトの成果物として開発した、電車の遅延情報を提供するモバイルアプリです。",
        category: "hackathon",
        tags: ["expo","react native","firebase","Android Studio"],
        image: "/projects/project-future.png",
        url: "なし",
        github: "https://github.com/namb0304/TrainLiveInfo.git",
    },
    {
        title: "chrome拡張機能によるタブ管理ツール",
        description: "reactとfastapiとdockerの勉強のために開発したchrome拡張機能のタブ管理ツールです。",
        category: "personal",
        tags: ["開発","勉強","chrome拡張機能","react","fastapi","docker"],
        image: "/projects/project-chrome-extension.png",
        url: "なし",
        github: "https://github.com/namb0304/react-fastapi.app.git"
    }
    
  ],
  
  // タイムライン用のデータ
  timeline: [
    // === ここから追加データ ===
    {
      date: "2024年4月",
      title: "武蔵野大学 データサイエンス学部 入学",
      description: "データサイエンスとプログラミングの学習を本格的にスタートしました。",
      tags: ["大学"],
    },
    {
      date: "2024年6月",
      title: "Progateハッカソン powered by AWSに参加・企業賞受賞",
      description: "AWSの各種サービスを活用したアプリを開発し、企業賞を受賞しました。",
      tags: ["ハッカソン", "AWS", "受賞", "開発"],
    },
    {
      date: "2024年9月",
      title: "ゼミ合宿に参加",
      description: "初めてのゼミ合宿に参加し、PHPの基礎やWebアプリ開発の基礎を学びました。",
      tags: ["ゼミ", "大学", "開発"],
    },
    {
      date: "2024年9月",
      title: "未来創造プロジェクト開始",
      description: "この時期からゼミに所属し自分で研究テーマを決めて、後期の最後にポスター発表を行うプロジェクトがスタートしました。",
      tags: ["大学", "ゼミ"],
    },
    {
      date: "2025年1月",
      title: "未来創造プロジェクト \n ポスター発表・学科賞受賞",
      description: "未来創造プロジェクトの集大成として、学内でポスター発表を行い研究成果を発表しました。努力の末、学科賞を受賞しました。",
      tags: ["大学", "ゼミ", "受賞", "発表", "開発"],
    },
    {
      date: "2025年2月",
      title: "ツクってアソぶハッカソンに参加",
      description: "お題は「一年に一度だけ使いたいもの」。私たちは「彦星浮気チェッカー」を作りました。賞は取れませんでしたが、良い経験だったと思います。",
      tags: ["ハッカソン", "開発"],
    },
    {
      date: "2025年7月",
      title: "MUDSハッカソンに参加",
      description: "学部内で開催されたハッカソンに参加しました。モバイルオーダーのシステムを開発しました。賞は取れませんでしたが、チームで協力して開発できました。",
      tags: ["大学", "ハッカソン", "開発"],
    },
    {
        date: "2025年9月",
        title: "ゼミ合宿に参加",
        description: "2回目のゼミ合宿に参加し、AIを活用したファッションとSNSの融合サービスを開発しました。",
        tags: ["ゼミ", "AI", "開発"],
    },
    {
      date: "2025年9月",
      title: "RSS Hackathon 2025 Beyondに参加・奨励賞受賞",
      description: "「あたりまえの、その先へ」というコンセプトのハッカソンに参加し、感謝をつなげるSNSを実装して奨励賞を受賞しました。",
      tags: ["ハッカソン", "受賞", "開発"],
    },
    {
      date: "2025年9月",
      title: "ポートフォリオサイト制作・公開",
      description: "Next.js,Tailwind CSS,vercelなどを使用して、自身のポートフォリオサイトを制作・公開しました。",
      tags: ["開発"],
    },
    {
      date: "2025年11月",
      title: "技育展2025 予選会に参加",
      description: "RSS Hackathonで制作したThanksを改良し、技育展2025の予選会に参加しました。予選を通過することはできませんでしたが、納得のいく作品に仕上げることができました。",
      tags: ["ハッカソン", "開発"],
    },
    {
      date: "2025年11月",
      title: "実店舗向けモバイルオーダーシステム「Hirolia」共同開発 始動",
      description: "経営学部の友人に実際の店舗での運用を想定したモバイルオーダーシステムの実装を依頼され、同じ学部のメンバーと共同で設計・開発を開始しました。",
      tags: ["開発", "共同開発"],
    },
    {
      date: "2025年12月",
      title: "第2回MUDSハッカソンに参加",
      description: "学部内で開催された2回目のハッカソンに参加しました。「Hirolia」のプロトタイプを開発しました。賞は取れませんでしたがシステムの大枠を完成させることができました。",
      tags: ["開発", "共同開発", "ハッカソン","大学"],
    },

    // === ここまで追加データ ===
    ],
};

