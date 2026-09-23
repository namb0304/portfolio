"use client";

/**
 * Home v3 (polished) — Projects。
 *
 * 前の版の問題:
 *   - Hirolia カードが情報を詰め込んだだけに見えた
 *   - 他の作品は画像を置いただけだった
 *   - 作品ごとの意味・個性が分からなかった
 *
 * 変えたこと:
 *   - Featured は Problem → Role → Impact の「流れ」を持つ（= visual motif）
 *   - 長い技術一覧をカードから外した（詳細ページへ）
 *   - 4 枚それぞれ形を変えた: featured / visual dominant / vertical / accent card
 *   - 作品ごとの固有色を hover 時だけ縁に出す。静止時はサイトのトーンを保つ。
 */
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight, FaArrowUpRightFromSquare, FaGithub } from "react-icons/fa6";
import Flow from "./Flow";
import { usePointerLight } from "./motion";
import { v3Featured, v3Projects } from "@/config/v3";

/**
 * カードの共通の器。
 * hover で ①2〜3px 浮く ②縁が作品の色に寄る ③ポインタ位置に淡い光が出る。
 * 光は要素の内側だけに出るので、カーソル追従の装飾にはならない。
 */
function Card({
  accent,
  className = "",
  children,
}: {
  accent: string;
  className?: string;
  children: React.ReactNode;
}) {
  const { ref, onPointerMove, onPointerLeave, active } =
    usePointerLight<HTMLDivElement>();

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      style={
        {
          "--card-accent": accent,
          "--mx": "50%",
          "--my": "50%",
        } as React.CSSProperties
      }
      className={`group relative overflow-hidden rounded-[10px] border border-[var(--v3-rule)] transition-[transform,border-color,box-shadow] duration-200 ease-out hover:border-[var(--card-accent)]/55 hover:shadow-[0_18px_40px_-24px_rgba(0,0,0,0.9)] motion-safe:hover:-translate-y-[3px] ${className}`}
    >
      {active && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(420px circle at var(--mx) var(--my), color-mix(in srgb, var(--card-accent) 11%, transparent), transparent 62%)",
          }}
        />
      )}
      <div className="relative z-[2] flex h-full flex-col">{children}</div>
    </div>
  );
}

/** 作品ごとの色を示す小さな印 */
function Chip({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-[12px] text-[var(--v3-fg-2)]">
      <span
        aria-hidden="true"
        className="h-[7px] w-[7px] rounded-full transition-transform duration-200 group-hover:scale-125"
        style={{ background: color }}
      />
      {children}
    </span>
  );
}

/** 実画像がない箇所。偽の画面は描かず、入る画の構図だけ線で示す。 */
function Pending({
  label,
  className = "",
}: {
  label: string;
  className?: string;
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
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center p-10"
      >
        <div className="relative w-full max-w-[280px] transition-transform duration-300 ease-out motion-safe:group-hover:-translate-y-1">
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
      <div className="relative p-5">
        <p className="text-[11px] tracking-[0.1em] text-[var(--v3-fg-2)]">
          画像 準備中
        </p>
        <p className="mt-1 text-[14px] font-medium text-[var(--v3-fg)]">{label}</p>
      </div>
    </div>
  );
}

