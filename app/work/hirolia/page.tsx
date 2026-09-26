/**
 * Hirolia — ケーススタディ。
 *
 * Home との役割分担:
 *   Home  … 要点とフック。何をしている人かが短時間で分かる
 *   ここ  … 具体・判断・実装・運用・学び。長文を落ち着いて読むページ
 *
 * なので Home の演出（Arch Trail / Rail / 近接反応 / scrollytelling）は
 * 一切持ち込まない。色・字・余白・ヘッダーだけ Home と揃え、
 * 中身は「読み物」として組む。本文幅も Home の 1180px ではなく
 * 42rem（約672px）に抑えている。
 *
 * 事実はすべて config/spike.ts の hirolia から取る。ここで発明しない。
 */
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { FaArrowLeft, FaArrowUpRightFromSquare } from "react-icons/fa6";
import SectionNav from "@/components/work/SectionNav";
import { V3_SANS, v3Palette } from "@/components/lab/v3/tokens";
import { hirolia } from "@/config/spike";
import { OG_IMAGE, SITE_NAME } from "@/config/site";

const DESCRIPTION =
  "飲食店向けモバイルオーダー「Hirolia」のケーススタディ。5人チームでの開発で、注文画面・メニュー管理画面・APIの実装とDB設計、本番運用を担当しました。導入後に出た問題と、その改善までを書いています。";

export const metadata: Metadata = {
  title: { absolute: "Hirolia｜南保 俊輔 ポートフォリオ" },
  description: DESCRIPTION,
  alternates: { canonical: "/work/hirolia" },
  /* layout の openGraph はページ側の指定で置き換わるので、共有画像もここに書く */
  openGraph: {
    type: "article",
    locale: "ja_JP",
    siteName: SITE_NAME,
    images: [OG_IMAGE],
    url: "/work/hirolia",
    title: "Hirolia｜南保 俊輔 ポートフォリオ",
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    images: [OG_IMAGE.url],
    title: "Hirolia｜南保 俊輔 ポートフォリオ",
    description: DESCRIPTION,
  },
};

/**
 * Home の場所。URL をページ内に散らさないための 1 箇所。
 * このページからの「戻る」はすべてここを起点にする。
 */
const HOME = "/";
const BACK = { href: `${HOME}#projects`, label: "Projects へ戻る" };

/**
 * Hirolia の公開ページ。来店客が QR から入る注文システムと同じドメインだが、
 * ルートはサービスの紹介ページ。ここは「サービスを見る」ための導線で、
 * このページ自体を本人が作ったわけではない。
 */
const SERVICE_URL = "https://hirolia-order.com";

/** 目次。実際のセクションと 1:1 で持つ。日本語で統一する。 */
const TOC = [
  { id: "context", label: "背景と課題" },
  { id: "role", label: "担当範囲" },
  { id: "operation", label: "導入後に出た問題" },
  { id: "challenges", label: "判断と実装" },
  { id: "current", label: "現在の状況" },
  { id: "learning", label: "学び" },
  { id: "tech", label: "使用技術" },
];

/**
 * 導入までの経過。大きな Timeline は作らず、現状の近くに短く置くだけにする。
 * ここは config の期間表記と Activities の記録が出どころ。
 */
const TIMELINE = [
  { when: "2025年11月", what: "要件定義・仕様整理・設計開始" },
  { when: "2025年12月", what: "実装開始" },
  { when: "2026年4月", what: "1店舗目へ試験導入" },
  { when: "2026年7月", what: "1店舗目が正式な有料契約へ移行" },
  { when: "2026年9月", what: "本契約4店舗で運用中", now: true },
];

