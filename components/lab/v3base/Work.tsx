/**
 * Portfolio Home v3 — Selected Projects。
 *
 * 「作品を一覧で眺められる楽しさ」を取り戻す区画。
 * ただしカードを全部同じ大きさにはしない（featured / wide / tall / strip の4種）。
 * Hirolia だけ featured。ページ全体の主役にはしない。
 */
import Image from "next/image";
import Link from "next/link";
import { FaArrowUpRightFromSquare, FaArrowRight } from "react-icons/fa6";
import { v3Featured, v3Projects } from "@/config/v3";

/**
 * 実画像がないものの置き場所。
 * 偽の画面を描いて実物と誤認させない。線画で「どんな画が入るか」だけ示す。
 */
function Pending({
  label,
  className = "",
  wireframe = false,
}: {
  label: string;
  className?: string;
  wireframe?: boolean;
}) {
  return (
    <div
      className={`relative flex items-end overflow-hidden bg-[var(--v3-surface)] ${className}`}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, transparent 0 10px, var(--v3-rule) 10px 11px)",
        }}
      />

      {/* 入る画の構図だけを線で示す。中身は描かない。 */}
      {wireframe && (
        <div
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center p-10"
        >
          <div className="relative w-full max-w-[280px]">
            <div className="rounded-[6px] border border-[var(--v3-rule)] bg-[var(--v3-bg)]/40">
              <div className="border-b border-[var(--v3-rule)] px-3 py-2">
                <span className="block h-[5px] w-14 rounded-full bg-[var(--v3-rule)]" />
              </div>
              <div className="aspect-[16/10]" />
            </div>
            <div className="absolute -bottom-7 -left-6 w-[68px] rounded-[10px] border border-[var(--v3-rule)] bg-[var(--v3-bg)]/60">
              <div className="aspect-[9/16]" />
            </div>
          </div>
        </div>
      )}

      <div className="relative p-5">
        <p className="text-[11px] tracking-[0.1em] text-[var(--v3-fg-2)]">
          画像 準備中
        </p>
        <p className="mt-1 text-[14px] font-medium text-[var(--v3-fg)]">{label}</p>
      </div>
    </div>
  );
}

/** 作品ごとの固有色を示す小さな印。サイトのアクセントとは別物であることを示す。 */
function Chip({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-[12px] text-[var(--v3-fg-2)]">
      <span
        aria-hidden="true"
        className="h-[7px] w-[7px] rounded-full"
        style={{ background: color }}
      />
      {children}
    </span>
  );
}

