import { title } from 'process';
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
  SiTypescript,
  SiSupabase,
  SiPostgresql, 
  SiSqlite,  
  SiFlutter,
} from 'react-icons/si';
// ↑↑↑ ここまで ↑↑↑

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  // --- プロフィール情報 (変更なし) ---
  author: {
    name: "南保 俊輔",
    nameEn: "Nambo Shunsuke", 
    catchphrase: "人が使いやすく、使いたくなるサービスを創り続ける",
    bio: "・開発が好きでWebアプリの技術全般に関心があり、休日はハッカソンに参加したり個人開発に時間を使っています。\n・フロントエンドやUI/UXに強い関心があり「人が使いやすく、使いたくなるサービス」を目指して開発しています。新しい技術を学んで実践することが好きでバックエンドやデータベースにも取り組んでいます。\n・将来的にはチームをリードできるフルスタックエンジニアを目指しています。",
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
        name: 'JavaScript',
        icon: SiJavascript,
        frameworks: ['React', 'Vue.js', 'Next.js']
      },
      {
        name: 'TypeScript',
        icon: SiTypescript,
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
      { name: 'Flutter', icon: SiFlutter },      // 修正: FaGitAlt -> SiFlutter
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
        description: "学部内ハッカソンで開発したモバイルオーダーシステムです。",
        category: "university",
        tags: ["Python", "Flask", "SQLite"],
        image: "/projects/project-mobaoru.png",
        url: "https://gms.gdl.jp/s_yugo2/general/explamation",
        github: "https://github.com/namb0304/ds_hakka.git"
    },
    {
      title: "Thanks",
      description: "RSS Hackathon 2025で開発した、感謝をつなげるSNSです。",
      category: "hackathon",
      tags: ["Vue.js", "firebase", "vercel"],
      image: "/projects/project-thanks.png",
      url: "https://rss-hackathon-namelesz-k1f8bbvz1-shunsukenambo-8040s-projects.vercel.app/",
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
        description: "ゼミ合宿で開発した、AIを活用したファッションとSNSの融合サービスです。主にフロントエンドを担当しました。",
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
        description: "reactとfastapiの勉強のために開発したchrome拡張機能のタブ管理ツールです。",
        category: "personal",
        tags: ["開発","勉強","chrome拡張機能","react","fastapi"],
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


    // === ここまで追加データ ===
    ],
};

