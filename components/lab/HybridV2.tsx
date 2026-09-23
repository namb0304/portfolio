"use client";

/**
 * Hybrid v2 — Direction A 70% / Direction C 30%
 *
 * Aから: 見た瞬間のHero / 大胆な日本語タイポグラフィ / 非対称 / 実プロダクト画像を大きく /
 *        editorialな余白 / 温度のあるaccent
 * Cから: 「実際に運用されている」信頼感 / 素早く走査できる構造 / 稼働のmotif /
 *        Design→Build→Deploy→Operate / 罫線による精密さ
 * 捨てたもの: Cのダッシュボード的なパネル、01/02/03の多用、全セクション同じ幅・同じ罫線。
 *
 * 書体の役割分担:
 *   明朝(Shippori Mincho) = 本人の肉声。**2箇所だけ**（Heroの見出し / Hiroliaの一文）。
 *   ゴシック             = 本文・データ・UI のすべて。可読性を優先する。
 *
 * インタラクションは1箇所（Hiroliaのフェーズ切替）。
 * 触らなくても内容は全部読める（下のリストが常に全文出ている）。
 */
import Image from "next/image";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { OpsScreenMock, OrderScreenMock, SketchTag, StorePhotoMock } from "./Mocks";
import { JP_SANS } from "@/app/design-lab/fonts";
import {
  HIROLIA_SHOT,
  hybrid,
  labHirolia,
  labPhases,
  labProfile,
  labThankXChain,
} from "@/config/lab";

const palette = {
  "--paper": "#F2EDE4",
  "--ink": "#14110E",
  "--ink-raise": "#1D1916",
  "--rule": "#2E2822",
  "--fg": "#EDE7DC",
  "--fg-mute": "#A69C8D",
  "--saffron": "#E8991F",
} as React.CSSProperties;

/** フェーズごとの視覚。実画像があるものは実画像、ないものはスケッチ。 */
function PhaseVisual({ phase }: { phase: number }) {
  const key = labPhases[phase].key;

  if (key === "build") {
    return (
      <>
        <Image
          src={HIROLIA_SHOT}
          alt="店舗向けメニュー管理画面"
          width={2420}
          height={1340}
          className="h-full w-full object-cover object-top"
        />
        <SketchTag>前身プロダクトの画面／差し替え予定</SketchTag>
      </>
    );
  }
  if (key === "deploy") {
    return (
      <>
        <StorePhotoMock />
        <SketchTag>写真イメージ</SketchTag>
      </>
    );
  }
  if (key === "operate") {
    return (
      <>
        <OpsScreenMock />
        <SketchTag>画面イメージ</SketchTag>
      </>
    );
  }
  // design — メニュー構造は注文画面の形で見せるのが一番早い
  return (
    <>
      <div className="flex h-full w-full items-center justify-center bg-[var(--ink-raise)] px-6 py-5">
        <div className="h-full max-h-[300px] w-[168px] overflow-hidden rounded-[18px] border-[5px] border-[#2E2822]">
          <OrderScreenMock />
        </div>
        <div className="ml-7 hidden max-w-[260px] sm:block">
          <p className="text-[13px] leading-7 text-[var(--fg-mute)]">
            セット・トッピング・辛さ・表記ゆれを、
            どこまでデータ構造にして、どこから店舗の運用に任せるか。
            その線を実メニューを見ながら引き直した。
          </p>
        </div>
      </div>
      <SketchTag>画面イメージ</SketchTag>
    </>
  );
}