function Meta({ rows }: { rows: [string, string][] }) {
  return (
    <dl className="mt-5 space-y-2">
      {rows.map(([k, v]) => (
        <div key={k} className="flex gap-4 text-[13px] leading-6">
          <dt className="w-[68px] shrink-0 text-[var(--v3-fg-2)]">{k}</dt>
          <dd className="text-[var(--v3-fg)]">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

export default function Work() {
  const wide = v3Projects.find((p) => p.span === "wide")!;
  const tall = v3Projects.find((p) => p.span === "tall")!;
  const strip = v3Projects.find((p) => p.span === "strip")!;

  return (
    <section id="base-projects" className="scroll-mt-20 border-t border-[var(--v3-rule)]">
      <div className="mx-auto max-w-[1180px] px-6 py-20 md:px-10 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-[26px] font-bold tracking-tight text-[var(--v3-fg)] md:text-[32px]">
            つくったもの
          </h2>
          <p className="text-[13px] text-[var(--v3-fg-2)]">
            いちばん長く関わっているものから
          </p>
        </div>

        {/* ---- Featured: Hirolia ------------------------------------- */}
        <article className="group mt-10 overflow-hidden rounded-[10px] border border-[var(--v3-rule)] bg-[var(--v3-surface)]/40 transition-colors hover:border-[var(--v3-fg-2)]/45">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,460px)]">
            <div className="order-2 p-7 md:p-9 lg:order-1">
              <Chip color={v3Featured.accent}>{v3Featured.tagline}</Chip>
              <h3 className="mt-3 text-[28px] font-bold tracking-tight text-[var(--v3-fg)] md:text-[34px]">
                {v3Featured.name}
              </h3>
              <p className="mt-4 max-w-[38rem] text-[15px] leading-8 text-[var(--v3-fg-2)]">
                {v3Featured.summary}
              </p>

              <Meta
                rows={[
                  ["チーム", v3Featured.team],
                  ["担当", v3Featured.role],
                  ["状況", v3Featured.status],
                  ["期間", v3Featured.period],
                ]}
              />

              <p className="mt-5 text-[12px] leading-6 text-[var(--v3-fg-2)]">
                {v3Featured.tech.join("  ·  ")}
              </p>

              <Link
                href={v3Featured.href}
                className="mt-7 inline-flex items-center gap-2 rounded-[4px] bg-[var(--v3-fg)] px-6 py-3 text-[14px] font-semibold text-[var(--v3-bg)] transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--v3-accent)]"
              >
                詳細を見る
                <FaArrowRight
                  size={11}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            </div>

            <div className="order-1 lg:order-2">
              <Pending
                label={v3Featured.shot.label}
                wireframe
                className="h-[240px] w-full lg:h-full lg:min-h-[400px]"
              />
            </div>
          </div>
        </article>

        {/* ---- wide + tall ------------------------------------------- */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Thank x Chain — 横長。実画像あり。 */}
          <article className="group overflow-hidden rounded-[10px] border border-[var(--v3-rule)] transition-colors hover:border-[var(--v3-fg-2)]/45 lg:col-span-7">
            <div className="relative aspect-[16/9] overflow-hidden">
              <Image
                src={wide.shot.src!}
                alt={`${wide.name} の画面`}
                width={2940}
                height={1662}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>
            <div className="p-6">
              <Chip color={wide.accent}>{wide.tagline}</Chip>
              <h3 className="mt-2.5 text-[20px] font-bold tracking-tight text-[var(--v3-fg)]">
                {wide.name}
              </h3>
              <p className="mt-2.5 text-[14px] leading-7 text-[var(--v3-fg-2)]">
                {wide.summary}
              </p>
              <Meta
                rows={[
                  ["担当", wide.role],
                  ["体制", wide.team],
                  ["結果", wide.status],
                ]}
              />
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                <p className="text-[12px] text-[var(--v3-fg-2)]">
                  {wide.tech.join("  ·  ")}
                </p>
                <a
                  href={wide.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded text-[13px] text-[var(--v3-fg)] transition-colors hover:text-[var(--v3-accent)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--v3-accent)]"
                >
                  <FaArrowUpRightFromSquare size={11} />
                  開く
                </a>
              </div>
            </div>
          </article>

          {/* 電車遅延情報アプリ — 縦長。実画像が縦なので、そのまま縦に使う。 */}
          <article className="group flex flex-col overflow-hidden rounded-[10px] border border-[var(--v3-rule)] transition-colors hover:border-[var(--v3-fg-2)]/45 lg:col-span-5">
            <div className="relative h-[260px] overflow-hidden bg-[var(--v3-surface)] sm:h-[320px]">
              <Image
                src={tall.shot.src!}
                alt={`${tall.name} の画面`}
                width={756}
                height={1494}
                className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>
            <div className="flex flex-1 flex-col p-6">
              <Chip color={tall.accent}>{tall.tagline}</Chip>
              <h3 className="mt-2.5 text-[20px] font-bold tracking-tight text-[var(--v3-fg)]">
                {tall.name}
              </h3>
              <p className="mt-2.5 text-[14px] leading-7 text-[var(--v3-fg-2)]">
                {tall.summary}
              </p>
              <Meta
                rows={[
                  ["担当", tall.role],
                  ["体制", tall.team],
                  ["結果", tall.status],
                ]}
              />
              <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-5">
                <p className="text-[12px] text-[var(--v3-fg-2)]">
                  {tall.tech.join("  ·  ")}
                </p>
                <a
                  href={tall.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded text-[13px] text-[var(--v3-fg)] transition-colors hover:text-[var(--v3-accent)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--v3-accent)]"
                >
                  <FaArrowUpRightFromSquare size={11} />
                  GitHub
                </a>
              </div>
            </div>
          </article>
        </div>

        {/* ---- strip ------------------------------------------------- */}
        <article className="mt-6 grid grid-cols-1 items-center gap-6 rounded-[10px] border border-[var(--v3-rule)] p-6 transition-colors hover:border-[var(--v3-fg-2)]/45 sm:grid-cols-[150px_minmax(0,1fr)_auto]">
          <Pending label={strip.shot.label!} className="h-[92px] rounded-[6px]" />
          <div>
            <Chip color={strip.accent}>{strip.tagline}</Chip>
            <h3 className="mt-2 text-[17px] font-bold tracking-tight text-[var(--v3-fg)]">
              {strip.name}
            </h3>
            <p className="mt-1.5 max-w-[44rem] text-[13px] leading-6 text-[var(--v3-fg-2)]">
              {strip.summary}
            </p>
          </div>
          <p className="text-[12px] text-[var(--v3-fg-2)] sm:text-right">
            {strip.status}
          </p>
        </article>
      </div>
    </section>
  );
}
