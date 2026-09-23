"use client";

/**
 * Portfolio Home v3 — Experience / Skills / Activities / GitHub / Contact。
 * どれも Home では「概要」に留める。長文は詳細ページへ逃がす前提。
 */
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { IconType } from "react-icons";
import {
  FaArrowUpRightFromSquare,
  FaChevronDown,
  FaCloud,
  FaLightbulb,
} from "react-icons/fa6";
import { TECH } from "./techIcons";
import { useContactForm } from "@/hooks/useContactForm";
import { v3Activities, v3Experience, v3Profile, v3Skills } from "@/config/v3";


/* ---------------------------------------------------------------- Experience */

/**
 * 参加形態を示す小さな印。企業ロゴは出さない。
 * 主役は「何を経験したか」であって、どこに行ったかではない。
 */
const EXP_MARK: Record<string, { Icon: IconType; label: string }> = {
  product: { Icon: FaLightbulb, label: "プロダクト開発" },
  cloud: { Icon: FaCloud, label: "クラウド / インフラ" },
};

/** 取り組んだこと / 気づいたこと / 次に活かすこと の共通ブロック */
function Block({
  label,
  lead,
  points,
  accent = false,
}: {
  label: string;
  lead?: string;
  points: readonly string[];
  accent?: boolean;
}) {
  return (
    <div>
      <h4
        className={`text-[12px] font-bold tracking-[0.04em] ${
          accent ? "text-[var(--v3-accent)]" : "text-[var(--v3-fg-2)]"
        }`}
      >
        {label}
      </h4>
      {lead && (
        <p className="mt-2.5 text-[15px] leading-8 text-[var(--v3-fg)] [word-break:auto-phrase]">
          {lead}
        </p>
      )}
      <ul className="mt-2.5 space-y-2">
        {points.map((p) => (
          <li key={p} className="flex gap-3">
            <span
              aria-hidden="true"
              className="mt-[13px] h-px w-3 shrink-0 bg-[var(--v3-rule)]"
            />
            <span className="text-[13px] leading-7 text-[var(--v3-fg-2)] [word-break:auto-phrase]">
              {p}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * 1件ぶんの開閉。閉じているときは「どこで・いつ・何を学んだか」の3行だけ。
 * 高さは grid-template-rows で変化させるので、開いた瞬間に飛ばない。
 */
function ExperienceItem({ e }: { e: (typeof v3Experience)[number] }) {
  const [open, setOpen] = useState(false);
  const mark = EXP_MARK[e.mark];
  const panelId = `exp-panel-${e.key}`;
  const btnId = `exp-btn-${e.key}`;

  return (
    <article className="border-b border-[var(--v3-rule)] last:border-b-0">
      <h3>
        <button
          type="button"
          id={btnId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          className="group flex w-full items-start gap-5 py-7 text-left transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--v3-accent)]"
        >
          <span className="min-w-0 flex-1">
            <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="text-[19px] font-bold tracking-tight text-[var(--v3-fg)]">
                {e.org}
              </span>
              <span className="text-[13px] text-[var(--v3-fg-2)]">
                {e.program}
              </span>
            </span>
            <span className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] tabular-nums text-[var(--v3-fg-2)]">
              {e.format}
              {mark && (
                <span className="inline-flex items-center gap-1.5">
                  <mark.Icon className="text-[11px]" aria-hidden="true" />
                  {mark.label}
                </span>
              )}
            </span>
            <span className="mt-3 block max-w-[46rem] text-[14px] leading-7 text-[var(--v3-fg-2)] [word-break:auto-phrase]">
              {e.summary}
            </span>
          </span>

          <span className="mt-1 flex shrink-0 items-center gap-2 text-[12px] text-[var(--v3-fg-2)] transition-colors duration-200 group-hover:text-[var(--v3-fg)]">
            <span className="hidden sm:inline">{open ? "閉じる" : "詳しく見る"}</span>
            <span
              aria-hidden="true"
              className="flex h-7 w-7 items-center justify-center rounded-full border border-[var(--v3-rule)] transition-[transform,border-color] duration-300 ease-out group-hover:border-[var(--v3-accent)]/60"
              style={{ transform: open ? "rotate(180deg)" : "none" }}
            >
              <FaChevronDown className="text-[10px]" />
            </span>
          </span>
        </button>
      </h3>

      {/* 0fr → 1fr。高さを直接指定しないので中身が変わっても破綻しない。 */}
      <div
        id={panelId}
        role="region"
        aria-labelledby={btnId}
        className={`grid transition-[grid-template-rows] duration-[320ms] ease-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="space-y-8 border-l border-[var(--v3-rule)] pb-9 pl-6 md:pl-8">
            <Block label="取り組んだこと" lead={e.did.lead} points={e.did.points} />
            <Block
              label="気づいたこと"
              lead={e.learned.lead}
              points={e.learned.points}
              accent
            />
            <Block label="次に活かすこと" points={e.next} />
          </div>
        </div>
      </div>
    </article>
  );
}

export function Experience() {
  return (
    <section id="experience" className="scroll-mt-24">
      <div className="mx-auto max-w-[1080px] px-6 py-24 md:px-10 md:py-32">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="text-[26px] font-bold tracking-tight text-[var(--v3-fg)] md:text-[32px]">
            インターン・参加プログラム
          </h2>
          <p className="text-[13px] text-[var(--v3-fg-2)]">
            開くと、取り組んだこと・気づいたこと・次に活かすこと が読めます
          </p>
        </div>

        <div className="mt-10 border-t border-[var(--v3-rule)]">
          {v3Experience.map((e) => (
            <ExperienceItem key={e.key} e={e} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------- Skills */

const ICONS = TECH;

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-24 bg-[var(--v3-surface)]/45">
      <div className="mx-auto max-w-[1080px] px-6 py-24 md:px-10 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-[26px] font-bold tracking-tight text-[var(--v3-fg)] md:text-[32px]">
            使っている技術
          </h2>
          <p className="text-[13px] text-[var(--v3-fg-2)]">
            本番で動かしているものと、そうでないものを分けています
          </p>
        </div>

        <div className="mt-12 space-y-12">
          {v3Skills.map((g) => (
            <div key={g.group}>
              <div className="flex flex-col gap-1 border-b border-[var(--v3-rule)] pb-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                <h3 className="text-[15px] font-bold tracking-tight text-[var(--v3-fg)]">
                  {g.group}
                </h3>
                <p className="text-[12px] text-[var(--v3-fg-2)]">{g.note}</p>
              </div>

              <ul className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                {g.items.map((it) => {
                  const entry = ICONS[it.icon];
                  const Icon = entry?.Icon;
                  return (
                    <li
                      key={it.name}
                      tabIndex={0}
                      style={{ "--brand": entry?.brand } as React.CSSProperties}
                      className="group flex items-center gap-3.5 rounded-[12px] border border-transparent px-3 py-2.5 transition-[background-color,border-color] duration-200 hover:border-[var(--brand)]/35 hover:bg-[var(--v3-fg)]/[0.04] focus-visible:border-[var(--brand)]/35 focus-visible:bg-[var(--v3-fg)]/[0.04] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--v3-accent)]"
                    >
                      {Icon && (
                        <span className="shrink-0 text-[20px] text-[var(--v3-fg-2)]">
                          {/* 静止時は落ち着いた無彩色。hover / focus でその技術の色だけ戻る。 */}
                          <Icon className="transition-[color,filter] duration-200 group-hover:text-[var(--brand)] group-hover:[filter:drop-shadow(0_0_7px_var(--brand))] group-focus-visible:text-[var(--brand)]" />
                        </span>
                      )}
                      <span className="min-w-0">
                        <span className="block truncate text-[14px] text-[var(--v3-fg)]">
                          {it.name}
                        </span>
                        <span className="block truncate text-[11px] text-[var(--v3-fg-2)] transition-colors duration-200 group-hover:text-[var(--v3-fg)] group-focus-visible:text-[var(--v3-fg)]">
                          {it.where}
                        </span>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- Activities */

export function Activities() {
  const [activeYear, setActiveYear] = useState<string | null>(null);
  const yearRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // 見ている年の marker だけ明るくする。要素は動かさないので読みづらくならない。
  useEffect(() => {
    const els = Object.entries(yearRefs.current).filter(([, el]) => el);
    if (!els.length || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setActiveYear(hit.target.getAttribute("data-year"));
      },
      { rootMargin: "-35% 0px -45% 0px" }
    );
    els.forEach(([, el]) => io.observe(el!));
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="activities"
      className="scroll-mt-24 bg-[var(--v3-navy)]/30"
    >
      <div className="mx-auto max-w-[920px] px-6 py-24 md:px-10 md:py-32">
        <h2 className="text-[26px] font-bold tracking-tight text-[var(--v3-fg)] md:text-[32px]">
          これまで
        </h2>

        <div className="mt-10 space-y-10">
          {v3Activities.map((y) => (
            <div
              key={y.year}
              data-year={y.year}
              ref={(el) => {
                yearRefs.current[y.year] = el;
              }}
              className="grid grid-cols-1 gap-x-10 gap-y-4 md:grid-cols-[96px_minmax(0,1fr)]"
            >
              <div className="md:sticky md:top-24 md:self-start">
                <p
                  className={`text-[28px] font-bold tabular-nums leading-none transition-colors duration-300 ${
                    activeYear === y.year
                      ? "text-[var(--v3-accent)]"
                      : "text-[var(--v3-fg-2)]"
                  }`}
                >
                  {y.year}
                </p>
                {/* 年の下の短い線。見ている年だけ伸びる。 */}
                <span
                  aria-hidden="true"
                  className="mt-3 block h-px w-10 origin-left bg-[var(--v3-accent)] transition-transform duration-[400ms] ease-out"
                  style={{
                    transform:
                      activeYear === y.year ? "scaleX(1)" : "scaleX(0.15)",
                    opacity: activeYear === y.year ? 1 : 0.35,
                  }}
                />
              </div>
              <ul className="space-y-3.5">
                {y.items.map((it) => {
                  const current = "current" in it && it.current;
                  return (
                    <li key={it.text} className="flex items-baseline gap-3.5">
                      <span
                        aria-hidden="true"
                        className={`mt-[7px] h-[6px] w-[6px] shrink-0 rounded-full ${
                          current
                            ? "bg-[var(--v3-accent)]"
                            : "bg-[var(--v3-rule)]"
                        }`}
                      />
                      <span
                        className={`text-[15px] leading-8 [word-break:auto-phrase] ${
                          current ? "text-[var(--v3-fg)]" : "text-[var(--v3-fg)]/85"
                        }`}
                      >
                        {it.text}
                        {"award" in it && it.award && (
                          <span className="ml-2.5 rounded-full border border-[var(--v3-accent)]/45 px-2 py-[2px] text-[11px] text-[var(--v3-accent)] transition-colors duration-200 hover:bg-[var(--v3-accent)]/12">
                            {it.award}
                          </span>
                        )}
                        {"provisional" in it && it.provisional && (
                          <span className="ml-2 text-[10px] text-[var(--v3-fg-2)]/70">
                            [時期 仮]
                          </span>
                        )}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------- GitHub */

export function GitHubActivity() {
  const [failed, setFailed] = useState(false);
  const username = "namb0304";
  const chart = `https://ghchart.rshah.org/${username}?theme=onedark`;

  return (
    <section id="github" className="scroll-mt-24">
      <div className="mx-auto max-w-[920px] px-6 py-16 md:px-10 md:py-20">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="text-[18px] font-bold tracking-tight text-[var(--v3-fg)]">
            GitHub
          </h2>
          <a
            href={v3Profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded text-[13px] text-[var(--v3-fg-2)] transition-colors hover:text-[var(--v3-accent)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--v3-accent)]"
          >
            github.com/{username}
          </a>
        </div>

        <a
          href={v3Profile.github}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-6 block rounded-[14px] border border-transparent p-3 transition-colors duration-200 hover:border-[var(--v3-rule)] hover:bg-[var(--v3-surface)]/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--v3-accent)]"
        >
          {failed ? (
            // 外部サービスが落ちても「壊れている」ようには見せない
            <div className="flex h-[112px] items-center justify-center rounded-[14px] border border-dashed border-[var(--v3-rule)] text-[12px] text-[var(--v3-fg-2)]">
              コントリビューショングラフを読み込めませんでした
            </div>
          ) : (
            <Image
              src={chart}
              alt={`${username} のコントリビューショングラフ`}
              width={896}
              height={112}
              unoptimized
              onError={() => setFailed(true)}
              className="h-auto w-full opacity-80 transition-opacity duration-200 group-hover:opacity-100"
            />
          )}
          <span className="mt-3 flex items-center gap-1.5 text-[12px] text-[var(--v3-fg-2)] transition-colors duration-200 group-hover:text-[var(--v3-accent)]">
            <FaArrowUpRightFromSquare size={10} />
            GitHub で見る
          </span>
        </a>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ Contact */

export function Contact() {
  const { values, errors, status, setField, submit } = useContactForm();
  const sending = status === "sending";

  const fields = [
    { key: "name" as const, id: "v3-name", label: "お名前", type: "text", required: true },
    { key: "email" as const, id: "v3-email", label: "メールアドレス", type: "email", required: true },
    { key: "subject" as const, id: "v3-subject", label: "件名", type: "text", required: false },
  ];

  return (
    <section id="contact" className="scroll-mt-24 bg-[var(--v3-surface)]/45">
      {/* 見出し・本文・フォームを同じ幅の1列に揃える。 */}
      <div className="mx-auto max-w-[620px] px-6 py-24 md:py-32">
        <h2 className="text-[26px] font-bold tracking-tight text-[var(--v3-fg)] md:text-[32px]">
          連絡先
        </h2>
        {/* 営業文句にしない。本人が普通に話している語り口に寄せる。 */}
        <p className="mt-4 text-[15px] leading-8 text-[var(--v3-fg-2)] [word-break:auto-phrase]">
          採用・インターン・開発について、このサイトを見て気になったことがあればお聞かせください。
        </p>

        <form className="mt-10 space-y-6" onSubmit={submit} noValidate>
          {fields.map((f) => {
            const err = errors[f.key];
            return (
              <div key={f.id}>
                <label
                  htmlFor={f.id}
                  className="mb-2 block text-[13px] font-medium text-[var(--v3-fg-2)]"
                >
                  {f.label}
                  {f.required && (
                    <span className="ml-1 text-[var(--v3-accent)]">*</span>
                  )}
                </label>
                <input
                  id={f.id}
                  type={f.type}
                  value={values[f.key]}
                  onChange={(e) => setField(f.key, e.target.value)}
                  disabled={sending}
                  aria-invalid={err ? true : undefined}
                  aria-describedby={err ? `${f.id}-error` : undefined}
                  className={`w-full rounded-[12px] border bg-[var(--v3-surface)] px-4 py-3 text-[15px] text-[var(--v3-fg)] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--v3-accent)] disabled:opacity-60 ${
                    err
                      ? "border-[#E0796B]"
                      : "border-[var(--v3-rule)] focus:border-[var(--v3-accent)]"
                  }`}
                />
                {/* 色だけでエラーを示さない。文言も必ず出す。 */}
                {err && (
                  <p
                    id={`${f.id}-error`}
                    className="mt-2 text-[12px] leading-6 text-[#E0796B]"
                  >
                    {err}
                  </p>
                )}
              </div>
            );
          })}

          <div>
            <label
              htmlFor="v3-message"
              className="mb-2 block text-[13px] font-medium text-[var(--v3-fg-2)]"
            >
              メッセージ<span className="ml-1 text-[var(--v3-accent)]">*</span>
            </label>
            <textarea
              id="v3-message"
              rows={5}
              value={values.message}
              onChange={(e) => setField("message", e.target.value)}
              disabled={sending}
              aria-invalid={errors.message ? true : undefined}
              aria-describedby={errors.message ? "v3-message-error" : undefined}
              className={`w-full resize-y rounded-[12px] border bg-[var(--v3-surface)] px-4 py-3 text-[15px] leading-7 text-[var(--v3-fg)] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--v3-accent)] disabled:opacity-60 ${
                errors.message
                  ? "border-[#E0796B]"
                  : "border-[var(--v3-rule)] focus:border-[var(--v3-accent)]"
              }`}
            />
            {errors.message && (
              <p
                id="v3-message-error"
                className="mt-2 text-[12px] leading-6 text-[#E0796B]"
              >
                {errors.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={sending}
            className="rounded-[10px] bg-[var(--v3-fg)] px-7 py-3 text-[14px] font-semibold text-[var(--v3-bg)] transition-opacity duration-200 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--v3-accent)]"
          >
            {sending ? "送信中..." : "送信する"}
          </button>

          {/* 状態は読み上げにも伝える。内部エラーは出さない。 */}
          <p role="status" aria-live="polite" className="text-[13px] leading-7">
            {status === "success" && (
              <span className="text-[var(--v3-accent)]">
                送信しました。ありがとうございます。
              </span>
            )}
            {status === "error" && (
              <span className="text-[#E0796B]">
                送信できませんでした。時間をおいてもう一度お試しください。
              </span>
            )}
          </p>
        </form>
      </div>
    </section>
  );
}
