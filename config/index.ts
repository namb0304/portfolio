import { FaPython, FaReact, FaDocker, FaGitAlt, FaPhp } from 'react-icons/fa';
import { SiJavascript, SiFlask, SiFastapi, SiFirebase, SiTailwindcss } from 'react-icons/si';

// TypeScriptでデータの型を定義しておくと、入力ミスを防げます
export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  // プロフィール情報
    author: {
    name: "南保 俊輔",
    affiliation: "武蔵野大学 データサイエンス学部 2年",
    catchphrase: "人が使いやすく、使いたくなるサービスを創り続ける",
    bio: "開発が好きでWeb技術全般に興味があります。週末はハッカソンに参加したり、個人開発に時間を使っています。",
    email: "your.email@example.com",
    github: "https://github.com/your-username",
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

  // 作品リスト (今後追加)
  projects: [
    {
      title: "ポートフォリオサイト",
      description: "Next.jsとTailwind CSSで作成した、このサイトです。",
      category: "personal", // カテゴリーを追加
      tags: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
      image: "/images/project-portfolio.jpg", // ダミー画像パス
      url: "https://your-portfolio.com",
      github: "https://github.com/your-username/portfolio",
    },
    {
      title: "AIアイデアソン優勝作品",
      description: "地域課題を解決するためのAI活用アイデアで優勝しました。",
      category: "hackathon",
      tags: ["企画", "プレゼン", "AI"],
      image: "/images/project-hackathon.jpg",
      url: "https://example.com/hackathon",
      github: "https://github.com/your-username/hackathon-idea",
    },
    {
      title: "学内向けToDoアプリ",
      description: "FlaskとReactを使って作った、シンプルなToDo管理アプリです。",
      category: "webapp",
      tags: ["Flask", "React", "Python", "JavaScript"],
      image: "/images/project-todo.jpg",
      url: "https://example.com/todo-app",
      github: "https://github.com/your-username/todo-app",
    },
    {
      title: "データ分析課題",
      description: "大学の授業で取り組んだ、統計データ分析のレポート。",
      category: "personal",
      tags: ["Python", "Pandas", "Matplotlib"],
      image: "/images/project-data.jpg",
      url: "https://example.com/data-analysis",
      github: "https://github.com/your-username/data-analysis",
    }
  ]
};