export default function HybridV2({ minchoClass }: { minchoClass: string }) {
  const [phase, setPhase] = useState(2); // 既定は Deploy（この人の分岐点）
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = useCallback((e: React.KeyboardEvent, i: number) => {
    const last = labPhases.length - 1;
    let n: number | null = null;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") n = i === last ? 0 : i + 1;
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") n = i === 0 ? last : i - 1;
    if (e.key === "Home") n = 0;
    if (e.key === "End") n = last;
    if (n !== null) {
      e.preventDefault();
      setPhase(n);
      tabRefs.current[n]?.focus();
    }
  }, []);

  return (
    <div
      style={{ ...palette, fontFamily: JP_SANS }}
      className="bg-[var(--ink)] text-[var(--fg)]"
    >
      {/* ================= Header ======================================== */}
      <header className="border-b border-[var(--rule)]">
        <div className="mx-auto flex max-w-[1320px] items-center justify-between px-7 py-4 xl:px-12">
          {/* 氏名はサイト全体でここ1回だけ */}
          <span className="whitespace-nowrap text-[17px] font-semibold tracking-[0.04em]">
            南保 俊輔
          </span>
          <nav className="flex items-center gap-8">
            {["Hirolia", "Work", "About"].map((n) => (
              <span
                key={n}
                className="hidden cursor-default text-[13px] text-[var(--fg-mute)] transition-colors hover:text-[var(--fg)] sm:inline"
              >
                {n}
              </span>
            ))}
            <Link
              href={hybrid.caseHref}
              className="whitespace-nowrap rounded-[3px] bg-[var(--saffron)] px-4 py-2 text-[13px] font-semibold text-[var(--ink)] transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--saffron)]"
            >
              Hirolia を見る
            </Link>
          </nav>
        </div>
      </header>

      {/* ================= Hero ========================================== */}
      <section className="mx-auto grid max-w-[1320px] grid-cols-1 items-center gap-x-16 gap-y-12 px-7 pt-10 pb-12 xl:px-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,560px)]">
        {/* --- 言葉 --- */}
        <div>
          <p className="text-[12px] leading-6 tracking-[0.04em] text-[var(--fg-mute)]">
            武蔵野大学 データサイエンス学部 3年
            <span className="ml-3 tabular-nums">2028年3月卒業</span>
          </p>

          {/* 明朝を使う1箇所目。3文を3行に割り、作る→入れる→続けるの時間を行で見せる。 */}
          <h1
            className={`${minchoClass} mt-6 text-[31px] font-semibold leading-[1.32] tracking-[0.02em] sm:text-[42px] md:text-[52px]`}
          >
            {hybrid.headline.map((line) => (
              <span key={line} className="block whitespace-nowrap">
                {line}
              </span>
            ))}
          </h1>

          <p className="mt-7 max-w-[30rem] text-[14px] leading-8 text-[var(--fg-mute)]">
            {hybrid.sub}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link
              href={hybrid.caseHref}
              className="rounded-[3px] bg-[var(--paper)] px-7 py-3 text-[14px] font-semibold text-[var(--ink)] transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--saffron)]"
            >
              何が起きたかを読む
            </Link>
            <a
              href={labProfile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-[3px] border border-[var(--rule)] px-7 py-3 text-[14px] text-[var(--fg-mute)] transition-colors hover:border-[var(--fg-mute)] hover:text-[var(--fg)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--saffron)]"
            >
              GitHub
            </a>
          </div>

          <p className="mt-8 border-l-2 border-[var(--saffron)] pl-4 text-[13px] leading-6 text-[var(--fg-mute)]">
            {hybrid.aside}
          </p>
        </div>

        {/* --- 製品の画。管理画面（大）の左端に注文画面（小）を差し込む非対称構図。
             スマホは枠の外側の余白に置き、管理画面の中身を隠さない。 --- */}
        <div className="pl-14 sm:pl-20">
          <div className="relative">
            <div className="overflow-hidden rounded-[6px] border border-[var(--rule)] bg-[var(--ink-raise)]">
              <div className="relative aspect-[16/9]">
                <Image
                  src={HIROLIA_SHOT}
                  alt="Hirolia の店舗向けメニュー管理画面"
                  width={2420}
                  height={1340}
                  priority
                  className="h-full w-full object-cover object-top"
                />
              </div>
            </div>

            {/* 来店客は自分のスマホで使う、という事実を重ねて出す */}
            <div className="absolute -bottom-5 -left-14 w-[150px] overflow-hidden rounded-[20px] border-[5px] border-[var(--rule)] bg-[var(--ink-raise)] shadow-[0_30px_70px_-18px_rgba(0,0,0,0.85)] sm:-left-20 sm:w-[168px]">
              <div className="relative aspect-[9/16]">
                <OrderScreenMock />
              </div>
            </div>
          </div>

          <p className="mt-9 text-[11px] leading-5 text-[var(--fg-mute)]">
            管理画面は前身プロダクトの実画面、注文画面は実装イメージ。
            どちらも Hirolia の実画面に差し替え予定。
          </p>
        </div>
      </section>

      {/* ================= 運用の帯（反転） ============================== */}
      {/* Cから採った走査レイヤー。ただし数値カードにはせず、伝票のような1本の帯にする。 */}
      <div className="bg-[var(--paper)] text-[var(--ink)]">
        <dl className="mx-auto flex max-w-[1320px] flex-col px-7 sm:flex-row sm:items-stretch xl:px-12">
          {hybrid.band.map((b) => (
            <div
              key={b.label}
              className="flex flex-1 items-baseline gap-3 border-b border-[#14110E]/12 py-3.5 sm:flex-col sm:items-start sm:gap-1 sm:border-b-0 sm:border-l sm:py-5 sm:pl-6 sm:first:border-l-0 sm:first:pl-0 last:border-b-0"
            >
              <dt className="w-16 shrink-0 text-[11px] text-[#14110E]/55 sm:w-auto">
                {b.label}
              </dt>
              <dd className="flex items-center gap-2 text-[15px] font-semibold tabular-nums tracking-[0.02em]">
                {"live" in b && b.live && (
                  <span className="relative flex h-[7px] w-[7px]">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--saffron)] opacity-70" />
                    <span className="relative inline-flex h-[7px] w-[7px] rounded-full bg-[var(--saffron)]" />
                  </span>
                )}
                {b.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* ================= Featured — Hirolia ============================ */}
      {/* リズムを変える: 幅を狭め、画像を主役にし、余白を詰める */}
      <section className="mx-auto max-w-[1180px] px-7 py-20 xl:px-10 md:py-24">
        <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
          <h2 className="text-[30px] font-semibold tracking-[0.02em] md:text-[36px]">
            {labHirolia.name}
          </h2>
          <p className="text-[14px] text-[var(--fg-mute)]">{labHirolia.what}</p>
        </div>

        {/* 明朝を使う2箇所目 */}
        <p
          className={`${minchoClass} mt-8 max-w-[24ch] text-[27px] font-medium leading-[1.62] tracking-[0.02em] md:text-[34px]`}
        >
          {hybrid.thesis}
        </p>

        {/* --- 切替（唯一のインタラクション） --- */}
        <div className="mt-12">
          <div
            role="tablist"
            aria-label="Hirolia の担当フェーズ"
            className="flex flex-wrap gap-x-1 gap-y-1 border-b border-[var(--rule)]"
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
                  id={`hy-tab-${p.key}`}
                  aria-controls="hy-stage"
                  aria-selected={on}
                  tabIndex={on ? 0 : -1}
                  onClick={() => setPhase(i)}
                  onFocus={() => setPhase(i)}
                  onKeyDown={(e) => onKeyDown(e, i)}
                  className={`relative -mb-px px-4 py-3 text-[14px] transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--saffron)] ${
                    on
                      ? "text-[var(--fg)]"
                      : "text-[var(--fg-mute)] hover:text-[var(--fg)]"
                  }`}
                >
                  <span className="font-semibold tracking-[0.02em]">{p.en}</span>
                  <span className="ml-2 text-[12px] opacity-70">{p.ja}</span>
                  <span
                    aria-hidden="true"
                    className={`absolute bottom-0 left-0 h-[2px] w-full bg-[var(--saffron)] transition-opacity ${
                      on ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* 画像を主役にする。ここがこのセクションで一番大きい面。 */}
          <div
            id="hy-stage"
            role="tabpanel"
            aria-labelledby={`hy-tab-${labPhases[phase].key}`}
            className="relative mt-7 overflow-hidden rounded-[6px] border border-[var(--rule)] bg-[var(--ink-raise)]"
          >
            <div className="relative h-[280px] md:h-[400px]">
              <PhaseVisual phase={phase} />
            </div>
          </div>
        </div>

        {/* --- 触らなくても全部読める。上の切替は画を変えるだけ。 --- */}
        <ol className="mt-10 border-t border-[var(--rule)]">
          {labPhases.map((p, i) => {
            const on = i === phase;
            return (
              <li
                key={p.key}
                className="grid grid-cols-1 gap-x-8 gap-y-1.5 border-b border-[var(--rule)] py-5 sm:grid-cols-[132px_minmax(0,1fr)]"
              >
                <p
                  className={`flex items-baseline gap-2 text-[13px] font-semibold tracking-[0.02em] transition-colors ${
                    on ? "text-[var(--saffron)]" : "text-[var(--fg)]"
                  }`}
                >
                  {p.en}
                  <span className="text-[11px] font-normal text-[var(--fg-mute)]">
                    {p.ja}
                  </span>
                </p>
                <p className="max-w-[54ch] text-[14px] leading-7 text-[var(--fg-mute)]">
                  {p.body}
                </p>
              </li>
            );
          })}
        </ol>

        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
          <Link
            href={hybrid.caseHref}
            className="rounded-[3px] bg-[var(--paper)] px-7 py-3 text-[14px] font-semibold text-[var(--ink)] transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--saffron)]"
          >
            Hirolia のケーススタディを読む
          </Link>
          <p className="text-[12px] leading-6 text-[var(--fg-mute)]">
            {labHirolia.team}・{labHirolia.since}
          </p>
        </div>
      </section>

      {/* ================= Thank x Chain ================================= */}
      {/* 3つ目のリズム: 紙に戻し、幅を一番狭くし、最も静かに置く */}
      <section className="bg-[var(--paper)] text-[var(--ink)]">
        <div className="mx-auto max-w-[880px] px-7 py-16 md:py-20">
          <div className="flex items-baseline justify-between border-b border-[#14110E]/15 pb-3">
            <h2 className="text-[15px] font-semibold tracking-[0.04em]">
              もうひとつ
            </h2>
            <span className="text-[12px] text-[#14110E]/50">
              Hirolia の前に作ったもの
            </span>
          </div>

          <article className="mt-8 grid grid-cols-1 gap-x-9 gap-y-6 sm:grid-cols-[minmax(0,1fr)_236px] sm:items-start">
            <div>
              <h3 className="text-[24px] font-semibold tracking-[0.02em]">
                {labThankXChain.name}
              </h3>
              <p className="mt-1.5 text-[13px] text-[#14110E]/60">
                {labThankXChain.what}
              </p>
              <p className="mt-5 max-w-[44ch] text-[15px] leading-8">
                {labThankXChain.hook}
              </p>
              <p className="mt-5 text-[12px] leading-6 text-[#14110E]/55">
                {labThankXChain.award}
              </p>
              <a
                href={labThankXChain.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-block rounded text-[13px] font-medium underline decoration-[#14110E]/25 underline-offset-[5px] transition-colors hover:decoration-[#14110E] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--saffron)]"
              >
                サービスを開く
              </a>
            </div>

            <div className="overflow-hidden rounded-[4px] border border-[#14110E]/15">
              <div className="relative aspect-[4/3]">
                <Image
                  src={labThankXChain.image}
                  alt="Thank x Chain の画面"
                  width={2940}
                  height={1662}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
