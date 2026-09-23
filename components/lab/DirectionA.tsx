/**
 * Direction A — Product Editorial
 *
 * 狙い: Hirolia を「学生の制作物」ではなく、実際に動いている Product の launch page として見せる。
 *
 * 固有の判断:
 *  - アクセントのサフラン #E9A13B は、Hirolia の導入先（インド・ネパール系飲食店）の色から取っている。
 *    汎用パレットから選んだ色ではない ＝ この人の経験からしか出てこない色。
 *  - 日本語の見出しを**明朝体**にする。日本語の developer portfolio でほぼ使われないため、
 *    それだけでテンプレ感が消える。かつ editorial というキーワードに直結する。
 *  - 画像は右に振り切り、コンテナ外へ抜けさせる（非対称）。左右対称の 50/50 にはしない。
 */
import Link from "next/link";
import {
  BrowserFrame,
  PhoneFrame,
  Shot,
  ShotNote,
  ShotPlaceholder,
} from "./Frames";
import { JP_SANS, JP_SERIF } from "@/app/design-lab/fonts";
import {
  HIROLIA_SHOT,
  HIROLIA_SHOT_NOTE,
  labHirolia,
  labProfile,
  labThankXChain,
} from "@/config/lab";

const palette = {
  "--lab-bg": "#141210",
  "--lab-panel": "#1E1A16",
  "--lab-ink": "#F4EFE7",
  "--lab-muted": "#A79C90",
  "--lab-line": "#2E2820",
  "--lab-accent": "#E9A13B",
} as React.CSSProperties;

const nav = ["Hirolia", "Work", "About", "Contact"];

