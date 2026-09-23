/**
 * Visual Spike 2026-09 — GitHub Activity は残す。ただし主役にしない。
 * 今回は GraphQL 内製化をせず、既存 GitHubActivity.tsx と同じ外部画像を流用。
 * 旧 GitHubActivity.tsx はそのまま残している。
 */
import Image from "next/image";
import Section from "./Section";
import { spikeProfile } from "@/config/spike";

const username = "namb0304";
const chartUrl = `https://ghchart.rshah.org/${username}?theme=onedark`;
const statsBase = "https://github-readme-stats.vercel.app";
const statsUrl = `${statsBase}/api?username=${username}&show_icons=true&count_private=true&theme=onedark&rank_icon=github&hide_border=true&bg_color=00000000`;
const langsUrl = `${statsBase}/api/top-langs/?username=${username}&layout=compact&theme=onedark&langs_count=8&hide_border=true&bg_color=00000000`;

export default function SpikeGitHub() {
  return (
    <Section
      id="github"
      eyebrow="GitHub Activity"
      title="手を動かしている量"
      weight="minor"
      lead="外部サービスのグラフをそのまま埋め込んでいます（今回は作り直していません）。"
    >
      <div className="max-w-3xl">
        <Image
          src={chartUrl}
          alt={`${username} のコントリビューショングラフ`}
          width={896}
          height={112}
          className="h-auto w-full opacity-90"
          unoptimized
        />

        <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-start">
          <Image
            src={statsUrl}
            alt="GitHub Stats"
            width={495}
            height={195}
            className="h-auto w-full max-w-[340px] opacity-90"
            unoptimized
          />
          <Image
            src={langsUrl}
            alt="よく使っている言語"
            width={350}
            height={195}
            className="h-auto w-full max-w-[300px] opacity-90"
            unoptimized
          />
        </div>

        <a
          href={spikeProfile.github}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-block rounded text-[13px] text-ink-3 underline underline-offset-4 transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          github.com/{username}
        </a>
      </div>
    </Section>
  );
}
