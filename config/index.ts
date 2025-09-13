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
    bio: "・開発が好きでWeb技術全般に関心があり、休日はハッカソンに参加したり個人開発に時間を使っています。\n・フロントエンドやUI/UXに強い関心があり「人が使いやすく、使いたくなるサービス」を目指して開発しています。新しい技術を学んで実践することが好きでバックエンドやデータベースにも取り組んでいます。\n・将来的にはチームをリードできるフルスタックエンジニアを目指しています。",
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
      description: "Next.jsとTailwind CSSで作成した、このサイトです。",
      category: "personal",
      tags: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
      image: "/images/project-portfolio.jpg",
      url: "#",
      github: "#",
    },
    {
      title: "AIアイデアソン優勝作品",
      description: "地域課題を解決するためのAI活用アイデアで優勝しました。",
      category: "hackathon",
      tags: ["企画", "プレゼン", "AI"],
      image: "/images/project-hackathon.jpg",
      url: "#",
      github: "#",
    },
    {
      title: "学内向けToDoアプリ",
      description: "FlaskとReactを使って作った、シンプルなToDo管理アプリです。",
      category: "webapp",
      tags: ["Flask", "React", "Python", "JavaScript"],
      image: "/images/project-todo.jpg",
      url: "#",
      github: "#",
    },
    // === ここから追加データ ===
    {
      title: "気象データ可視化ダッシュボード",
      description: "気象庁のAPIから取得したデータを、グラフで分かりやすく表示するWebアプリ。",
      category: "webapp",
      tags: ["React", "API", "Data Viz", "Chart.js"],
      image: "/images/project-weather.jpg",
      url: "#",
      github: "#",
    },
    {
      title: "読書記録管理アプリ",
      description: "読んだ本の感想や評価を記録できるシンプルなCRUDアプリケーション。",
      category: "personal",
      tags: ["Next.js", "Firebase", "CRUD"],
      image: "/images/project-booklog.jpg",
      url: "#",
      github: "#",
    },
    {
      title: "オンライン共同ホワイトボード",
      description: "WebSocketを使い、複数人がリアルタイムで描画できるホワイトボードを24時間で開発。",
      category: "hackathon",
      tags: ["WebSocket", "JavaScript", "チーム開発"],
      image: "/images/project-whiteboard.jpg",
      url: "#",
      github: "#",
    },
    {
      title: "映画レビュー感情分析",
      description: "映画レビューサイトの口コミを収集し、自然言語処理でポジティブ・ネガティブを判定するモデル。",
      category: "personal",
      tags: ["Python", "Machine Learning", "NLP"],
      image: "/images/project-sentiment.jpg",
      url: "#",
      github: "#",
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
      title: "未来創造プロジェクト開始",
      description: "この時期からゼミに所属し自分で研究テーマを決めて、後期の最後にポスター発表を行うプロジェクトがスタートしました。",
      tags: ["大学", "ゼミ"],
    },
    {
      date: "2025年1月",
      title: "未来創造プロジェクト ポスター発表・学科賞受賞",
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