/**
 * 技術アイコンとブランド色の対応表。
 * Skills と Project Card の両方から参照する（§8: 軽い連携）。
 * 静止時は無彩色、hover でその技術の色だけ戻す、という扱いを両方で揃えるため。
 */
import type { IconType } from "react-icons";
import {
  SiBetterstack,
  SiCloudinary,
  SiDocker,
  SiExpo,
  SiFastapi,
  SiFirebase,
  SiFlask,
  SiGithubactions,
  SiGoogleappsscript,
  SiNextdotjs,
  SiPhp,
  SiPostgresql,
  SiReact,
  SiRender,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiVuedotjs,
} from "react-icons/si";

export const TECH: Record<string, { Icon: IconType; brand: string; label: string }> = {
  flask: { Icon: SiFlask, brand: "#E8EDF3", label: "Python / Flask" },
  postgres: { Icon: SiPostgresql, brand: "#5A9FD4", label: "PostgreSQL" },
  render: { Icon: SiRender, brand: "#B6C4D6", label: "Render" },
  actions: { Icon: SiGithubactions, brand: "#5B8CE0", label: "GitHub Actions" },
  betterstack: { Icon: SiBetterstack, brand: "#8FD4A8", label: "Better Stack" },
  cloudinary: { Icon: SiCloudinary, brand: "#5A9FD4", label: "Cloudinary" },
  ts: { Icon: SiTypescript, brand: "#5A9FD4", label: "TypeScript" },
  react: { Icon: SiReact, brand: "#61DAFB", label: "React" },
  next: { Icon: SiNextdotjs, brand: "#E8EDF3", label: "Next.js" },
  vue: { Icon: SiVuedotjs, brand: "#67C79B", label: "Vue.js" },
  firebase: { Icon: SiFirebase, brand: "#E0A93F", label: "Firebase" },
  tailwind: { Icon: SiTailwindcss, brand: "#4FC3D9", label: "Tailwind CSS" },
  fastapi: { Icon: SiFastapi, brand: "#4FAE8E", label: "FastAPI" },
  docker: { Icon: SiDocker, brand: "#5A9FD4", label: "Docker" },
  php: { Icon: SiPhp, brand: "#8C93C4", label: "PHP" },
  expo: { Icon: SiExpo, brand: "#E8EDF3", label: "React Native / Expo" },
  gas: { Icon: SiGoogleappsscript, brand: "#6FA8E0", label: "Google Apps Script" },
  vercel: { Icon: SiVercel, brand: "#E8EDF3", label: "Vercel" },
};
