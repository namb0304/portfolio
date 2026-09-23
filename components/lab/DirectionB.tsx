"use client";

/**
 * Direction B — Design Engineer / Interactive
 *
 * 狙い: 「動く ≠ 使われる」という本人の結論を、読ませるのではなく**操作させて分からせる**。
 *
 * 固有の判断:
 *  - サイト全体の signature interaction を「2つの状態を切り替える」に統一した。
 *      Hero      : 開発環境 ⇄ 店舗（同じビルドが、同じようには動かない）
 *      Featured  : Design / Build / Deploy / Operate の4状態
 *      Work      : Thanks（1度目）⇄ Thank x Chain（作り直した後）
 *    3箇所すべてが同じ操作の語彙になっている。これは本人の経験構造そのもの。
 *  - 色は基本モノクロ。**警告色は「店舗」状態に入ったときだけ現れる**。
 *    色を装飾ではなく状態の表現として使う。
 *  - pointer追従・3D・スクロール連動は使わない。操作は意味のあるものだけ。
 */
import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { BrowserFrame, Shot, ShotNote, ShotPlaceholder } from "./Frames";
import { JP_SANS } from "@/app/design-lab/fonts";
import {
  HIROLIA_SHOT,
  HIROLIA_SHOT_NOTE,
  labHirolia,
  labPhases,
  labProfile,
  labThankXChain,
} from "@/config/lab";

const palette = {
  "--lab-bg": "#0A0B0D",
  "--lab-panel": "#121519",
  "--lab-ink": "#E8EAED",
  "--lab-muted": "#868D96",
  "--lab-line": "#1D2127",
  "--lab-accent": "#FF6B3D",
} as React.CSSProperties;

/** 店舗状態で画面に重なる注記。開発環境では見えなかったもの。 */
const storePins = [
  { x: "16%", y: "26%", label: "店舗Wi-Fiが切れる" },
  { x: "62%", y: "48%", label: "端末とブラウザがばらばら" },
  { x: "34%", y: "74%", label: "実メニューはもっと複雑" },
];