export default function DirectionA({ serifClass }: { serifClass: string }) {
  return (
    <div
      style={{ ...palette, fontFamily: JP_SANS }}
      className="bg-[var(--lab-bg)] text-[var(--lab-ink)]"
    >
      {/* ===== Header ===================================================== */}
      <header className="border-b border-[var(--lab-line)]">
        <div className="mx-auto flex max-w-[1180px] items-baseline justify-between gap-8 px-6 py-5 md:px-10">
          <div className="flex items-baseline gap-4">
            <span
              className="text-[19px] tracking-[0.02em]"
              style={{ fontFamily: JP_SERIF }}
            >
              南保 俊輔
            </span>
            <span className="hidden text-[11px] tracking-[0.1em] text-[var(--lab-muted)] sm:inline">
              2028卒
            </span>
          </div>
          <nav className="flex items-center gap-7">
            {nav.map((n) => (
              <span
                key={n}
                className={`${serifClass} cursor-default text-[15px] text-[var(--lab-muted)] transition-colors hover:text-[var(--lab-ink)]`}
              >
                {n}
              </span>
            ))}
          </nav>
        </div>
      </header>

      {/* ===== Hero ======================================================= */}
      <section className="relative overflow-hidden border-b border-[var(--lab-line)]">
        {/* 背面のサフランの面。画面の右上から差し込む光のように置く（gradient文字は使わない） */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-[10%] -top-[30%] h-[560px] w-[560px] rounded-full opacity-[0.10] blur-[90px]"
          style={{ background: "var(--lab-accent)" }}
        />

        <div className="relative mx-auto grid max-w-[1180px] grid-cols-1 gap-y-12 px-6 pt-14 pb-16 md:px-10 lg:grid-cols-12 lg:gap-x-10 lg:pt-20 lg:pb-20">
          {/* --- 左：言葉 --- */}
          <div className="lg:col-span-7 lg:pr-6">
            <p className="text-[12px] tracking-[0.14em] text-[var(--lab-muted)]">
              {labProfile.meta}
            </p>

            <h1
              className="mt-6 text-[40px] leading-[1.28] tracking-[0.01em] md:text-[58px] md:leading-[1.22]"
              style={{ fontFamily: JP_SERIF }}
            >
              店舗で動き続けるところまで、
              <br />
              <span className="text-[var(--lab-accent)]">つくる。</span>
            </h1>

            <p className="mt-7 max-w-[34rem] text-[15px] leading-8 text-[var(--lab-muted)]">
              飲食店向けのモバイルオーダー「{labHirolia.name}」を、5人チームのエンジニア2名のうち1人として開発しています。
              画面とAPIを書くだけでなく、実店舗に入れたあとの監視・障害対応まで担当しています。
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                href={labHirolia.href}
                className="rounded-full bg-[var(--lab-accent)] px-7 py-3 text-[14px] font-semibold text-[#1A1206] transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--lab-accent)]"
              >
                Hirolia のケーススタディ
              </Link>
              <a
                href={labProfile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-[var(--lab-line)] px-7 py-3 text-[14px] text-[var(--lab-muted)] transition-colors hover:border-[var(--lab-muted)] hover:text-[var(--lab-ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--lab-accent)]"
              >
                GitHub
              </a>
            </div>

            {/* 1画面目に「最重要経験」を入れるための帯 */}
            <dl className="mt-12 flex flex-wrap items-baseline gap-x-8 gap-y-3 border-t border-[var(--lab-line)] pt-5">
              <div className="flex items-baseline gap-2.5">
                <dt
                  className="text-[15px] text-[var(--lab-ink)]"
                  style={{ fontFamily: JP_SERIF }}
                >
                  {labHirolia.name}
                </dt>
                <dd className="text-[13px] text-[var(--lab-muted)]">
                  {labHirolia.what}
                </dd>
              </div>
              <div className="flex items-center gap-2">
                <span className="relative flex h-[7px] w-[7px]">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--lab-accent)] opacity-60" />
                  <span className="relative inline-flex h-[7px] w-[7px] rounded-full bg-[var(--lab-accent)]" />
                </span>
                <dd className="text-[13px] text-[var(--lab-ink)]">
                  {labHirolia.live}
                </dd>
              </div>
              <dd className="text-[13px] text-[var(--lab-muted)]">
                {labHirolia.since}
              </dd>
            </dl>
          </div>

          {/* --- 右：製品の画。コンテナから右へ抜けさせる --- */}
          <div className="relative lg:col-span-5">
            <div className="relative lg:-mr-[14%] xl:-mr-[22%]">
              <BrowserFrame label="店舗向け メニュー管理画面">
                <div className="aspect-[16/10]">
                  <Shot
                    src={HIROLIA_SHOT}
                    alt="モバイルオーダーの管理画面（前身プロダクトの画面）"
                    width={2420}
                    height={1340}
                    priority
                  />
                </div>
              </BrowserFrame>

              {/* 来店客は自分のスマホで使う、という事実を画で重ねる */}
              <PhoneFrame className="absolute -bottom-10 -left-6 w-[116px] md:w-[138px] lg:-left-10">
                <ShotPlaceholder
                  label="注文画面"
                  ratio="h-full w-full"
                  className="rounded-[20px] border-0"
                />
              </PhoneFrame>
            </div>
            <ShotNote>{HIROLIA_SHOT_NOTE}</ShotNote>
          </div>
        </div>
      </section>

      {/* ===== Featured — Hirolia ========================================= */}
      <section className="border-b border-[var(--lab-line)]">
        <div className="mx-auto max-w-[1180px] px-6 py-16 md:px-10 md:py-24">
          <div className="flex items-baseline gap-5">
            <span
              className={`${serifClass} text-[15px] text-[var(--lab-accent)]`}
            >
              01
            </span>
            <span className="text-[12px] tracking-[0.14em] text-[var(--lab-muted)]">
              FEATURED CASE
            </span>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <h2
                className="text-[34px] leading-[1.3] md:text-[46px] md:leading-[1.25]"
                style={{ fontFamily: JP_SERIF }}
              >
                {labHirolia.hook}
              </h2>
              <p className="mt-7 max-w-[36rem] text-[15px] leading-8 text-[var(--lab-muted)]">
                {labHirolia.scope}。プロトタイプのままでは1店舗も続かなかったので、
                店舗のオペレーションに合わせて作り直しながら運用しています。
              </p>

              <Link
                href={labHirolia.href}
                className={`${serifClass} mt-8 inline-block border-b border-[var(--lab-accent)] pb-1 text-[17px] text-[var(--lab-accent)] transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--lab-accent)]`}
              >
                Read the case study →
              </Link>
            </div>

            {/* 編集的なサイドバー。表ではなく、記事の欄外注記のように置く */}
            <dl className="lg:col-span-5 lg:border-l lg:border-[var(--lab-line)] lg:pl-10">
              {[
                ["稼働", labHirolia.liveDetail],
                ["チーム", labHirolia.team],
                ["期間", labHirolia.since],
                ["担当", "注文画面 / 管理画面 / API / DB設計 / 本番運用"],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="border-b border-[var(--lab-line)] py-4 first:pt-0"
                >
                  <dt className="text-[11px] tracking-[0.12em] text-[var(--lab-muted)]">
                    {k}
                  </dt>
                  <dd
                    className="mt-1.5 text-[16px] leading-7"
                    style={{ fontFamily: JP_SERIF }}
                  >
                    {v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* 大きな製品の画。editorial spread の見開きに相当する部分 */}
          <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
            <div className="md:col-span-2">
              <BrowserFrame label="注文フロー">
                <div className="aspect-[16/9]">
                  <Shot
                    src={HIROLIA_SHOT}
                    alt="モバイルオーダーの注文フロー（前身プロダクトの画面）"
                    width={2420}
                    height={1340}
                  />
                </div>
              </BrowserFrame>
            </div>
            <ShotPlaceholder
              label="店舗での利用風景"
              hint="実際に店内で使われている写真を1枚"
              ratio="aspect-[16/9] md:aspect-auto md:h-full"
            />
          </div>
          <ShotNote>{HIROLIA_SHOT_NOTE}</ShotNote>
        </div>
      </section>

      {/* ===== Secondary — Thank x Chain ================================== */}
      <section>
        <div className="mx-auto max-w-[1180px] px-6 py-16 md:px-10 md:py-20">
          <div className="flex items-baseline gap-5">
            <span className={`${serifClass} text-[15px] text-[var(--lab-muted)]`}>
              02
            </span>
            <span className="text-[12px] tracking-[0.14em] text-[var(--lab-muted)]">
              SELECTED WORK
            </span>
          </div>

          {/* Hirolia と同じ扱いにしない: 横長1本、画像は小さく、見出しも一段下げる */}
          <article className="mt-6 grid grid-cols-1 items-center gap-8 md:grid-cols-[300px_1fr]">
            <div className="overflow-hidden rounded-[10px] border border-[var(--lab-line)]">
              <div className="aspect-[16/10]">
                <Shot
                  src={labThankXChain.image}
                  alt="Thank x Chain のトップ画面"
                  width={2940}
                  height={1662}
                />
              </div>
            </div>
            <div>
              <h3
                className="text-[24px] leading-snug md:text-[28px]"
                style={{ fontFamily: JP_SERIF }}
              >
                {labThankXChain.name}
              </h3>
              <p className="mt-2 text-[13px] text-[var(--lab-muted)]">
                {labThankXChain.what} ・ {labThankXChain.award}
              </p>
              <p className="mt-4 max-w-[34rem] text-[15px] leading-8">
                {labThankXChain.hook}
              </p>
              <p className="mt-4 text-[12px] tracking-wide text-[var(--lab-muted)]">
                {labThankXChain.tech.join(" / ")}
              </p>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
