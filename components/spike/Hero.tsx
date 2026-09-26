/**
 * Visual Spike 2026-09 — Hero。
 * - 巨大背景画像は使わない（1画面目を情報に使う）
 * - 職種ラベル（Frontend-focused Product Engineer 等）は付けない
 * - CTA は2つまで
 */
import Link from "next/link";
import { FaArrowRight, FaGithub } from "react-icons/fa";
import { Container } from "./Section";
import { academicStatus, spikeProfile } from "@/config/spike";

export default function Hero() {
  const { grade, graduationYear } = academicStatus(spikeProfile.entranceYear);

  return (
    <section id="about" className="scroll-mt-16 pt-16 pb-20 md:pt-28 md:pb-28">
      <Container>
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3">
          {spikeProfile.university} {grade}年 / {graduationYear}年3月卒業予定（
          {graduationYear}卒）
        </p>

        <h1 className="mt-5 text-[32px] font-bold leading-tight tracking-tight text-ink md:text-[44px]">
          {spikeProfile.name}
          <span className="mt-2 block font-mono text-[13px] font-normal uppercase tracking-[0.14em] text-ink-3 md:mt-0 md:ml-4 md:inline">
            {spikeProfile.nameEn}
          </span>
        </h1>

        {/* ページ上で最も大きい文。ここが「何者か」の中心。 */}
        <p className="mt-10 max-w-3xl text-[22px] font-medium leading-[1.7] text-ink md:mt-12 md:text-[30px] md:leading-[1.65]">
          {spikeProfile.statement}
        </p>

        <p className="mt-8 max-w-2xl text-[15px] leading-8 text-ink-2">
          エンジニアとして働くことを考えています。いまは、
          実際に店舗で使われているプロダクトの開発と運用を続けながら、
          作ったものが現場で動き続ける状態までを自分の担当範囲として扱えるようにしている途中です。
        </p>

        {/* 「今も動いている」ことだけを accent で示す。色の用途はこれに限定。 */}
        <p className="mt-10 flex items-start gap-3 text-[14px] leading-7 text-ink-2">
          <span
            aria-hidden="true"
            className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
          />
          <span>{spikeProfile.currentFact}</span>
        </p>

        <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <Link
            href="/work/hirolia"
            className="group inline-flex items-center justify-center gap-2 rounded-md bg-ink px-6 py-3.5 text-[15px] font-semibold text-ground transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Hirolia の詳細を見る
            <FaArrowRight
              size={12}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>
          <a
            href={spikeProfile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-md border border-line px-6 py-3.5 text-[15px] font-medium text-ink-2 transition-colors hover:border-ink-3 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <FaGithub size={16} />
            GitHub
          </a>
        </div>
      </Container>
    </section>
  );
}