export default function DirectionB() {
  const [mode, setMode] = useState<"dev" | "store">("dev");
  const isStore = mode === "store";

  const [phase, setPhase] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const onTabKeyDown = useCallback((e: React.KeyboardEvent, i: number) => {
    const last = labPhases.length - 1;
    let next: number | null = null;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = i === last ? 0 : i + 1;
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = i === 0 ? last : i - 1;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = last;
    if (next !== null) {
      e.preventDefault();
      setPhase(next);
      tabRefs.current[next]?.focus();
    }
  }, []);

  const active = labPhases[phase];

  return (
    <div
      style={{ ...palette, fontFamily: JP_SANS }}
      className="bg-[var(--lab-bg)] text-[var(--lab-ink)]"
    >
      {/* ===== Header ===================================================== */}
      <header className="sticky top-0 z-10 border-b border-[var(--lab-line)] bg-[var(--lab-bg)]/85 backdrop-blur">
        <div className="mx-auto flex max-w-[1120px] items-center justify-between px-6 py-4 md:px-10">
          <span className="text-[14px] font-semibold tracking-[-0.01em]">
            南保 俊輔
          </span>
          <nav className="flex items-center gap-6">
            {["Hirolia", "Work", "About"].map((n) => (
              <span
                key={n}
                className="group relative cursor-default text-[13px] text-[var(--lab-muted)] transition-colors hover:text-[var(--lab-ink)]"
              >
                {n}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-[var(--lab-ink)] transition-all duration-300 group-hover:w-full" />
              </span>
            ))}
            <Link
              href={labHirolia.href}
              className="rounded-md border border-[var(--lab-line)] px-3.5 py-1.5 text-[13px] text-[var(--lab-ink)] transition-colors hover:border-[var(--lab-muted)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--lab-accent)]"
            >
              Case study
            </Link>
          </nav>
        </div>
      </header>

      {/* ===== Hero ======================================================= */}
      <section className="border-b border-[var(--lab-line)]">
        <div className="mx-auto grid max-w-[1120px] grid-cols-1 gap-x-12 gap-y-12 px-6 py-14 md:px-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,460px)] lg:py-18">
          <div>
            <p className="text-[12px] tracking-[0.02em] text-[var(--lab-muted)]">
              {labProfile.meta}
            </p>

            <h1 className="mt-5 text-[34px] font-semibold leading-[1.3] tracking-[-0.025em] md:text-[44px] md:leading-[1.25]">
              動くものは、作れた。
              <br />
              <span
                className={
                  isStore
                    ? "text-[var(--lab-accent)] transition-colors duration-500"
                    : "text-[var(--lab-muted)] transition-colors duration-500"
                }
              >
                使われ続けるのは、別の話だった。
              </span>
            </h1>

            <p className="mt-6 max-w-[32rem] text-[14px] leading-7 text-[var(--lab-muted)]">
              飲食店向けモバイルオーダー「{labHirolia.name}」を5人チームで開発し、
              実店舗5店舗で動かしています。下のスイッチは、同じビルドが置かれる2つの環境です。
            </p>

            {/* --- signature interaction ------------------------------- */}
            <div
              role="radiogroup"
              aria-label="同じビルドが置かれる環境"
              className="mt-8 inline-flex rounded-lg border border-[var(--lab-line)] p-1"
            >
              {(
                [
                  ["dev", "開発環境"],
                  ["store", "店舗"],
                ] as const
              ).map(([key, label]) => {
                const on = mode === key;
                return (
                  <button
                    key={key}
                    type="button"
                    role="radio"
                    aria-checked={on}
                    onClick={() => setMode(key)}
                    className={`rounded-md px-5 py-2 text-[13px] font-medium transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--lab-accent)] ${
                      on
                        ? key === "store"
                          ? "bg-[var(--lab-accent)] text-[#180A04]"
                          : "bg-[var(--lab-ink)] text-[var(--lab-bg)]"
                        : "text-[var(--lab-muted)] hover:text-[var(--lab-ink)]"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            <p className="mt-4 h-10 max-w-[30rem] text-[13px] leading-6 text-[var(--lab-muted)]">
              {isStore
                ? "回線・端末・実メニュー・営業中という条件が全部乗る。開発環境では一度も出なかった問題がここから出た。"
                : "想定した操作をすれば、想定どおりに動く。ここまでは作れば終わる。"}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href={labHirolia.href}
                className="rounded-md bg-[var(--lab-ink)] px-5 py-2.5 text-[13px] font-semibold text-[var(--lab-bg)] transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--lab-accent)]"
              >
                何が起きたかを読む
              </Link>
              <a
                href={labProfile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-[var(--lab-line)] px-5 py-2.5 text-[13px] text-[var(--lab-muted)] transition-colors hover:border-[var(--lab-muted)] hover:text-[var(--lab-ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--lab-accent)]"
              >
                GitHub
              </a>
            </div>
          </div>

          {/* --- 同じ画面、2つの状態 --------------------------------- */}
          <div className="relative">
            <div
              className="relative transition-all duration-500"
              style={{
                filter: isStore ? "saturate(1.05)" : "saturate(0.55)",
              }}
            >
              <BrowserFrame
                label={isStore ? "店舗 / 営業中" : "localhost:5000"}
                className={
                  isStore
                    ? "border-[var(--lab-accent)]/45 transition-colors duration-500"
                    : "transition-colors duration-500"
                }
              >
                <div className="aspect-[16/10]">
                  <Shot
                    src={HIROLIA_SHOT}
                    alt="モバイルオーダーの画面（前身プロダクトの画面）"
                    width={2420}
                    height={1340}
                  />
                </div>

                {/* 店舗状態でだけ現れる注記 */}
                {storePins.map((p, i) => (
                  <span
                    key={p.label}
                    aria-hidden={!isStore}
                    className="pointer-events-none absolute flex items-center gap-2 transition-all duration-500"
                    style={{
                      left: p.x,
                      top: p.y,
                      opacity: isStore ? 1 : 0,
                      transform: isStore ? "translateY(0)" : "translateY(6px)",
                      transitionDelay: isStore ? `${120 + i * 110}ms` : "0ms",
                    }}
                  >
                    <span className="h-2 w-2 shrink-0 rounded-full bg-[var(--lab-accent)] ring-4 ring-[var(--lab-accent)]/20" />
                    <span className="whitespace-nowrap rounded bg-[#0A0B0D]/85 px-2 py-1 text-[10px] text-[var(--lab-ink)] backdrop-blur-sm">
                      {p.label}
                    </span>
                  </span>
                ))}
              </BrowserFrame>
            </div>
            <ShotNote>{HIROLIA_SHOT_NOTE}</ShotNote>
          </div>
        </div>
      </section>

      {/* ===== Featured — Hirolia ========================================= */}
      <section className="border-b border-[var(--lab-line)]">
        <div className="mx-auto max-w-[1120px] px-6 py-16 md:px-10 md:py-20">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h2 className="text-[26px] font-semibold tracking-[-0.02em] md:text-[32px]">
              {labHirolia.name}
              <span className="ml-3 text-[14px] font-normal text-[var(--lab-muted)]">
                {labHirolia.what}
              </span>
            </h2>
            <p className="flex items-center gap-2 text-[13px] text-[var(--lab-muted)]">
              <span className="h-[6px] w-[6px] rounded-full bg-[var(--lab-accent)]" />
              {labHirolia.live} ・ {labHirolia.team}
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-8 lg:grid-cols-[220px_minmax(0,1fr)]">
            {/* --- 4フェーズの選択 --- */}
            <div
              role="tablist"
              aria-label="担当フェーズ"
              aria-orientation="vertical"
              className="flex flex-row gap-1 overflow-x-auto lg:flex-col lg:overflow-visible"
            >
              {labPhases.map((p, i) => {
                const on = i === phase;
                return (
                  <button
                    key={p.key}
                    ref={(el) => {
                      tabRefs.current[i] = el;
                    }}
                    role="tab"
                    id={`b-tab-${p.key}`}
                    aria-selected={on}
                    aria-controls={`b-panel-${p.key}`}
                    tabIndex={on ? 0 : -1}
                    onClick={() => setPhase(i)}
                    onMouseEnter={() => setPhase(i)}
                    onFocus={() => setPhase(i)}
                    onKeyDown={(e) => onTabKeyDown(e, i)}
                    className={`group relative shrink-0 rounded-md px-4 py-3 text-left transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--lab-accent)] ${
                      on
                        ? "bg-[var(--lab-panel)] text-[var(--lab-ink)]"
                        : "text-[var(--lab-muted)] hover:text-[var(--lab-ink)]"
                    }`}
                  >
                    {/* 選択中を示す1本の線。lg以外では下線になる */}
                    <span
                      aria-hidden="true"
                      className={`absolute bottom-0 left-0 h-[2px] w-full transition-opacity duration-200 lg:bottom-auto lg:left-0 lg:top-0 lg:h-full lg:w-[2px] ${
                        on ? "opacity-100" : "opacity-0"
                      }`}
                      style={{
                        background:
                          "live" in p && p.live
                            ? "var(--lab-accent)"
                            : "var(--lab-ink)",
                      }}
                    />
                    <span className="block text-[13px] font-semibold tracking-[-0.01em]">
                      {p.en}
                    </span>
                    <span className="mt-0.5 block text-[11px] opacity-70">
                      {p.ja}
                      {"live" in p && p.live && (
                        <span className="ml-1.5 text-[var(--lab-accent)]">
                          ● 継続中
                        </span>
                      )}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* --- 対応する画面と説明 --- */}
            <div
              role="tabpanel"
              id={`b-panel-${active.key}`}
              aria-labelledby={`b-tab-${active.key}`}
              key={active.key}
              className="animate-[labFade_360ms_ease-out]"
            >
              {active.shot.kind === "image" ? (
                <>
                  <BrowserFrame label={active.shot.label}>
                    <div className="aspect-[16/9]">
                      <Shot
                        src={HIROLIA_SHOT}
                        alt={active.shot.label}
                        width={2420}
                        height={1340}
                      />
                    </div>
                  </BrowserFrame>
                  <ShotNote>{HIROLIA_SHOT_NOTE}</ShotNote>
                </>
              ) : (
                <ShotPlaceholder
                  label={active.shot.label}
                  hint="この状態を1枚で見せられる画像に差し替える"
                  ratio="aspect-[16/9]"
                />
              )}

              <p className="mt-6 max-w-[38rem] text-[15px] leading-8">
                {active.body}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Secondary — Thank x Chain ================================== */}
      <section>
        <div className="mx-auto max-w-[1120px] px-6 py-16 md:px-10 md:py-20">
          <p className="text-[12px] tracking-[0.02em] text-[var(--lab-muted)]">
            Selected work
          </p>

          {/* Hero と同じ「2つの状態」の語彙。hover / focus で1度目の結果が出る */}
          <article className="group mt-5 grid max-w-[760px] grid-cols-1 items-start gap-6 rounded-xl border border-[var(--lab-line)] p-5 transition-colors duration-300 hover:border-[var(--lab-muted)]/60 focus-within:border-[var(--lab-muted)]/60 sm:grid-cols-[240px_minmax(0,1fr)]">
            <div className="relative overflow-hidden rounded-lg border border-[var(--lab-line)]">
              <div className="aspect-[16/10]">
                <Shot
                  src={labThankXChain.image}
                  alt="Thank x Chain のトップ画面"
                  width={2940}
                  height={1662}
                  className="transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </div>
            </div>

            <div>
              <div className="flex items-baseline gap-2.5">
                <h3 className="text-[19px] font-semibold tracking-[-0.01em]">
                  {labThankXChain.after}
                </h3>
                <span className="text-[12px] text-[var(--lab-muted)]">
                  {labThankXChain.what}
                </span>
              </div>

              {/* 1度目の結果は、触れたときに出る */}
              <div className="mt-3 grid grid-rows-[0fr] transition-all duration-[400ms] group-hover:grid-rows-[1fr] group-focus-within:grid-rows-[1fr]">
                <div className="overflow-hidden">
                  <p className="pb-3 text-[12px] leading-6 text-[var(--lab-accent)]">
                    1度目：{labThankXChain.before} — 投稿はされたが、狙っていた「次の人へ渡る」行動が起きなかった。
                  </p>
                </div>
              </div>

              <p className="text-[14px] leading-7 text-[var(--lab-muted)]">
                {labThankXChain.hook}
              </p>

              <a
                href={labThankXChain.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block rounded text-[13px] text-[var(--lab-ink)] underline decoration-[var(--lab-line)] underline-offset-4 transition-colors hover:decoration-[var(--lab-muted)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--lab-accent)]"
              >
                サービスを開く
              </a>
            </div>
          </article>
          <p className="mt-3 text-[11px] text-[var(--lab-muted)]">
            ↑ カードに触れると、1度目に何が起きたかが出ます
          </p>
        </div>
      </section>
    </div>
  );
}
