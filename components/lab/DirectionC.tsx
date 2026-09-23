/**
 * Direction C — Product System
 *
 * 狙い: 「実運用まで持っている」という差別化要素を、視覚言語そのものにする。
 *
 * 固有の判断:
 *  - **3案で唯一ライト基調にした。** 前回の反省「全セクションが同じ黒背景」に対する直接の答えであり、
 *    3案を並べたときの比較軸としても効く。ダーク＝技術者という短絡も避けられる。
 *  - signature は最上部の status strip。`5 STORES LIVE` は本人にしか書けない一行で、
 *    同時に「この人は運用している側だ」を1秒で伝える。
 *  - 密度を上げる代わりに、罫線と tabular-nums で**記録らしさ**を出す。
 *    ただし数値カードを並べたダッシュボードにはしない。主役は文章と製品画像のまま。
 */
import Link from "next/link";
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
  "--lab-bg": "#F6F5F2",
  "--lab-panel": "#FFFFFF",
  "--lab-ink": "#15171B",
  "--lab-muted": "#5B6069",
  "--lab-line": "#E0DED8",
  "--lab-accent": "#0E7C4A",
} as React.CSSProperties;

const spec: [string, string][] = [
  ["所属", "武蔵野大学 データサイエンス学部 3年"],
  ["卒業", "2028年3月（2028卒）"],
  ["現在", "Hirolia の開発と本番運用"],
  ["担当範囲", "注文画面 / 管理画面 / API / DB設計 / 監視 / CI / 障害対応"],
];

