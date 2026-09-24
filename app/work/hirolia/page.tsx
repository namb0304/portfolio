/**
 * Visual Spike 2026-09 — Hirolia 詳細（Case Study）。
 * 文章は全て仮。技術は最後に置き、主役にしない。
 */
import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { Container } from "@/components/spike/Section";
import { hirolia } from "@/config/spike";

export const metadata: Metadata = {
  title: "Hirolia — 飲食店向けモバイルオーダーSaaS ｜ 南保 俊輔",
  description:
    "実店舗へ導入したあとに出た問題と、その改善。開発から運用までの担当範囲についてのケーススタディ。",
};

const toc = [
  { id: "overview", label: "Overview" },
  { id: "context", label: "Context / Problem" },
  { id: "role", label: "Role" },
  { id: "operation", label: "From Build to Operation" },
  { id: "challenges", label: "Challenges" },
  { id: "impact", label: "Impact" },
  { id: "learning", label: "Learning" },
  { id: "tech", label: "Tech" },
];

function Part({
  id,
  index,
  title,
  children,
}: {
  id: string;
  index: number;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-20 border-t border-line py-16 md:py-20">
      <Container>
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3">
          {String(index).padStart(2, "0")}
        </p>
        <h2 className="mt-3 text-2xl font-bold tracking-tight text-ink md:text-3xl">
          {title}
        </h2>
        <div className="mt-8">{children}</div>
      </Container>
    </section>
  );
}

/**
 * 戻り先は ?from で決める。referrer には依存しない（直リンク・リロードでも壊れないため）。
 *   ?from=lab … Design Lab の Home v3 から開かれた → /design-lab#projects
 *   それ以外   … 本番の TOP から開かれた         → /#projects
 * 「トップへ戻る」だと戻り先が曖昧になるので、戻る先を文言に出す。
 */
function resolveBack(from?: string) {
  return from === "lab"
    ? { href: "/design-lab#projects", label: "Design Lab の Projects へ戻る" }
    : { href: "/#projects", label: "Projects へ戻る" };
}