export default function Work() {
  const txc = v3Projects.find((p) => p.span === "wide")!;
  const train = v3Projects.find((p) => p.span === "tall")!;
  const progate = v3Projects.find((p) => p.span === "strip")!;

  return (
    <section id="projects" className="scroll-mt-20">
      <div className="mx-auto max-w-[1180px] px-6 py-24 md:px-10 md:py-32">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-[26px] font-bold tracking-tight text-[var(--v3-fg)] md:text-[32px]">
            つくったもの
          </h2>
          <p className="text-[13px] text-[var(--v3-fg-2)]">
            いちばん長く関わっているものから
          </p>
        </div>

        {/* ===== Featured: Hirolia ==================================== */}
        <Card accent={v3Featured.accent} className="mt-10 bg-[var(--v3-surface)]/40">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,440px)]">
            <div className="order-2 p-7 md:p-9 lg:order-1">
              <Chip color={v3Featured.accent}>{v3Featured.tagline}</Chip>
              <h3 className="mt-3 text-[28px] font-bold tracking-tight text-[var(--v3-fg)] md:text-[36px]">
                {v3Featured.name}
              </h3>
              <p className="mt-4 max-w-[36rem] text-[15px] leading-8 text-[var(--v3-fg-2)]">
                {v3Featured.summary}
              </p>
              <p className="mt-4 text-[13px] text-[var(--v3-fg-2)]">
                {v3Featured.team}
                <span className="mx-2.5 text-[var(--v3-rule)]">|</span>
                {v3Featured.period}
              </p>

              <Link
                href={v3Featured.href}
                className="group/cta mt-7 inline-flex items-center gap-2.5 rounded-[4px] bg-[var(--v3-fg)] px-6 py-3 text-[14px] font-semibold text-[var(--v3-bg)] transition-opacity duration-200 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--v3-accent)]"
              >
                詳細を見る
                <FaArrowRight
                  size={11}
                  className="transition-transform duration-200 ease-out group-hover/cta:translate-x-1"
                />
              </Link>
            </div>

            <div className="order-1 lg:order-2">
              <Pending
                label={v3Featured.shot.label}
                className="h-[240px] w-full lg:h-full lg:min-h-[380px]"
              />
            </div>
          </div>

          {/* 課題 → 担当 → 結果。この1本の線がサイト全体の motif。 */}
          <div className="border-t border-[var(--v3-rule)] px-7 py-7 md:px-9">
            <Flow nodes={v3Featured.flow} accent={v3Featured.accent} />
          </div>
        </Card>

        {/* ===== Secondary ============================================ */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Thank x Chain — visual dominant。画像を大きく、文字は最小限。 */}
          <Card accent={txc.accent} className="lg:col-span-7">
            <div className="relative aspect-[16/9] overflow-hidden">
              <Image
                src={txc.shot.src!}
                alt={`${txc.name} の画面`}
                width={2940}
                height={1662}
                className="h-full w-full object-cover transition-transform duration-[400ms] ease-out motion-safe:group-hover:scale-[1.02]"
              />
            </div>
            <div className="flex flex-1 flex-col p-6">
              <Chip color={txc.accent}>{txc.tagline}</Chip>
              <h3 className="mt-2.5 text-[22px] font-bold tracking-tight text-[var(--v3-fg)]">
                {txc.name}
              </h3>
              <p className="mt-3 max-w-[40rem] text-[14px] leading-7 text-[var(--v3-fg-2)]">
                {txc.summary}
              </p>
              <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-6">
                <p className="text-[12px] text-[var(--v3-fg-2)]">
                  {txc.role}
                  <span className="mx-2 text-[var(--v3-rule)]">|</span>
                  {txc.status}
                </p>
                <a
                  href={txc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded text-[13px] text-[var(--v3-fg)] transition-colors duration-200 hover:text-[var(--card-accent)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--v3-accent)]"
                >
                  <FaArrowUpRightFromSquare size={11} />
                  開く
                </a>
              </div>
            </div>
          </Card>

          {/* 電車遅延情報アプリ — 縦。実画像が端末のスクショなので、端末として見せる。 */}
          <Card accent={train.accent} className="lg:col-span-5">
            <div className="relative h-[260px] overflow-hidden bg-[var(--v3-surface)] sm:h-[300px]">
              <Image
                src={train.shot.src!}
                alt={`${train.name} の画面`}
                width={756}
                height={1494}
                className="h-full w-full object-cover object-top transition-transform duration-[400ms] ease-out motion-safe:group-hover:scale-[1.02]"
              />
              {/* 画面下端を地の色へ落として、カードの文字側と馴染ませる */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-16"
                style={{
                  background:
                    "linear-gradient(to bottom, transparent, var(--v3-bg))",
                }}
              />
            </div>
            <div className="flex flex-1 flex-col p-6">
              <Chip color={train.accent}>{train.tagline}</Chip>
              <h3 className="mt-2.5 text-[19px] font-bold tracking-tight text-[var(--v3-fg)]">
                {train.name}
              </h3>
              <p className="mt-2.5 text-[14px] leading-7 text-[var(--v3-fg-2)]">
                {train.summary}
              </p>
              <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-6">
                <p className="text-[12px] text-[var(--v3-fg-2)]">{train.team}</p>
                <a
                  href={train.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded text-[13px] text-[var(--v3-fg)] transition-colors duration-200 hover:text-[var(--card-accent)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--v3-accent)]"
                >
                  <FaGithub size={13} />
                  GitHub
                </a>
              </div>
            </div>
          </Card>
        </div>

        {/* Progate — accent card。画像がないので、賞そのものを図像として扱う。 */}
        <Card accent={progate.accent} className="mt-6">
          <div className="grid grid-cols-1 items-center gap-6 p-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-10 sm:px-8">
            <div>
              <Chip color={progate.accent}>{progate.tagline}</Chip>
              <h3 className="mt-2 text-[18px] font-bold tracking-tight text-[var(--v3-fg)]">
                {progate.name}
              </h3>
              <p className="mt-2 max-w-[46rem] text-[13px] leading-6 text-[var(--v3-fg-2)]">
                {progate.summary}
              </p>
            </div>
            {/* 画像の代わりに、受賞そのものを見せる */}
            <div className="flex items-center gap-4 sm:justify-end">
              <span className="rounded-[6px] border border-[var(--v3-accent)]/35 px-4 py-2.5 text-center">
                <span className="block text-[11px] text-[var(--v3-fg-2)]">
                  2024
                </span>
                <span className="mt-0.5 block text-[15px] font-bold text-[var(--v3-accent)]">
                  {progate.status}
                </span>
              </span>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