export default function DirectionC() {
  return (
    <div
      style={{ ...palette, fontFamily: JP_SANS }}
      className="bg-[var(--lab-bg)] text-[var(--lab-ink)]"
    >
      {/* ===== Status strip — このDirectionの signature ==================== */}
      <div className="border-b border-[var(--lab-line)] bg-[var(--lab-ink)] text-[#F6F5F2]">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center gap-x-6 gap-y-1 px-6 py-2 text-[11px] tracking-[0.06em] md:px-10">
          <span className="flex items-center gap-2">
            <span className="relative flex h-[6px] w-[6px]">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#4ADE80] opacity-60" />
              <span className="relative inline-flex h-[6px] w-[6px] rounded-full bg-[#4ADE80]" />
            </span>
            PRODUCTION
          </span>
          <span className="tabular-nums">5 STORES LIVE</span>
          <span className="text-[#F6F5F2]/55">本契約 4 / 試験導入 1</span>
          <span className="ml-auto tabular-nums text-[#F6F5F2]/55">
            2026-09
          </span>
        </div>
      </div>

      {/* ===== Header ===================================================== */}
      <header className="border-b border-[var(--lab-line)] bg-[var(--lab-panel)]">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-3.5 md:px-10">
          <div className="flex items-baseline gap-3">
            <span className="text-[15px] font-bold tracking-[-0.01em]">
              南保 俊輔
            </span>
            <span className="text-[11px] text-[var(--lab-muted)]">
              Shunsuke Nambo
            </span>
          </div>
          <nav className="flex items-center gap-6 text-[13px]">
            {["Hirolia", "Work", "Experience"].map((n) => (
              <span
                key={n}
                className="cursor-default text-[var(--lab-muted)] transition-colors hover:text-[var(--lab-ink)]"
              >
                {n}
              </span>
            ))}
            <Link
              href={labHirolia.href}
              className="rounded border border-[var(--lab-ink)] px-3 py-1.5 text-[12px] font-semibold transition-colors hover:bg-[var(--lab-ink)] hover:text-[var(--lab-panel)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--lab-accent)]"
            >
              Case study
            </Link>
          </nav>
        </div>
      </header>

      {/* ===== Hero ======================================================= */}
      <section className="border-b border-[var(--lab-line)]">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-x-12 gap-y-10 px-6 py-12 md:px-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,520px)] lg:py-14">
          <div>
            <h1 className="text-[30px] font-bold leading-[1.35] tracking-[-0.02em] md:text-[38px] md:leading-[1.3]">
              {labProfile.direction}
            </h1>
            <p className="mt-5 max-w-[34rem] text-[14px] leading-7 text-[var(--lab-muted)]">
              飲食店向けモバイルオーダー「{labHirolia.name}」を5人チームのエンジニア2名のうち1人として開発し、
              実店舗5店舗の本番環境を運用しています。
            </p>

            {/* 仕様書のような密度。ここが Direction C の情報密度の主張 */}
            <dl className="mt-8 border-t border-[var(--lab-line)]">
              {spec.map(([k, v]) => (
                <div
                  key={k}
                  className="grid grid-cols-[92px_minmax(0,1fr)] gap-4 border-b border-[var(--lab-line)] py-2.5"
                >
                  <dt className="text-[12px] text-[var(--lab-muted)]">{k}</dt>
                  <dd className="text-[13px] leading-6 tabular-nums">{v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href={labHirolia.href}
                className="rounded bg-[var(--lab-ink)] px-5 py-2.5 text-[13px] font-semibold text-[var(--lab-panel)] transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--lab-accent)]"
              >
                Hirolia のケーススタディ
              </Link>
              <a
                href={labProfile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded border border-[var(--lab-line)] bg-[var(--lab-panel)] px-5 py-2.5 text-[13px] transition-colors hover:border-[var(--lab-muted)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--lab-accent)]"
              >
                GitHub
              </a>
            </div>
          </div>

          <div>
            <BrowserFrame label="hirolia — 店舗向け管理画面">
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
            <ShotNote>{HIROLIA_SHOT_NOTE}</ShotNote>
          </div>
        </div>

        {/* --- パイプライン。運用の視覚言語をここに集約する --- */}
        <div className="border-t border-[var(--lab-line)] bg-[var(--lab-panel)]">
          <div className="mx-auto flex max-w-[1200px] flex-wrap items-stretch gap-px px-6 md:px-10">
            {labPhases.map((p, i) => {
              const live = "live" in p && p.live;
              return (
                <div
                  key={p.key}
                  className="flex min-w-[150px] flex-1 items-center gap-3 border-[var(--lab-line)] py-4 md:border-r md:pr-5 md:last:border-r-0"
                >
                  <span className="text-[11px] tabular-nums text-[var(--lab-muted)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1">
                    <span className="block text-[13px] font-semibold tracking-[-0.01em]">
                      {p.en}
                      <span className="ml-1.5 text-[11px] font-normal text-[var(--lab-muted)]">
                        {p.ja}
                      </span>
                    </span>
                  </span>
                  {live && (
                    <span className="flex items-center gap-1.5 rounded-full bg-[var(--lab-accent)]/10 px-2 py-0.5 text-[10px] font-semibold text-[var(--lab-accent)]">
                      <span className="h-[5px] w-[5px] rounded-full bg-[var(--lab-accent)]" />
                      継続中
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== Featured — Hirolia ========================================= */}
      <section className="border-b border-[var(--lab-line)]">
        <div className="mx-auto max-w-[1200px] px-6 py-14 md:px-10 md:py-16">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b-2 border-[var(--lab-ink)] pb-3">
            <h2 className="text-[22px] font-bold tracking-[-0.02em] md:text-[26px]">
              {labHirolia.name}
              <span className="ml-3 text-[13px] font-normal text-[var(--lab-muted)]">
                {labHirolia.what}
              </span>
            </h2>
            <p className="text-[12px] tabular-nums text-[var(--lab-muted)]">
              {labHirolia.since} ・ {labHirolia.team}
            </p>
          </div>

          <p className="mt-7 max-w-[44rem] text-[19px] font-semibold leading-[1.75] tracking-[-0.01em] md:text-[22px]">
            {labHirolia.hook}
          </p>

          <div className="mt-9 grid grid-cols-1 gap-x-10 gap-y-9 lg:grid-cols-[minmax(0,1fr)_320px]">
            {/* 画像を主役から外さない。密度を上げても写真とUIは大きく置く */}
            <div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <BrowserFrame label="注文画面">
                  <div className="aspect-[16/10]">
                    <Shot
                      src={HIROLIA_SHOT}
                      alt="モバイルオーダーの注文画面（前身プロダクトの画面）"
                      width={2420}
                      height={1340}
                    />
                  </div>
                </BrowserFrame>
                <ShotPlaceholder
                  label="監視 / デプロイ履歴"
                  hint="落ちたことに先に気づける状態の画面"
                  ratio="aspect-[16/10]"
                />
              </div>
              <ShotNote>{HIROLIA_SHOT_NOTE}</ShotNote>

              {/* フェーズごとの1行。表形式だが、内容は文章 */}
              <dl className="mt-8 border-t border-[var(--lab-line)]">
                {labPhases.map((p) => (
                  <div
                    key={p.key}
                    className="grid grid-cols-1 gap-x-6 gap-y-1 border-b border-[var(--lab-line)] py-3.5 sm:grid-cols-[110px_minmax(0,1fr)]"
                  >
                    <dt className="text-[12px] font-semibold tracking-[-0.01em]">
                      {p.en}
                      <span className="ml-1.5 font-normal text-[var(--lab-muted)]">
                        {p.ja}
                      </span>
                    </dt>
                    <dd className="text-[13px] leading-7 text-[var(--lab-muted)]">
                      {p.body}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* 運用の記録らしさを出す右カラム */}
            <aside className="rounded-lg border border-[var(--lab-line)] bg-[var(--lab-panel)] p-5">
              <p className="text-[11px] tracking-[0.08em] text-[var(--lab-muted)]">
                OPERATION
              </p>
              <dl className="mt-4">
                {[
                  ["稼働店舗", labHirolia.liveDetail],
                  ["本番環境", "Render"],
                  ["監視", "エラー監視 / 外形監視"],
                  ["CI", "GitHub Actions"],
                  ["バックアップ", "DB 定期取得"],
                  ["障害対応", "営業の復帰を優先して対応"],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    className="flex items-baseline justify-between gap-4 border-b border-[var(--lab-line)] py-2.5 last:border-b-0"
                  >
                    <dt className="shrink-0 text-[12px] text-[var(--lab-muted)]">
                      {k}
                    </dt>
                    <dd className="text-right text-[12px] leading-5 tabular-nums">
                      {v}
                    </dd>
                  </div>
                ))}
              </dl>
              <Link
                href={labHirolia.href}
                className="mt-5 block rounded bg-[var(--lab-ink)] px-4 py-2.5 text-center text-[13px] font-semibold text-[var(--lab-panel)] transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--lab-accent)]"
              >
                詳細を読む
              </Link>
            </aside>
          </div>
        </div>
      </section>

      {/* ===== Secondary — Thank x Chain ================================== */}
      <section>
        <div className="mx-auto max-w-[1200px] px-6 py-12 md:px-10 md:py-14">
          <div className="flex items-end justify-between border-b border-[var(--lab-line)] pb-2.5">
            <h2 className="text-[13px] font-bold tracking-[0.04em]">
              SELECTED WORK
            </h2>
            <span className="text-[11px] tabular-nums text-[var(--lab-muted)]">
              1 / 4
            </span>
          </div>

          {/* 一覧の1行として扱う。Hirolia と同格に見せない */}
          <article className="grid grid-cols-1 items-center gap-5 border-b border-[var(--lab-line)] py-5 sm:grid-cols-[168px_minmax(0,1fr)_auto]">
            <div className="overflow-hidden rounded border border-[var(--lab-line)]">
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
              <h3 className="text-[16px] font-bold tracking-[-0.01em]">
                {labThankXChain.name}
              </h3>
              <p className="mt-1 text-[12px] text-[var(--lab-muted)]">
                {labThankXChain.what} ・ {labThankXChain.award}
              </p>
              <p className="mt-2.5 max-w-[38rem] text-[13px] leading-7">
                {labThankXChain.hook}
              </p>
            </div>
            <p className="text-[11px] tabular-nums text-[var(--lab-muted)] sm:text-right">
              {labThankXChain.tech.join(" / ")}
            </p>
          </article>
        </div>
      </section>
    </div>
  );
}