export default async function HiroliaCaseStudy({
  searchParams,
}: {
  searchParams: Promise<{ from?: string }>;
}) {
  const { from } = await searchParams;
  const back = resolveBack(from);

  return (
    <article className="pb-24">
      {/* --- ページ冒頭 ------------------------------------------------- */}
      <header className="pt-12 pb-16 md:pt-16 md:pb-20">
        <Container>
          <Link
            href={back.href}
            className="inline-flex items-center gap-2 rounded text-[13px] text-ink-3 transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            <FaArrowLeft size={11} />
            {back.label}
          </Link>

          <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3">
            Case Study
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-ink md:text-6xl">
            {hirolia.name}
          </h1>
          <p className="mt-4 text-[17px] leading-8 text-ink-2 md:text-[19px]">
            {hirolia.tagline}
          </p>

          <dl className="mt-12 grid grid-cols-1 gap-x-10 border-t border-line sm:grid-cols-2 md:grid-cols-3">
            {hirolia.facts.map((f) => (
              <div key={f.label} className="border-b border-line py-5">
                <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-3">
                  {f.label}
                </dt>
                <dd className="mt-2 text-[15px] leading-7 text-ink">
                  {f.value}
                </dd>
              </div>
            ))}
          </dl>

          <nav aria-label="このページの目次" className="mt-10">
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {toc.map((t, i) => (
                <li key={t.id}>
                  <a
                    href={`#${t.id}`}
                    className="rounded font-mono text-[12px] text-ink-3 transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                  >
                    <span className="mr-1.5">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {t.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </header>

      {/* --- 01 Overview ------------------------------------------------ */}
      <Part id="overview" index={1} title="何を作っているか">
        <div className="max-w-2xl space-y-5">
          {hirolia.overview.map((p, i) => (
            <p key={i} className="text-[15px] leading-8 text-ink-2">
              {p}
            </p>
          ))}
        </div>
      </Part>

      {/* --- 02 Context / Problem --------------------------------------- */}
      <Part id="context" index={2} title="Hirolia 以前に起きていたこと">
        <p className="max-w-2xl text-[16px] leading-8 text-ink">
          {hirolia.context.lead}
        </p>
        <ul className="mt-8 max-w-2xl border-t border-line">
          {hirolia.context.points.map((p) => (
            <li
              key={p}
              className="border-b border-line py-3.5 text-[15px] leading-7 text-ink-2"
            >
              {p}
            </li>
          ))}
        </ul>
        <p className="mt-8 max-w-2xl text-[14px] leading-8 text-ink-3">
          {hirolia.context.caveat}
        </p>
      </Part>

      {/* --- 03 Role ----------------------------------------------------- */}
      <Part id="role" index={3} title="自分が担当した範囲">
        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:gap-x-16 md:gap-y-0">
          <div>
            <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3">
              担当した
            </h3>
            <ul className="mt-5 space-y-3">
              {hirolia.role.mine.map((r) => (
                <li key={r} className="flex gap-3.5">
                  <span
                    aria-hidden="true"
                    className="mt-[11px] h-px w-3.5 shrink-0 bg-ink-3"
                  />
                  <span className="text-[15px] leading-7 text-ink">{r}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3">
              担当していない
            </h3>
            <ul className="mt-5 space-y-3">
              {hirolia.role.notMine.map((r) => (
                <li key={r} className="flex gap-3.5">
                  <span
                    aria-hidden="true"
                    className="mt-[11px] h-px w-3.5 shrink-0 bg-line"
                  />
                  <span className="text-[15px] leading-7 text-ink-3">{r}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-12 max-w-2xl border-t border-line pt-7 text-[14px] leading-8 text-ink-3">
          {hirolia.role.note}
        </p>
      </Part>

      {/* --- 04 From Build to Operation ---------------------------------- */}
      <Part id="operation" index={4} title="作った後に起きたこと">
        <ol className="relative max-w-2xl pl-7 md:pl-9">
          <span
            aria-hidden="true"
            className="absolute left-[3px] top-2 bottom-2 w-px bg-line md:left-[5px]"
          />
          {hirolia.buildToOperation.map((b) => {
            const current = "current" in b && b.current;
            return (
              <li key={b.stage} className="relative pb-10 last:pb-0">
                <span
                  aria-hidden="true"
                  className={`absolute -left-7 top-[7px] h-[7px] w-[7px] rounded-full md:-left-9 ${
                    current ? "bg-accent" : "bg-ink-3"
                  }`}
                />
                <p
                  className={`text-[16px] font-semibold ${
                    current ? "text-accent" : "text-ink"
                  }`}
                >
                  {b.stage}
                </p>
                <p className="mt-2 text-[15px] leading-8 text-ink-2">{b.body}</p>
              </li>
            );
          })}
        </ol>
      </Part>

      {/* --- 05 Challenges ----------------------------------------------- */}
      <Part id="challenges" index={5} title="具体的に詰まったところ">
        <div className="space-y-16">
          {hirolia.challenges.map((c, i) => (
            <div key={c.title}>
              <h3 className="text-[18px] font-bold text-ink md:text-xl">
                <span className="mr-3 font-mono text-[12px] font-normal text-ink-3">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {c.title}
              </h3>
              <dl className="mt-7 border-t border-line">
                {[
                  ["Problem", c.problem],
                  ["Decision / Action", c.action],
                  ["Result / Learning", c.result],
                ].map(([label, body]) => (
                  <div
                    key={label}
                    className="grid grid-cols-1 gap-x-8 gap-y-2 border-b border-line py-6 md:grid-cols-[180px_1fr]"
                  >
                    <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-3 md:pt-1.5">
                      {label}
                    </dt>
                    <dd className="max-w-2xl text-[15px] leading-8 text-ink-2">
                      {body}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </Part>

      {/* --- 06 Impact ---------------------------------------------------- */}
      <Part id="impact" index={6} title="今どうなっているか">
        <ul className="max-w-2xl border-t border-line">
          {hirolia.impact.facts.map((f) => (
            <li
              key={f}
              className="border-b border-line py-4 text-[16px] leading-7 text-ink"
            >
              {f}
            </li>
          ))}
        </ul>
        <p className="mt-8 max-w-2xl text-[14px] leading-8 text-ink-3">
          {hirolia.impact.caveat}
        </p>
      </Part>

      {/* --- 07 Learning --------------------------------------------------- */}
      <Part id="learning" index={7} title="ここから考えるようになったこと">
        <p className="max-w-3xl text-[20px] font-medium leading-[1.8] text-ink md:text-[26px]">
          {hirolia.learning.thesis}
        </p>
        <p className="mt-8 max-w-2xl text-[15px] leading-8 text-ink-2">
          {hirolia.learning.body}
        </p>
        <ul className="mt-10 max-w-2xl space-y-3">
          {hirolia.learning.points.map((p) => (
            <li key={p} className="flex gap-3.5">
              <span
                aria-hidden="true"
                className="mt-[13px] h-px w-3.5 shrink-0 bg-ink-3"
              />
              <span className="text-[15px] leading-8 text-ink">{p}</span>
            </li>
          ))}
        </ul>
        <p className="mt-10 max-w-2xl border-t border-line pt-7 text-[14px] leading-8 text-ink-3">
          {hirolia.learning.caveat}
        </p>
      </Part>

      {/* --- 08 Tech -------------------------------------------------------- */}
      <Part id="tech" index={8} title="使っている技術">
        <ul className="max-w-2xl border-t border-line">
          {hirolia.tech.map((t) => (
            <li
              key={t}
              className="border-b border-line py-3.5 text-[14px] leading-7 text-ink-2"
            >
              {t}
            </li>
          ))}
        </ul>
        <p className="mt-8 max-w-2xl text-[14px] leading-8 text-ink-3">
          技術の選定そのものより、これを実店舗の営業時間中に動かし続けることの方に時間を使っています。
        </p>

        <div className="mt-14 border-t border-line pt-10">
          <Link
            href={back.href}
            className="inline-flex items-center gap-2 rounded text-[14px] text-ink-2 transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            <FaArrowLeft size={11} />
            {back.label}
          </Link>
        </div>
      </Part>
    </article>
  );
}
