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
import { usePointerLight, usePrefersReducedMotion } from "./motion";
import {
  Activities,
  Contact,
  Experience,
  GitHubActivity,
  Skills,
} from "./Sections";
import { V3_SANS, v3Palette } from "./tokens";
import { academicStatus, v3Nav, v3Profile, v3Values } from "@/config/v3";

export default function HomeV3() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("about");
  const [loaded, setLoaded] = useState(false);
  const reduced = usePrefersReducedMotion();
  const { grade, graduationYear } = academicStatus(v3Profile.entranceYear);

  // Hero の初回 reveal は1回だけ。スクロールのたびには再生しない。
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 40);
    return () => clearTimeout(t);
  }, []);

  // ポートレート背後の光と、わずかな視差のためのポインタ座標
  const hero = usePointerLight<HTMLDivElement>();

  /**
   * いま読んでいるセクションを nav に出す。
   * Design Lab のツールバーと混ざらないよう、サイト側の header をここで sticky にする。
   * 目印は短い下線と文字色だけ。pill 型のナビにはしない。
   */
  useEffect(() => {
    const ids = v3Nav.map((n) => n.href.replace("#", ""));
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit?.target.id) setActiveSection(hit.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

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
      <header className="sticky top-0 z-30 border-b border-[var(--v3-rule)]/70 bg-[var(--v3-bg)]/92 backdrop-blur-md">
        <div className="mx-auto flex h-[60px] max-w-[1180px] items-center justify-between gap-6 px-6 md:px-10">
          <a
            href="#about"
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
              {v3Nav.map((n) => {
                const on = activeSection === n.href.replace("#", "");
                return (
                  <li key={n.href}>
                    <a
                      href={n.href}
                      aria-current={on ? "true" : undefined}
                      className={`relative rounded py-1 text-[13px] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--v3-accent)] ${
                        on
                          ? "text-[var(--v3-fg)]"
                          : "text-[var(--v3-fg-2)] hover:text-[var(--v3-fg)]"
                      }`}
                    >
                      {n.label}
                      <span
                        aria-hidden="true"
                        className="absolute -bottom-0.5 left-0 h-px w-full origin-left bg-[var(--v3-accent)] transition-transform duration-300 ease-out"
                        style={{ transform: on ? "scaleX(1)" : "scaleX(0)" }}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="v3-menu"
            aria-label={menuOpen ? "メニューを閉じる" : "メニューを開く"}
            className="rounded p-2 text-[var(--v3-fg)] transition-colors hover:text-[var(--v3-accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--v3-accent)] lg:hidden"
          >
            {menuOpen ? <FaTimes size={16} /> : <FaBars size={16} />}
          </button>
        </div>

        {menuOpen && (
          <nav
            id="v3-menu"
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
      {/* visual anchor は本人。Hirolia の画像はここには置かない。
          顔は歪めない・回さない。奥行きは「層」と「光」だけで出す。 */}
      <section id="about" className="scroll-mt-24">
        <div
          ref={hero.ref}
          onPointerMove={hero.onPointerMove}
          onPointerLeave={hero.onPointerLeave}
          style={{ "--mx": "50%", "--my": "50%" } as React.CSSProperties}
          className="relative mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-x-14 gap-y-10 px-6 py-14 md:px-10 md:py-20 lg:grid-cols-[320px_minmax(0,1fr)]"
        >
          {/* ポインタに合わせてゆっくり寄る光。要素の内側にしか出ない。 */}
          {hero.active && (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-10"
              style={{
                background:
                  "radial-gradient(520px circle at var(--mx) var(--my), color-mix(in srgb, var(--v3-accent) 9%, transparent), transparent 70%)",
              }}
            />
          )}

          {/* --- ポートレート（3層: 奥の面 / 罫 / 写真） --- */}
          <div
            className="relative w-[220px] transition-all duration-[700ms] ease-out sm:w-[260px] lg:w-full"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded || reduced ? "none" : "translateY(10px)",
            }}
          >
            {/* 奥の面。ポインタと逆方向にごくわずかに動く＝視差。 */}
            <div
              aria-hidden="true"
              className="absolute -bottom-4 -left-4 h-full w-full rounded-[10px] border border-[var(--v3-rule)] bg-[var(--v3-navy)] transition-transform duration-[450ms] ease-out"
              style={
                hero.active
                  ? {
                      transform:
                        "translate3d(calc((var(--mx) - 50%) * -0.03), calc((var(--my) - 50%) * -0.03), 0)",
                    }
                  : undefined
              }
            />
            <div className="relative overflow-hidden rounded-[24px] ring-1 ring-[var(--v3-rule)]">
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
            <h1
              className="text-[38px] font-bold leading-tight tracking-tight transition-all duration-[600ms] ease-out md:text-[46px]"
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded || reduced ? "none" : "translateY(8px)",
                transitionDelay: "90ms",
              }}
            >
              {v3Profile.name}
            </h1>

            <div
              className="mt-2 flex items-center gap-4 transition-opacity duration-[600ms]"
              style={{ opacity: loaded ? 1 : 0, transitionDelay: "160ms" }}
            >
              <p className="text-[13px] tracking-[0.12em] text-[var(--v3-fg-2)]">
                {v3Profile.nameEn}
              </p>
              {/* motif の小さな出番。読み込み時に一度だけ引かれる短い線。 */}
              <span
                aria-hidden="true"
                className="h-px flex-1 max-w-[120px] origin-left bg-[var(--v3-accent)] transition-transform duration-[700ms] ease-out"
                style={{
                  transform: loaded ? "scaleX(1)" : "scaleX(0)",
                  transitionDelay: "280ms",
                }}
              />
            </div>

            <p
              className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] text-[var(--v3-fg-2)] transition-opacity duration-[600ms]"
              style={{ opacity: loaded ? 1 : 0, transitionDelay: "220ms" }}
            >
              <span>
                {v3Profile.university} {grade}年
              </span>
              <span aria-hidden="true" className="text-[var(--v3-rule)]">
                |
              </span>
              <span className="tabular-nums">{graduationYear}年3月卒業予定</span>
            </p>

            {/* ページ上で最も大きい文。目指している方向であって、現在の能力の主張ではない。 */}
            <p
              className="mt-7 max-w-[35rem] text-[19px] font-medium leading-[1.85] [word-break:auto-phrase] transition-all duration-[600ms] ease-out md:text-[23px]"
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded || reduced ? "none" : "translateY(8px)",
                transitionDelay: "280ms",
              }}
            >
              {v3Profile.statement}
            </p>

            <p
              className="mt-4 max-w-[33rem] text-[14px] leading-8 text-[var(--v3-fg-2)] [word-break:auto-phrase] transition-opacity duration-[600ms]"
              style={{ opacity: loaded ? 1 : 0, transitionDelay: "340ms" }}
            >
              {v3Profile.statementSub}
            </p>

            <p
              className="mt-6 flex items-start gap-3 border-l border-[var(--v3-rule)] pl-4 text-[14px] leading-7 text-[var(--v3-fg-2)] transition-opacity duration-[600ms]"
              style={{ opacity: loaded ? 1 : 0, transitionDelay: "400ms" }}
            >
              <span className="relative mt-2.5 flex h-[7px] w-[7px] shrink-0">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--v3-accent)] opacity-60 motion-safe:animate-ping" />
                <span className="relative inline-flex h-[7px] w-[7px] rounded-full bg-[var(--v3-accent)]" />
              </span>
              <span>{v3Profile.proof}</span>
            </p>

            <div
              className="mt-9 flex flex-wrap items-center gap-3 transition-opacity duration-[600ms]"
              style={{ opacity: loaded ? 1 : 0, transitionDelay: "460ms" }}
            >
              <a
                href="#projects"
                className="group inline-flex items-center gap-2.5 rounded-[10px] bg-[var(--v3-fg)] px-6 py-3 text-[14px] font-semibold text-[var(--v3-bg)] transition-opacity duration-200 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--v3-accent)]"
              >
                つくったものを見る
                <FaArrowRight
                  size={11}
                  className="transition-transform duration-200 ease-out group-hover:translate-x-1"
                />
              </a>
              <a
                href={v3Profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-[10px] border border-[var(--v3-rule)] px-6 py-3 text-[14px] text-[var(--v3-fg-2)] transition-colors duration-200 hover:border-[var(--v3-accent)]/60 hover:text-[var(--v3-fg)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--v3-accent)]"
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
      <section className="bg-[var(--v3-navy)]/30">
        <div className="mx-auto max-w-[1180px] px-6 py-20 md:px-10 md:py-24">
          <h2 className="text-[15px] font-bold tracking-tight text-[var(--v3-fg-2)]">
            仕事を選ぶときに、大切にしていること
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-x-12 gap-y-9 md:grid-cols-3">
            {v3Values.map((v) => (
              <div key={v.title} className="relative pl-5">
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-1.5 h-[calc(100%-0.75rem)] w-[2px] rounded-full bg-[var(--v3-accent)]/70"
                />
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