/** 本文の器。長文を読むページなので、Home より内側に寄せる。 */
function Wrap({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[900px] px-6 md:px-8 ${className}`}>
      {children}
    </div>
  );
}

/**
 * 章。連番も英字ラベルも置かない。
 * 旧版はここが `01 / Overview` の等幅大文字で、資料っぽさの主因だった。
 */
function Chapter({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-[124px] border-t border-[var(--v3-rule)] py-14 md:py-18"
    >
      <Wrap>
        <h2 className="text-[21px] font-bold tracking-tight text-[var(--v3-fg)] md:text-[26px]">
          {title}
        </h2>
        <div className="mt-8">{children}</div>
      </Wrap>
    </section>
  );
}

/** 本文の段落。15px / 行間 32px を通す。 */
function P({ children }: { children: ReactNode }) {
  return (
    <p className="max-w-[42rem] text-[15px] leading-8 text-[var(--v3-fg-2)] [word-break:auto-phrase]">
      {children}
    </p>
  );
}

export default function HiroliaCaseStudy() {
  return (
    <div
      style={{ ...v3Palette, fontFamily: V3_SANS }}
      className="min-h-screen bg-[var(--v3-bg)] text-[var(--v3-fg)]"
    >
      {/*
        ヘッダーは Home と同じ高さ・同じ罫・同じ背景。
        ただし詳細ページなので項目は絞り、すべて Home へ戻る導線にする。
      */}
      <header className="sticky top-0 z-30 border-b border-[var(--v3-rule)]/70 bg-[var(--v3-bg)]/92 backdrop-blur-md">
        <div className="mx-auto flex h-[60px] max-w-[900px] items-center justify-between gap-6 px-6 md:px-8">
          <Link
            href="/"
            className="flex items-baseline gap-3 rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--v3-accent)]"
          >
            <span className="whitespace-nowrap text-[16px] font-bold tracking-tight">
              南保 俊輔
            </span>
            <span className="hidden text-[11px] tracking-[0.1em] text-[var(--v3-fg-2)] sm:inline">
              Shunsuke Nambo
            </span>
          </Link>

          <nav aria-label="サイト内ナビゲーション">
            <ul className="flex items-center gap-5 sm:gap-7">
              {[
                { href: `${HOME}#projects`, label: "Projects" },
                { href: `${HOME}#about`, label: "About" },
                { href: `${HOME}#contact`, label: "Contact" },
              ].map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    className="rounded py-1 text-[13px] text-[var(--v3-fg-2)] transition-colors duration-200 hover:text-[var(--v3-fg)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--v3-accent)]"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      {/* ヘッダー直下の章ナビ。冒頭の目次はこれに置き換えたので二重に出さない。 */}
      <SectionNav items={TOC} />

      <article className="pb-20">
        {/* ===== 冒頭 =====================================================
            旧版は Overview / Role / Impact に同じ事実が散っていた。
            「何のサービスか・チーム・自分の担当・現在・期間」はここに集約し、
            本文は背景と課題から始める。 */}
        <header className="pt-10 pb-14 md:pt-14 md:pb-16">
          <Wrap>
            <Link
              href={BACK.href}
              className="inline-flex items-center gap-2 rounded text-[13px] text-[var(--v3-fg-2)] transition-colors duration-200 hover:text-[var(--v3-fg)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--v3-accent)]"
            >
              <FaArrowLeft size={11} aria-hidden="true" />
              {BACK.label}
            </Link>

            <h1 className="mt-9 text-[34px] font-bold tracking-tight text-[var(--v3-fg)] md:text-[46px]">
              {hirolia.name}
            </h1>
            <p className="mt-3 text-[16px] leading-8 text-[var(--v3-fg-2)] md:text-[18px]">
              {hirolia.tagline}
            </p>

            {/*
              概要・事実・実画面をひとまとめにする。旧版は Overview / Role / Impact に
              同じ事実が散っていたので、ここへ集約して本文は課題から始める。
              画面は自分が実装した来店客向けの注文画面。
            */}
            <div className="mt-10 flex flex-col gap-10 sm:flex-row sm:items-start sm:gap-12">
              <div className="min-w-0 flex-1">
                <div className="space-y-5">
                  <P>{hirolia.overview[0]}</P>
                  <P>{hirolia.overview[1]}</P>
                </div>

                {/*
                  サービスそのものを見るための導線。制作物へのリンクではない。
                */}
                <a
                  href={SERVICE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 inline-flex items-center gap-2 rounded-[10px] border border-[var(--v3-rule)] px-4 py-2.5 text-[14px] text-[var(--v3-fg)] transition-colors duration-200 hover:border-[var(--v3-accent)]/60 hover:text-[var(--v3-accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--v3-accent)]"
                >
                  サービスサイトを見る
                  <FaArrowUpRightFromSquare size={11} aria-hidden="true" />
                  <span className="sr-only">（外部サイト・新しいタブで開く）</span>
                </a>

                <dl className="mt-8 border-t border-[var(--v3-rule)]">
                  {hirolia.facts.map((f) => (
                    <div
                      key={f.label}
                      className="grid grid-cols-1 gap-x-6 border-b border-[var(--v3-rule)] py-3.5 sm:grid-cols-[7rem_minmax(0,1fr)]"
                    >
                      <dt className="text-[12px] leading-7 text-[var(--v3-fg-2)]">
                        {f.label}
                      </dt>
                      <dd className="text-[15px] leading-7 text-[var(--v3-fg)] [word-break:auto-phrase]">
                        {f.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <figure className="mx-auto w-[200px] shrink-0 sm:mx-0 sm:w-[236px] lg:w-[252px]">
                <div className="overflow-hidden rounded-[14px] border border-[var(--v3-rule)] bg-[var(--v3-surface)]">
                  <Image
                    src="/projects/hirolia-order.png"
                    alt="Hirolia の注文画面。来店客が自分の端末でメニューを選び、注文する。"
                    width={792}
                    height={1628}
                    sizes="(min-width: 1024px) 252px, (min-width: 640px) 236px, 200px"
                    className="h-auto w-full"
                  />
                </div>
                <figcaption className="mt-3 text-[12px] leading-6 text-[var(--v3-fg-2)]">
                  来店客向け注文画面 / UI 実装を担当
                </figcaption>
              </figure>
            </div>

          </Wrap>
        </header>

        {/* ===== 背景と課題 ============================================== */}
        <Chapter id="context" title="背景と課題">
          <p className="max-w-[42rem] text-[16px] leading-8 text-[var(--v3-fg)] [word-break:auto-phrase]">
            {hirolia.context.lead}
          </p>
          <ul className="mt-7 max-w-[42rem] border-t border-[var(--v3-rule)]">
            {hirolia.context.points.map((p) => (
              <li
                key={p}
                className="border-b border-[var(--v3-rule)] py-3.5 text-[15px] leading-7 text-[var(--v3-fg-2)] [word-break:auto-phrase]"
              >
                {p}
              </li>
            ))}
          </ul>
          <p className="mt-7 max-w-[42rem] text-[14px] leading-8 text-[var(--v3-fg-2)] [word-break:auto-phrase]">
            {hirolia.context.caveat}
          </p>
        </Chapter>

        {/* ===== 担当範囲 ================================================ */}
        <Chapter id="role" title="担当範囲">
          <div className="grid grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-14 md:gap-y-0">
            <div>
              <h3 className="text-[13px] font-bold tracking-[0.02em] text-[var(--v3-fg)]">
                担当した
              </h3>
              <ul className="mt-4 space-y-2.5">
                {hirolia.role.mine.map((r) => (
                  <li key={r} className="flex gap-3.5">
                    <span
                      aria-hidden="true"
                      className="mt-[11px] h-px w-3.5 shrink-0 bg-[var(--v3-accent)]/70"
                    />
                    <span className="text-[15px] leading-7 text-[var(--v3-fg)] [word-break:auto-phrase]">
                      {r}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-[13px] font-bold tracking-[0.02em] text-[var(--v3-fg-2)]">
                担当していない
              </h3>
              <ul className="mt-4 space-y-2.5">
                {hirolia.role.notMine.map((r) => (
                  <li key={r} className="flex gap-3.5">
                    <span
                      aria-hidden="true"
                      className="mt-[11px] h-px w-3.5 shrink-0 bg-[var(--v3-rule)]"
                    />
                    <span className="text-[15px] leading-7 text-[var(--v3-fg-2)] [word-break:auto-phrase]">
                      {r}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Chapter>

        {/* ===== 導入後に出た問題 =========================================
            旧版はここが6段階あり、後半が Challenges と重複していた。
            ここは橋渡しに徹し、具体は次章へ渡す。 */}
        <Chapter id="operation" title="導入後に出た問題">
          <ol className="max-w-[42rem] space-y-6">
            {hirolia.buildToOperation.slice(0, 3).map((b) => (
              <li key={b.stage} className="flex gap-4">
                <span
                  aria-hidden="true"
                  className="mt-[13px] h-px w-5 shrink-0 bg-[var(--v3-rule)]"
                />
                <div className="min-w-0">
                  <p className="text-[15px] font-semibold text-[var(--v3-fg)]">
                    {b.stage}
                  </p>
                  <p className="mt-1.5 text-[15px] leading-8 text-[var(--v3-fg-2)] [word-break:auto-phrase]">
                    {b.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-8 max-w-[42rem] text-[15px] leading-8 text-[var(--v3-fg)] [word-break:auto-phrase]">
            {hirolia.buildToOperation[3].body}
          </p>
        </Chapter>

        {/* ===== 判断と実装 ==============================================
            このページで一番読まれる想定の章。削らない。 */}
        <Chapter id="challenges" title="判断と実装">
          <div className="space-y-14">
            {hirolia.challenges.map((c) => (
              <div key={c.title}>
                <h3 className="text-[17px] font-bold leading-[1.5] tracking-tight text-[var(--v3-fg)] [word-break:auto-phrase] md:text-[19px]">
                  {c.title}
                </h3>
                <dl className="mt-6 border-t border-[var(--v3-rule)]">
                  {[
                    ["何が問題だったか", c.problem],
                    ["どう判断して、どう実装したか", c.action],
                    ["いまどうなっているか", c.result],
                  ].map(([label, body]) => (
                    <div
                      key={label}
                      className="grid grid-cols-1 gap-x-8 gap-y-2 border-b border-[var(--v3-rule)] py-5 md:grid-cols-[13rem_minmax(0,1fr)]"
                    >
                      <dt className="text-[13px] leading-7 text-[var(--v3-fg-2)]">
                        {label}
                      </dt>
                      <dd className="max-w-[42rem] text-[15px] leading-8 text-[var(--v3-fg-2)] [word-break:auto-phrase]">
                        {body}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </Chapter>

        {/* ===== 現在の状況 ==============================================
            確定している事実と、計測していない所感を分けて置く。 */}
        <Chapter id="current" title="現在の状況">
          <dl className="max-w-[42rem] border-t border-[var(--v3-rule)]">
            {TIMELINE.map((t) => (
              <div
                key={t.when}
                className="flex gap-6 border-b border-[var(--v3-rule)] py-3"
              >
                <dt className="w-[6.5rem] shrink-0 text-[13px] leading-7 tabular-nums text-[var(--v3-fg-2)]">
                  {t.when}
                </dt>
                <dd
                  className={`text-[15px] leading-7 [word-break:auto-phrase] ${
                    t.now
                      ? "text-[var(--v3-accent)]"
                      : "text-[var(--v3-fg)]"
                  }`}
                >
                  {t.what}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
            <div>
              <h3 className="text-[13px] font-bold tracking-[0.02em] text-[var(--v3-fg)]">
                確定していること
              </h3>
              <ul className="mt-4 space-y-2.5">
                {hirolia.impact.facts.slice(0, 2).map((f) => (
                  <li
                    key={f}
                    className="text-[15px] leading-7 text-[var(--v3-fg)] [word-break:auto-phrase]"
                  >
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-[13px] font-bold tracking-[0.02em] text-[var(--v3-fg-2)]">
                現場からの反応（計測はしていない）
              </h3>
              <ul className="mt-4 space-y-2.5">
                <li className="text-[15px] leading-7 text-[var(--v3-fg-2)] [word-break:auto-phrase]">
                  営業メンバーを通じて、「注文対応が楽になった」という反応が共有された
                </li>
                <li className="text-[15px] leading-7 text-[var(--v3-fg-2)] [word-break:auto-phrase]">
                  口頭でのやりとりが減った
                </li>
              </ul>
            </div>
          </div>

          <p className="mt-9 max-w-[42rem] text-[14px] leading-8 text-[var(--v3-fg-2)] [word-break:auto-phrase]">
            {hirolia.impact.caveat}
          </p>
        </Chapter>

        {/* ===== 学び ==================================================== */}
        <Chapter id="learning" title="学び">
          <p className="max-w-[38rem] text-[18px] font-medium leading-[1.8] tracking-tight text-[var(--v3-fg)] [word-break:auto-phrase] md:text-[22px]">
            {hirolia.learning.thesis}
          </p>
          <div className="mt-7">
            <P>{hirolia.learning.body}</P>
          </div>
          <ul className="mt-8 max-w-[42rem] space-y-2.5">
            {hirolia.learning.points.map((p) => (
              <li key={p} className="flex gap-3.5">
                <span
                  aria-hidden="true"
                  className="mt-[13px] h-px w-3.5 shrink-0 bg-[var(--v3-accent)]/70"
                />
                <span className="text-[15px] leading-8 text-[var(--v3-fg)] [word-break:auto-phrase]">
                  {p}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-9 max-w-[42rem] border-t border-[var(--v3-rule)] pt-6 text-[14px] leading-8 text-[var(--v3-fg-2)] [word-break:auto-phrase]">
            {hirolia.learning.caveat}
          </p>
        </Chapter>

        {/* ===== 使用技術 ================================================
            Challenges より目立たせない。ロゴも並べない。 */}
        <Chapter id="tech" title="使用技術">
          <ul className="max-w-[42rem] border-t border-[var(--v3-rule)]">
            {hirolia.tech.map((t) => (
              <li
                key={t}
                className="border-b border-[var(--v3-rule)] py-3 text-[14px] leading-7 text-[var(--v3-fg-2)] [word-break:auto-phrase]"
              >
                {t}
              </li>
            ))}
          </ul>
          <p className="mt-7 max-w-[42rem] text-[14px] leading-8 text-[var(--v3-fg-2)] [word-break:auto-phrase]">
            技術の選定そのものより、これを実店舗の営業時間中に動かし続けることの方に時間を使っています。
          </p>

          <div className="mt-12 border-t border-[var(--v3-rule)] pt-8">
            <Link
              href={BACK.href}
              className="inline-flex items-center gap-2 rounded text-[14px] text-[var(--v3-fg-2)] transition-colors duration-200 hover:text-[var(--v3-fg)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--v3-accent)]"
            >
              <FaArrowLeft size={11} aria-hidden="true" />
              {BACK.label}
            </Link>
          </div>
        </Chapter>
      </article>

      <footer className="border-t border-[var(--v3-rule)] py-10">
        <Wrap>
          <p className="text-[11px] text-[var(--v3-fg-2)]">
            &copy; {new Date().getFullYear()} 南保 俊輔
          </p>
        </Wrap>
      </footer>
    </div>
  );
}
