"use client";

/**
 * Portfolio Home v3 — Person first. Evidence second.
 *
 * このサイトの主語は Hirolia ではなく **南保 俊輔**。
 * Hero の visual anchor は本人のポートレートで、Hirolia は「現在の1行」として添えるだけ。
 * Hirolia が主役になるのは Projects の featured に入ってから。
 *
 * 旧 Portfolio から残したもの: 顔写真 / 名前・大学・学年が即分かる / 自己紹介から始まる /
 *   Projects を画像で眺められる / Skills のアイコン / Activities の積み重ね / GitHub Activity
 * 旧 Portfolio から変えたもの: Skills を Projects より後ろへ / グラデーション文字の全廃 /
 *   巨大背景写真の廃止 / カードの均一サイズの廃止 / トグル類の廃止
 */
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaArrowRight, FaBars, FaGithub, FaTimes } from "react-icons/fa";
import Work from "./Work";
import {
  Activities,
  Contact,
  Experience,
  GitHubActivity,
  Skills,
} from "./Sections";
import { V3_SANS, v3Palette } from "./tokens";
import { academicStatus, v3Nav, v3Profile, v3Values } from "@/config/v3";

export default function HomeV3Base() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { grade, graduationYear } = academicStatus(v3Profile.entranceYear);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <div
      style={{ ...v3Palette, fontFamily: V3_SANS }}
      className="bg-[var(--v3-bg)] text-[var(--v3-fg)]"
    >
      {/* ================= Header ======================================== */}
      <header className="border-b border-[var(--v3-rule)] bg-[var(--v3-bg)]">
        <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-6 px-6 py-4 md:px-10">
          <a
            href="#base-about"
            className="flex items-baseline gap-3 rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--v3-accent)]"
          >
            <span className="whitespace-nowrap text-[16px] font-bold tracking-tight">
              南保 俊輔
            </span>
            <span className="hidden text-[11px] tracking-[0.1em] text-[var(--v3-fg-2)] sm:inline">
              {v3Profile.nameEn}
            </span>
          </a>

          <nav className="hidden lg:block" aria-label="メインナビゲーション">
            <ul className="flex items-center gap-7">
              {v3Nav.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="rounded text-[13px] text-[var(--v3-fg-2)] transition-colors hover:text-[var(--v3-fg)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--v3-accent)]"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="v3base-menu"
            aria-label={menuOpen ? "メニューを閉じる" : "メニューを開く"}
            className="rounded p-2 text-[var(--v3-fg)] transition-colors hover:text-[var(--v3-accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--v3-accent)] lg:hidden"
          >
            {menuOpen ? <FaTimes size={16} /> : <FaBars size={16} />}
          </button>
        </div>

        {menuOpen && (
          <nav
            id="v3base-menu"
            className="border-t border-[var(--v3-rule)] lg:hidden"
            aria-label="モバイルナビゲーション"
          >
            <ul className="mx-auto max-w-[1180px] px-6">
              {v3Nav.map((n) => (
                <li
                  key={n.href}
                  className="border-b border-[var(--v3-rule)]/70 last:border-b-0"
                >
                  <a
                    href={n.href}
                    onClick={() => setMenuOpen(false)}
                    className="block py-3.5 text-[15px] text-[var(--v3-fg-2)] focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--v3-accent)]"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </header>

      {/* ================= Hero / Profile ================================ */}
      {/* visual anchor は本人。Hirolia の画像はここには置かない。 */}
      <section id="base-about" className="scroll-mt-20">
        <div className="mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-x-14 gap-y-10 px-6 py-12 md:px-10 md:py-16 lg:grid-cols-[320px_minmax(0,1fr)]">
          {/* --- ポートレート --- */}
          <div className="relative w-[220px] sm:w-[260px] lg:w-full">
            {/* 写真の背後に主役色の面を少しずらして置く。額装のような扱い。 */}
            <div
              aria-hidden="true"
              className="absolute -bottom-4 -left-4 h-full w-full rounded-[10px] border border-[var(--v3-rule)] bg-[var(--v3-navy)]"
            />
            <div className="relative overflow-hidden rounded-[10px] border border-[var(--v3-rule)]">
              <div className="relative aspect-[4/5]">
                <Image
                  src={v3Profile.photo}
                  alt="南保 俊輔"
                  width={776}
                  height={776}
                  priority
                  className="h-full w-full object-cover object-top"
                />
              </div>
            </div>
          </div>

          {/* --- 名乗りと方向性 --- */}
          <div>
            <h1 className="text-[38px] font-bold leading-tight tracking-tight md:text-[46px]">
              {v3Profile.name}
            </h1>
            <p className="mt-2 text-[13px] tracking-[0.12em] text-[var(--v3-fg-2)]">
              {v3Profile.nameEn}
            </p>

            <p className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] text-[var(--v3-fg-2)]">
              <span>
                {v3Profile.university} {grade}年
              </span>
              <span aria-hidden="true" className="text-[var(--v3-rule)]">
                |
              </span>
              <span className="tabular-nums">{graduationYear}年3月卒業予定</span>
            </p>

            {/* ページ上で最も大きい「文」。人物の方向性がここで決まる。 */}
            <p className="mt-8 max-w-[34rem] text-[19px] font-medium leading-[1.85] md:text-[22px]">
              {v3Profile.statement}
            </p>

            {/* 主張を裏づける1行。Hirolia はここではこの扱いに留める。 */}
            <p className="mt-6 flex items-start gap-3 text-[14px] leading-7 text-[var(--v3-fg-2)]">
              <span className="relative mt-2.5 flex h-[7px] w-[7px] shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--v3-accent)] opacity-60" />
                <span className="relative inline-flex h-[7px] w-[7px] rounded-full bg-[var(--v3-accent)]" />
              </span>
              <span>{v3Profile.proof}</span>
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="#base-projects"
                className="group inline-flex items-center gap-2 rounded-[4px] bg-[var(--v3-fg)] px-6 py-3 text-[14px] font-semibold text-[var(--v3-bg)] transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--v3-accent)]"
              >
                つくったものを見る
                <FaArrowRight
                  size={11}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </a>
              <a
                href={v3Profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-[4px] border border-[var(--v3-rule)] px-6 py-3 text-[14px] text-[var(--v3-fg-2)] transition-colors hover:border-[var(--v3-fg-2)] hover:text-[var(--v3-fg)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--v3-accent)]"
              >
                <FaGithub size={15} />
                GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ================= What I Value =================================== */}
      {/* 「できること」ではなく「大切にしていること」。順序ではないので連番は振らない。 */}
      <section className="border-t border-[var(--v3-rule)] bg-[var(--v3-navy)]/25">
        <div className="mx-auto max-w-[1180px] px-6 py-16 md:px-10 md:py-20">
          <h2 className="text-[15px] font-bold tracking-tight text-[var(--v3-fg-2)]">
            仕事を選ぶときに、大切にしていること
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-x-12 gap-y-9 md:grid-cols-3">
            {v3Values.map((v) => (
              <div key={v.title} className="border-t-2 border-[var(--v3-accent)] pt-5">
                <h3 className="text-[17px] font-bold leading-snug tracking-tight md:text-[18px]">
                  {v.title}
                </h3>
                <p className="mt-3 text-[14px] leading-7 text-[var(--v3-fg-2)]">
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 以降は「裏づけ」 =============================== */}
      <Work />
      <Experience />
      <Skills />
      <Activities />
      <GitHubActivity />
      <Contact />

      <footer className="border-t border-[var(--v3-rule)] py-10">
        <div className="mx-auto max-w-[1180px] px-6 md:px-10">
          <p className="text-[11px] text-[var(--v3-fg-2)]">
            &copy; {new Date().getFullYear()} 南保 俊輔
          </p>
        </div>
      </footer>
    </div>
  );
}
