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
import SectionHead from "./SectionHead";
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
    <div className="relative pb-6 pl-9 sm:pb-0 sm:pl-12">
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
        <div className="absolute bottom-0 left-0 w-[86px] overflow-hidden rounded-[14px] border-[4px] border-[var(--v3-rule)] bg-[var(--v3-bg)] shadow-[0_22px_48px_-16px_rgba(0,0,0,0.95)] transition-transform duration-[600ms] ease-out sm:-bottom-4 sm:w-[104px] motion-safe:group-hover:-translate-y-2">
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
      <div className="mx-auto max-w-[1180px] px-6 pt-28 md:px-10 md:pt-40">
        <SectionHead
          level="primary"
          title="つくったもの"
          note="いちばん長く関わっているものから。Hirolia は実際の店舗で動いています。"
        />

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
          className="group relative mt-10 overflow-hidden rounded-[20px] border border-[var(--v3-rule)] bg-[var(--v3-surface)]/40 transition-[box-shadow] duration-300 ease-out hover:shadow-[0_18px_44px_-34px_rgba(0,0,0,0.9)]"
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
            </>
          )}

          {/*
            以前は 画像 → テキスト → Problem/Role/Current の縦積みで、
            カード単体が 1280x900 のほぼ全画面（893px）を占有していた。
            説明を左 42% / visual を右 58% の非対称2カラムにして圧縮する。
          */}
          <div className="relative z-[2] grid grid-cols-1 gap-x-10 gap-y-8 p-7 md:p-8 lg:grid-cols-[minmax(0,42fr)_minmax(0,58fr)] lg:items-center lg:gap-x-12">
            {/* ---------- 左: 説明 ---------- */}
            <div>
              <span className="inline-flex items-center gap-2 text-[12px] text-[var(--v3-fg-2)]">
                <span
                  aria-hidden="true"
                  className="h-[7px] w-[7px] rounded-full transition-transform duration-200 group-hover:scale-125"
                  style={{ background: v3Featured.accent }}
                />
                {v3Featured.tagline}
              </span>

              <h3 className="mt-2.5 text-[27px] font-bold tracking-tight text-[var(--v3-fg)] md:text-[32px]">
                {v3Featured.name}
              </h3>

              <p className="mt-3 text-[14px] leading-7 text-[var(--v3-fg-2)] [word-break:auto-phrase]">
                {v3Featured.summary}
              </p>

              <p className="mt-3 text-[12px] text-[var(--v3-fg-2)]">
                {v3Featured.team}
                <span className="mx-2 text-[var(--v3-rule)]">|</span>
                {v3Featured.period}
              </p>

              {/*
                Problem / My Role / Current は下部に横帯で再掲していたが、
                左本文と内容が重複していたのでここへ1回だけ統合した。
                「つながり」の motif は縦向きで維持する。
              */}
              <div className="mt-6">
                <Flow
                  nodes={v3Featured.flow}
                  accent={v3Featured.accent}
                  orientation="vertical"
                />
              </div>

              <ul className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
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
                className="group/cta mt-6 inline-flex items-center gap-2.5 rounded-[10px] bg-[var(--v3-fg)] px-6 py-3 text-[14px] font-semibold text-[var(--v3-bg)] transition-opacity duration-200 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--v3-accent)]"
              >
                詳細を見る
                <FaArrowRight
                  size={11}
                  className="transition-transform duration-200 ease-out group-hover/cta:translate-x-1"
                />
              </Link>
            </div>

            {/* ---------- 右: 実画面 ---------- */}
            <div className="order-first lg:order-none">
              <HiroliaComposition />
            </div>
          </div>
        </div>

      </div>

      {/* ===== Project Rail（画面端まで抜けさせる） =================== */}
      <ProjectRail />

      {/*
        Hirolia で視点が「作る」から「使われ続ける」へ変わったことが、
        次の Internships へ進む前に一度だけ立ち上がるようにする。
        新しいセクションは足さず、1行と余白だけで渡す。
      */}
      <div className="mx-auto max-w-[1180px] px-6 pt-24 pb-28 md:px-10 md:pt-32 md:pb-40">
        <p className="max-w-[30rem] text-[19px] font-medium leading-[1.9] text-[var(--v3-fg)] [word-break:auto-phrase] md:text-[23px]">
          「技術的に動くもの」と「現場で使われ続けるもの」は違う。
        </p>
        <p className="mt-4 max-w-[30rem] text-[14px] leading-8 text-[var(--v3-fg-2)] [word-break:auto-phrase]">
          店舗に入れてから知りました。ここから、外に出て学ぶことが増えました。
        </p>
      </div>
    </section>
  );
}
