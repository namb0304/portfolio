"use client";

/**
 * Home v3 — Projects。Featured + Project Rail の2層構造。
 *
 * Featured (Hirolia): 最重要経験であることは維持しつつ、Home では圧縮する。
 *   出すのは 何か / 体制 / Problem・My Role・Current / 主要技術3点 / 詳細CTA まで。
 *   長い担当一覧と技術一覧は /work/hirolia へ逃がす。
 * Rail: 「ほかにもつくっている」ことが一目で分かるように、次のカードを覗かせる。
 */
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import Flow from "./Flow";
import ProjectRail from "./ProjectRail";
import { useProximity } from "./motion";
import { TECH } from "./techIcons";
import { v3Featured } from "@/config/v3";

/**
 * Hirolia の視覚。
 * 実画面（public/projects/hirolia-menu.png）があればそれを出し、
 * 無ければ構図だけ線で示したワイヤーフレームへ自動で落ちる。
 * モバオル等、別プロダクトの画面を Hirolia の実画面として使うことはしない。
 */
function Wireframe({ label }: { label: string }) {
  return (
    <>
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
        className="absolute inset-0 flex items-center justify-center p-8"
      >
        <div className="relative w-full max-w-[240px] transition-transform duration-500 ease-out motion-safe:group-hover:-translate-y-1">
          <div className="rounded-[10px] border border-[var(--v3-rule)] bg-[var(--v3-bg)]/40">
            <div className="border-b border-[var(--v3-rule)] px-3 py-2">
              <span className="block h-[5px] w-14 rounded-full bg-[var(--v3-rule)]" />
            </div>
            <div className="aspect-[16/10]" />
          </div>
          <div className="absolute -bottom-6 -left-5 w-[58px] rounded-[10px] border border-[var(--v3-rule)] bg-[var(--v3-bg)]/60">
            <div className="aspect-[9/16]" />
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 p-5">
        <p className="text-[11px] tracking-[0.1em] text-[var(--v3-fg-2)]">
          画像 準備中
        </p>
        <p className="mt-1 text-[14px] font-medium text-[var(--v3-fg)]">{label}</p>
      </div>
    </>
  );
}

/**
 * Hirolia の視覚。
 * サービスサイト（横長）をブラウザ枠に**切り取らず全体**入れ、
 * その左下に来店客の実機画面を重ねる。
 * 「店舗が見るサイト」と「客が触る画面」の2面があることが1枚で伝わる構図。
 */
