"use client";

/**
 * Portfolio Home v3 — Experience / Skills / Activities / GitHub / Contact。
 * どれも Home では「概要」に留める。長文は詳細ページへ逃がす前提。
 */
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { IconType } from "react-icons";
import { FaArrowUpRightFromSquare, FaCloud, FaLightbulb } from "react-icons/fa6";
import {
  SiDocker,
  SiExpo,
  SiFastapi,
  SiFirebase,
  SiFlask,
  SiGithubactions,
  SiGoogleappsscript,
  SiNextdotjs,
  SiPhp,
  SiPostgresql,
  SiReact,
  SiRender,
  SiSentry,
  SiTailwindcss,
  SiTypescript,
  SiVuedotjs,
} from "react-icons/si";
import { v3Activities, v3Experience, v3Profile, v3Skills } from "@/config/v3";

/**
 * Experience の visual hook。企業ロゴは出さない。
 * 「何の領域を経験したか」だけを小さな印で示す。
 */
const EXP_MARK: Record<string, { Icon: IconType; label: string }> = {
  STORES: { Icon: FaLightbulb, label: "product / thinking" },
  マイナビ: { Icon: FaCloud, label: "cloud / infrastructure" },
};

/* ---------------------------------------------------------------- Experience */

export function Experience() {
  return (
    <section
      id="experience"
      className="scroll-mt-20"
    >
      {/* Projects より幅を狭める。読ませる区画なので行長を詰める。 */}
      <div className="mx-auto max-w-[920px] px-6 py-24 md:px-10 md:py-32">
        <h2 className="text-[26px] font-bold tracking-tight text-[var(--v3-fg)] md:text-[32px]">
          外に出て経験したこと
        </h2>

        <div className="mt-10 space-y-10">
          {v3Experience.map((e) => (
            <article
              key={e.org}
              className="group grid grid-cols-1 gap-x-10 gap-y-3 border-l-2 border-[var(--v3-rule)] pl-6 transition-colors duration-200 hover:border-[var(--v3-accent)] md:grid-cols-[220px_minmax(0,1fr)]"
            >
              <div>
                <div className="flex items-center gap-2.5">
                  {EXP_MARK[e.org] && (
                    <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[var(--v3-rule)] text-[12px] text-[var(--v3-fg-2)] transition-colors duration-200 group-hover:border-[var(--v3-accent)]/60 group-hover:text-[var(--v3-accent)]">
                      {(() => {
                        const M = EXP_MARK[e.org].Icon;
                        return <M />;
                      })()}
                    </span>
                  )}
                  <h3 className="text-[17px] font-bold tracking-tight text-[var(--v3-fg)]">
                    {e.org}
                  </h3>
                </div>
                <p className="mt-2 text-[13px] leading-6 text-[var(--v3-fg-2)]">
                  {e.role}
                </p>
                <p className="mt-1 text-[12px] tabular-nums text-[var(--v3-fg-2)]">
                  {e.when}
                  {"provisional" in e && e.provisional && (
                    <span className="ml-2 text-[10px]">[時期 仮]</span>
                  )}
                </p>
                {EXP_MARK[e.org] && (
                  <p className="mt-2 text-[11px] tracking-[0.06em] text-[var(--v3-fg-2)]/70">
                    {EXP_MARK[e.org].label}
                  </p>
                )}
              </div>
              <p className="text-[15px] leading-8 text-[var(--v3-fg-2)]">
                {e.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------- Skills */

const ICONS: Record<string, { Icon: IconType; brand: string }> = {
  flask: { Icon: SiFlask, brand: "#E8EDF3" },
  postgres: { Icon: SiPostgresql, brand: "#5A9FD4" },
  render: { Icon: SiRender, brand: "#B6C4D6" },
  actions: { Icon: SiGithubactions, brand: "#5B8CE0" },
  monitor: { Icon: SiSentry, brand: "#C98BB8" },
  ts: { Icon: SiTypescript, brand: "#5A9FD4" },
  react: { Icon: SiReact, brand: "#61DAFB" },
  next: { Icon: SiNextdotjs, brand: "#E8EDF3" },
  vue: { Icon: SiVuedotjs, brand: "#67C79B" },
  firebase: { Icon: SiFirebase, brand: "#E0A93F" },
  tailwind: { Icon: SiTailwindcss, brand: "#4FC3D9" },
  fastapi: { Icon: SiFastapi, brand: "#4FAE8E" },
  docker: { Icon: SiDocker, brand: "#5A9FD4" },
  php: { Icon: SiPhp, brand: "#8C93C4" },
  expo: { Icon: SiExpo, brand: "#E8EDF3" },
  gas: { Icon: SiGoogleappsscript, brand: "#6FA8E0" },
};

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-20 bg-[var(--v3-surface)]/45">
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
                      className="group flex items-center gap-3.5 rounded-[7px] border border-transparent px-3 py-2.5 transition-[background-color,border-color] duration-200 hover:border-[var(--brand)]/35 hover:bg-[var(--v3-fg)]/[0.04] focus-visible:border-[var(--brand)]/35 focus-visible:bg-[var(--v3-fg)]/[0.04] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--v3-accent)]"
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
      className="scroll-mt-20 bg-[var(--v3-navy)]/30"
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
                  className={`text-[24px] font-bold tabular-nums leading-none transition-colors duration-300 ${
                    activeYear === y.year
                      ? "text-[var(--v3-accent)]"
                      : "text-[var(--v3-fg-2)]/55"
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
              <ul className="space-y-3">
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
                        className={`text-[14px] leading-7 ${
                          current
                            ? "text-[var(--v3-fg)]"
                            : "text-[var(--v3-fg-2)]"
                        }`}
                      >
                        {it.text}
                        {"award" in it && it.award && (
                          <span className="ml-2.5 rounded-[3px] border border-[var(--v3-accent)]/45 px-1.5 py-[1px] text-[10px] text-[var(--v3-accent)] transition-colors duration-200 hover:bg-[var(--v3-accent)]/12">
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
    <section id="github" className="scroll-mt-20">
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
          className="group mt-6 block rounded-[8px] border border-transparent p-3 transition-colors duration-200 hover:border-[var(--v3-rule)] hover:bg-[var(--v3-surface)]/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--v3-accent)]"
        >
          {failed ? (
            // 外部サービスが落ちても「壊れている」ようには見せない
            <div className="flex h-[112px] items-center justify-center rounded-[8px] border border-dashed border-[var(--v3-rule)] text-[12px] text-[var(--v3-fg-2)]">
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
  return (
    <section
      id="contact"
      className="scroll-mt-20 bg-[var(--v3-surface)]/45"
    >
      <div className="mx-auto max-w-[920px] px-6 py-24 md:px-10 md:py-32">
        <h2 className="text-[26px] font-bold tracking-tight text-[var(--v3-fg)] md:text-[32px]">
          連絡する
        </h2>
        <p className="mt-4 max-w-[34rem] text-[15px] leading-8 text-[var(--v3-fg-2)]">
          採用・インターン・開発に関するご連絡はこちらからお願いします。
        </p>

        {/*
          このラボページのフォームは見た目の検証用で、送信処理は繋いでいない。
          個人のメールアドレスは画面にもHTMLにも、このページの client JS にも入れていない。
        */}
        <form
          className="mt-10 max-w-[560px] space-y-5"
          onSubmit={(e) => e.preventDefault()}
        >
          {[
            { id: "v3-name", label: "お名前", type: "text", required: true },
            { id: "v3-email", label: "メールアドレス", type: "email", required: true },
            { id: "v3-subject", label: "件名", type: "text", required: false },
          ].map((f) => (
            <div key={f.id}>
              <label
                htmlFor={f.id}
                className="mb-2 block text-[13px] text-[var(--v3-fg-2)]"
              >
                {f.label}
                {f.required && (
                  <span className="ml-1 text-[var(--v3-accent)]">*</span>
                )}
              </label>
              <input
                id={f.id}
                type={f.type}
                required={f.required}
                className="w-full rounded-[6px] border border-[var(--v3-rule)] bg-[var(--v3-surface)] px-4 py-3 text-[15px] text-[var(--v3-fg)] transition-colors focus:border-[var(--v3-accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--v3-accent)]"
              />
            </div>
          ))}

          <div>
            <label
              htmlFor="v3-message"
              className="mb-2 block text-[13px] text-[var(--v3-fg-2)]"
            >
              メッセージ<span className="ml-1 text-[var(--v3-accent)]">*</span>
            </label>
            <textarea
              id="v3-message"
              rows={5}
              required
              className="w-full resize-y rounded-[6px] border border-[var(--v3-rule)] bg-[var(--v3-surface)] px-4 py-3 text-[15px] leading-7 text-[var(--v3-fg)] transition-colors focus:border-[var(--v3-accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--v3-accent)]"
            />
          </div>

          <button
            type="submit"
            className="rounded-[4px] bg-[var(--v3-fg)] px-7 py-3 text-[14px] font-semibold text-[var(--v3-bg)] transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--v3-accent)]"
          >
            送信する
          </button>

          <p className="text-[11px] leading-5 text-[var(--v3-fg-2)]/80">
            ※ このページは見た目の検証用のため、送信処理は繋いでいません。
          </p>
        </form>
      </div>
    </section>
  );
}
