import { FaPython, FaReact, FaDocker, FaGitAlt, FaPhp } from 'react-icons/fa';
import { SiJavascript, SiFlask, SiFastapi, SiFirebase, SiTailwindcss } from 'react-icons/si';

// TypeScriptでデータの型を定義しておくと、入力ミスを防げます
export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  // プロフィール情報
  author: {
    name: "南保 俊輔",
    // affiliationは削除し、下のuniversityオブジェクトで管理します
    catchphrase: "人が使いやすく、使いたくなるサービスを創り続ける",
    bio: "開発が好きでWeb技術全般に興味があります。週末はハッカソンに参加したり、個人開発に時間を使っています。",
    email: "your.email@example.com",
    github: "https://github.com/your-username",
  },

  // ★★★ 学年計算のための大学情報 ★★★
  // ここに入学年度を入れるだけで、プロフィール部分の学年が自動で計算されます
  university: {
    name: "武蔵野大学 データサイエンス学部",
    entranceYear: 2024, // あなたの入学年度（西暦）
  },

  // スキルセット
  skills: [
    { name: 'Python', icon: FaPython },
    { name: 'JavaScript', icon: SiJavascript },
    { name: 'PHP', icon: FaPhp },
    { name: 'React', icon: FaReact },
    { name: 'Flask', icon: SiFlask },
    { name: 'FastAPI', icon: SiFastapi },
    { name: 'Git', icon: FaGitAlt },
    { name: 'Docker', icon: FaDocker },
    { name: 'Firebase', icon: SiFirebase },
    { name: 'Tailwind CSS', icon: SiTailwindcss },
  ],

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
      date: "2025年9月",
      title: "オープンソースプロジェクトに初コントリビュート",
      description: "関心のあるOSSのドキュメント翻訳で、初めてPull Requestがマージされました。",
      tags: ["OSS", "GitHub"],
    },
    {
      date: "2025年8月",
      title: "夏期インターンシップ参加",
      description: "Web開発企業での短期インターンシップに参加し、実務経験を積みました。",
      tags: ["インターン", "実務経験"],
    },
    {
      date: "2025年5月",
      title: "基本情報技術者試験 合格",
      description: "ITの基礎知識を体系的に学ぶため、国家資格である基本情報技術者試験に合格しました。",
      tags: ["資格", "学習"],
    },
    // === ここまで ===
    {
      date: "2025年3月",
      title: "ハッカソンで優秀賞を受賞",
      description: "「地域課題を解決する」をテーマにしたハッカソンで、チーム開発したアプリが優秀賞を受賞しました。",
      tags: ["ハッカソン", "チーム開発", "受賞"],
    },
    // === ここから追加データ ===
    {
      date: "2024年11月",
      title: "大学の開発サークルに参加",
      description: "学内の開発サークルに所属し、チームでのプロジェクト開発に携わるようになりました。",
      tags: ["大学", "チーム開発"],
    },
    // === ここまで ===
    {
      date: "2024年9月",
      title: "個人開発でWebアプリをリリース",
      description: "Python(Flask)とReactを学び、初めてのWebアプリケーションを個人で開発・公開しました。",
      tags: ["個人開発", "Webアプリ"],
    },
    {
      date: "2024年4月",
      title: "武蔵野大学 データサイエンス学部 入学",
      description: "データサイエンスとプログラミングの学習を本格的にスタートしました。",
      tags: ["大学"],
    },
    // === ここから追加データ ===
    {
      date: "2023年10月",
      title: "プログラミング学習を開始",
      description: "Pythonに触れたことをきっかけに、プログラミングの面白さに気づき、独学を始めました。",
      tags: ["学習開始"],
    },
    // === ここまで ===
  ],
};