function HiroliaComposition() {
  const [lpFailed, setLpFailed] = useState(false);
  const [phoneFailed, setPhoneFailed] = useState(false);
  const shot = v3Featured.shot;
  const phone = v3Featured.phoneShot;
  const lpSrc = "src" in shot ? shot.src : null;

  if (!lpSrc || lpFailed) {
    return (
      <div className="relative h-[220px] w-full overflow-hidden rounded-[12px] bg-[var(--v3-surface)] md:h-[300px]">
        <Wireframe label={shot.label} />
      </div>
    );
  }

  return (
    <div className="relative pb-6 pl-10 sm:pb-0 sm:pl-16">
      {/* --- ブラウザ枠。LP は object-contain 相当で全体が見える --- */}
      <figure className="overflow-hidden rounded-[12px] border border-[var(--v3-rule)] bg-[var(--v3-bg)] shadow-[0_24px_60px_-30px_rgba(0,0,0,0.9)]">
        <figcaption className="flex items-center gap-2 border-b border-[var(--v3-rule)] px-3 py-2">
          <span className="h-[7px] w-[7px] rounded-full bg-[var(--v3-rule)]" />
          <span className="text-[10px] tracking-wide text-[var(--v3-fg-2)]">
            サービスサイト
          </span>
        </figcaption>
        <div className="relative" style={{ aspectRatio: "2940 / 1912" }}>
          <Image
            src={lpSrc}
            alt={"alt" in shot ? shot.alt : "Hirolia のサービスサイト"}
            width={"width" in shot ? shot.width : 2940}
            height={"height" in shot ? shot.height : 1912}
            onError={() => setLpFailed(true)}
            className="h-full w-full object-cover transition-transform duration-[600ms] ease-out motion-safe:group-hover:scale-[1.015]"
          />
        </div>
      </figure>

      {/* --- 来店客の実機画面。枠の左下に重ねる --- */}
      {!phoneFailed && (
        <div className="absolute bottom-0 left-0 w-[92px] overflow-hidden rounded-[16px] border-[5px] border-[var(--v3-rule)] bg-[var(--v3-bg)] shadow-[0_22px_48px_-16px_rgba(0,0,0,0.95)] transition-transform duration-[600ms] ease-out sm:-bottom-5 sm:w-[124px] motion-safe:group-hover:-translate-y-2">
          <div className="relative" style={{ aspectRatio: "792 / 1628" }}>
            <Image
              src={phone.src}
              alt={phone.alt}
              width={phone.width}
              height={phone.height}
              onError={() => setPhoneFailed(true)}
              className="h-full w-full object-cover object-top"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default function Work() {
  // カードの外 100px から反応が始まる近接検知
  const { ref, active } = useProximity<HTMLDivElement>();

  return (
    <section id="projects" className="scroll-mt-24">
      <div className="mx-auto max-w-[1180px] px-6 pt-24 md:px-10 md:pt-32">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-[26px] font-bold tracking-tight text-[var(--v3-fg)] md:text-[32px]">
            つくったもの
          </h2>
          <p className="text-[13px] text-[var(--v3-fg-2)]">
            いちばん長く関わっているものから
          </p>
        </div>

        {/* ===== Featured: Hirolia ==================================== */}
        <div
          ref={ref}
          style={
            {
              "--card-accent": v3Featured.accent,
              "--mx": "50%",
              "--my": "50%",
              "--prox": "0",
            } as React.CSSProperties
          }
          className="group relative mt-10 overflow-hidden rounded-[20px] border border-[var(--v3-rule)] bg-[var(--v3-surface)]/40 transition-[transform,box-shadow] duration-300 ease-out hover:shadow-[0_24px_60px_-32px_rgba(0,0,0,0.95)] motion-safe:hover:-translate-y-[2px]"
        >
          {active && (
            <>
              {/*
                このサイトの代表的な「気持ちよさ」。
                面を塗るのではなく、**縁の1pxだけ**がポインタの近くで光る。
                強度は --prox（カードまでの距離）で連続的に変わるので、
                近づくにつれて滲み出し、離れると消える。ON/OFF はしない。
              */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-[3] rounded-[20px]"
                style={{
                  /* 1px / 72% では画面上でほぼ知覚できなかったので、
                     髪の毛一本ぶん太くし、色も濃くして「気づく」強さに寄せた。 */
                  padding: "1.5px",
                  opacity: "var(--prox)",
                  background:
                    "radial-gradient(300px circle at var(--mx) var(--my), color-mix(in srgb, var(--card-accent) 98%, transparent), transparent 58%)",
                  /* 2層マスクの差分で「縁の1pxだけ」を残す。
                     `#000 0 0` は 0px 指定と解釈されてマスクが空になるため、
                     省略形の `linear-gradient(#000, #000)` を使う。 */
                  WebkitMask:
                    "linear-gradient(#000, #000) content-box, linear-gradient(#000, #000)",
                  mask: "linear-gradient(#000, #000) content-box, linear-gradient(#000, #000)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                  transition: "opacity 220ms ease-out",
                }}
              />
              {/* 面の奥行き。色は付けず、白をごく薄く。カード内でだけ効かせる。 */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-[1] opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(500px circle at var(--mx) var(--my), rgba(255,255,255,0.035), transparent 48%)",
                }}
              />
            </>
          )}

          {/* サービスサイト + 実機画面。カードの上部に1つの composition として置く。 */}
          <div className="relative z-[2] px-6 pt-7 md:px-8 md:pt-8">
            <div className="mx-auto max-w-[760px]">
              <HiroliaComposition />
            </div>
          </div>

          <div className="relative z-[2] grid grid-cols-1 gap-x-10 p-7 md:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,300px)] lg:items-end">
            <div>
              <span className="inline-flex items-center gap-2 text-[12px] text-[var(--v3-fg-2)]">
                <span
                  aria-hidden="true"
                  className="h-[7px] w-[7px] rounded-full transition-transform duration-200 group-hover:scale-125"
                  style={{ background: v3Featured.accent }}
                />
                {v3Featured.tagline}
              </span>

              <h3 className="mt-3 text-[28px] font-bold tracking-tight text-[var(--v3-fg)] md:text-[34px]">
                {v3Featured.name}
              </h3>

              <p className="mt-3 max-w-[34rem] text-[14px] leading-7 text-[var(--v3-fg-2)]">
                {v3Featured.summary}
              </p>

              <p className="mt-3 text-[13px] text-[var(--v3-fg-2)]">
                {v3Featured.team}
                <span className="mx-2.5 text-[var(--v3-rule)]">|</span>
                {v3Featured.period}
              </p>
            </div>

            <div className="mt-6 lg:mt-0">
              {/* 主要技術は3点まで。残りは詳細ページ。 */}
              <ul className="flex flex-wrap items-center gap-x-4 gap-y-2">
                {v3Featured.tech.map((k) => {
                  const t = TECH[k];
                  if (!t) return null;
                  const { Icon } = t;
                  return (
                    <li
                      key={k}
                      style={{ "--brand": t.brand } as React.CSSProperties}
                      className="group/tech flex items-center gap-1.5 text-[11px] text-[var(--v3-fg-2)] transition-colors duration-200 hover:text-[var(--v3-fg)]"
                    >
                      <Icon
                        className="text-[13px] transition-[color,filter] duration-200 group-hover/tech:text-[var(--brand)] group-hover/tech:[filter:drop-shadow(0_0_6px_var(--brand))]"
                        aria-hidden="true"
                      />
                      {t.label}
                    </li>
                  );
                })}
              </ul>

              <Link
                href={`${v3Featured.href}?from=lab`}
                className="group/cta mt-5 inline-flex items-center gap-2.5 rounded-[10px] bg-[var(--v3-fg)] px-6 py-3 text-[14px] font-semibold text-[var(--v3-bg)] transition-opacity duration-200 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--v3-accent)]"
              >
                詳細を見る
                <FaArrowRight
                  size={11}
                  className="transition-transform duration-200 ease-out group-hover/cta:translate-x-1"
                />
              </Link>
            </div>
          </div>

          {/* Problem → My Role → Current。数字カードは並べない。 */}
          <div className="relative z-[2] border-t border-[var(--v3-rule)] px-7 pb-7 pt-6 md:px-8">
            <Flow nodes={v3Featured.flow} accent={v3Featured.accent} />
          </div>
        </div>

      </div>

      {/* ===== Project Rail（画面端まで抜けさせる） =================== */}
      <ProjectRail />

      <div className="pb-24 md:pb-32" />
    </section>
  );
}
