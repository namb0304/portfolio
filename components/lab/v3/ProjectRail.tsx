"use client";

/**
 * Project Rail — 「ゆっくり流れ続ける展示」。
 *
 * carousel（停止 → 1枚送り → 停止）をやめ、常時一定速度で流し続ける。
 * ユーザーが触った瞬間に操作権がユーザーへ移り、手を離して 2 秒後に
 * 現在位置からそっと流れ始める。自動とユーザー操作を同時に走らせない。
 *
 * 実装の要点:
 *  - ネイティブの overflow-x コンテナ。trackpad の横スクロールと touch swipe は
 *    ブラウザ任せにするのが一番滑らかで、縦スクロールも奪わない。
 *  - rAF で scrollLeft を少しずつ進める（CSS animation だとユーザー操作と同期できない）。
 *  - カード集合を3セット描画し、scroll イベントで中央セットへ正規化する。
 *    端に到達しないので loop の境目が見えない。
 *  - 複製したセットは aria-hidden + tabIndex=-1。読み上げとタブ順は1セット分だけ。
 */
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { FaArrowUpRightFromSquare, FaGithub } from "react-icons/fa6";
import { TECH } from "./techIcons";
import { usePrefersReducedMotion } from "./motion";
import { v3Rail } from "@/config/v3";

/**
 * 自動で流れる速さ。22 → 30px/sec。
 * 30px/sec はカード1枚（約360px）が12秒で通り過ぎる速さで、
 * 本文を目で追える上限のあたり。これ以上上げると読めない marquee になる。
 */
const AUTO_SPEED = 30; // px / sec
/** 最後の操作から、これだけ経ったら再開する */
const RESUME_DELAY = 1500; // ms
/** 0 → AUTO_SPEED へ戻すのにかける時間。急に戻すと「勝手に動いた」と感じる。 */
const RAMP = 320; // ms
/** レール上を通過しただけで止めないための滞在時間 */
const HOVER_DWELL = 200; // ms
/** これ以上動いたらドラッグとみなし、離したときのクリックを無効にする */
const DRAG_SLOP = 6; // px

const SETS = 3;

type Item = (typeof v3Rail)[number];

/* -------------------------------------------------------------------- card */

function TechRow({ keys }: { keys: readonly string[] }) {
  return (
    <ul className="flex flex-wrap items-center gap-x-3.5 gap-y-2">
      {keys.map((k) => {
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
  );
}

function RailCard({
  item,
  clone,
  suppressClick,
}: {
  item: Item;
  clone: boolean;
  suppressClick: React.MutableRefObject<boolean>;
}) {
  const before = "beforeImage" in item ? item : null;

  return (
    <li
      className="shrink-0"
      style={{ width: `min(${item.width}px, 82vw)` }}
      aria-hidden={clone || undefined}
    >
      <article
        style={{ "--card-accent": item.accent } as React.CSSProperties}
        className="group/card flex h-full flex-col"
      >
        {/* --- visual: 作品ごとに高さと収め方を変える --- */}
        <div
          className="relative overflow-hidden rounded-[18px] bg-[var(--v3-surface)] ring-1 ring-[var(--v3-rule)] transition-[box-shadow,transform] duration-300 ease-out group-hover/card:ring-[var(--card-accent)]/50 motion-safe:group-hover/card:-translate-y-1"
          style={{ height: item.imageH }}
        >
          <Image
            src={item.image}
            alt={`${item.name} の画面`}
            width={1600}
            height={1200}
            draggable={false}
            className={`h-full w-full select-none transition-transform duration-[500ms] ease-out motion-safe:group-hover/card:scale-[1.02] ${
              item.imageFit === "contain"
                ? "object-contain p-3"
                : "object-cover object-top"
            }`}
          />

          {/* Thank x Chain だけ、作り直す前の画面を重ねる。
              hover で「前」が少し引いて「後」が見えるが、ラベルは常に読める。 */}
          {before && (
            <>
              <span className="absolute left-3 top-3 rounded-full bg-[var(--v3-bg)]/80 px-2.5 py-1 text-[10px] text-[var(--v3-fg)] backdrop-blur-sm">
                {before.afterLabel}
              </span>
              <div className="absolute bottom-3 left-3 w-[42%] overflow-hidden rounded-[10px] ring-1 ring-[var(--v3-rule)] transition-all duration-[450ms] ease-out motion-safe:group-hover/card:translate-y-2 motion-safe:group-hover/card:opacity-70">
                <div className="relative aspect-[16/10]">
                  <Image
                    src={before.beforeImage}
                    alt="作り直す前の Thanks の画面"
                    width={2442}
                    height={1330}
                    draggable={false}
                    className="h-full w-full select-none object-cover object-top"
                  />
                </div>
                <span className="absolute inset-x-0 bottom-0 bg-[var(--v3-bg)]/85 px-2 py-1 text-[9px] text-[var(--v3-fg-2)]">
                  {before.beforeLabel}（最初）
                </span>
              </div>
            </>
          )}
        </div>

        {/* --- text: 枠で囲わない --- */}
        <div className="px-1 pt-5">
          <div className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className="h-[7px] w-[7px] rounded-full transition-transform duration-200 group-hover/card:scale-125"
              style={{ background: item.accent }}
            />
            <h4 className="text-[17px] font-bold tracking-tight text-[var(--v3-fg)]">
              {item.name}
            </h4>
          </div>

          <p className="mt-2 text-[12px] leading-6 text-[var(--v3-fg-2)]">
            {item.forWho}
          </p>

          {"arc" in item && item.arc ? (
            <ol className="mt-3.5 space-y-1">
              {item.arc.map((a, i) => (
                <li
                  key={a}
                  className="flex items-baseline gap-2 text-[12px] leading-6 text-[var(--v3-fg)]"
                >
                  <span aria-hidden="true" className="text-[10px] text-[var(--v3-fg-2)]">
                    {i === 0 ? "　" : "↓"}
                  </span>
                  {a}
                </li>
              ))}
            </ol>
          ) : (
            <p className="mt-3 text-[13px] leading-7 text-[var(--v3-fg-2)] [word-break:auto-phrase]">
              {"summary" in item ? item.summary : null}
            </p>
          )}

          <dl className="mt-4 space-y-1 text-[12px] leading-6">
            <div className="flex gap-3">
              <dt className="w-9 shrink-0 text-[var(--v3-fg-2)]">担当</dt>
              <dd className="text-[var(--v3-fg)]">{item.role}</dd>
            </div>
            <div className="flex gap-3">
              <dt className="w-9 shrink-0 text-[var(--v3-fg-2)]">結果</dt>
              <dd className="text-[var(--v3-fg)]">{item.result}</dd>
            </div>
          </dl>

          <div className="mt-4">
            <TechRow keys={item.tech} />
          </div>

          {item.links.length > 0 && (
            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
              {item.links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={clone ? -1 : undefined}
                  onClick={(e) => {
                    // ドラッグの流れでリンクを踏んでしまうのを防ぐ
                    if (suppressClick.current) e.preventDefault();
                  }}
                  className="inline-flex items-center gap-2 rounded text-[12px] text-[var(--v3-fg)] transition-colors duration-200 hover:text-[var(--card-accent)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--v3-accent)]"
                >
                  {l.kind === "github" ? (
                    <FaGithub size={12} />
                  ) : (
                    <FaArrowUpRightFromSquare size={10} />
                  )}
                  {l.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </article>
    </li>
  );
}

/* -------------------------------------------------------------------- rail */

export default function ProjectRail() {
  const reduced = usePrefersReducedMotion();
  const trackRef = useRef<HTMLDivElement | null>(null);

  // rAF 側だけが読む値。再レンダリングを起こしたくないので ref に置く。
  const lastInput = useRef(0);
  const holding = useRef(false); // ドラッグ中・ホバー滞在中など「触っている」状態
  const suppressClick = useRef(false);
  const rampStart = useRef(0);

  const [inView, setInView] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);

  /** 触った瞬間に自動を止める */
  const markInput = useCallback(() => {
    lastInput.current = performance.now();
    rampStart.current = 0;
  }, []);

  /* --- 画面内にあるときだけ動かす --- */
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => setInView(e.isIntersecting),
      { rootMargin: "0px", threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* --- タブが隠れたら止める --- */
  useEffect(() => {
    const onVis = () => setTabVisible(document.visibilityState === "visible");
    onVis();
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  /* --- 3セットの中央へ正規化。ユーザー操作・自動のどちらでも同じ処理で効く。 --- */
  const normalize = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const one = el.scrollWidth / SETS;
    if (one <= 0) return;
    if (el.scrollLeft >= one * 2) el.scrollLeft -= one;
    else if (el.scrollLeft < one * 0.5) el.scrollLeft += one;
  }, []);

  /* --- 初期位置を中央セットの頭に置く --- */
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const place = () => {
      const one = el.scrollWidth / SETS;
      if (one > 0) el.scrollLeft = one;
    };
    place();
    const ro = new ResizeObserver(place);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  /* --- 自動送り本体 --- */
  useEffect(() => {
    if (reduced || !inView || !tabVisible) return;
    const el = trackRef.current;
    if (!el) return;

    let raf = 0;
    let prev = performance.now();
    let carry = 0; // 1px 未満の端数を持ち越して、カクつきを防ぐ

    const tick = (now: number) => {
      const dt = Math.min(now - prev, 50); // タブ復帰直後の巨大な dt を捨てる
      prev = now;

      const idle = now - lastInput.current;
      if (!holding.current && idle >= RESUME_DELAY) {
        if (!rampStart.current) rampStart.current = now;
        // 0 → AUTO_SPEED へ ease-in（操作権が戻ったことを感じさせない）
        const t = Math.min((now - rampStart.current) / RAMP, 1);
        const speed = AUTO_SPEED * (t * t);
        carry += (speed * dt) / 1000;
        const step = Math.floor(carry);
        if (step > 0) {
          el.scrollLeft += step;
          carry -= step;
        }
      } else {
        carry = 0;
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced, inView, tabVisible]);

  /* --- ホバー滞在。通り過ぎただけでは止めない。 --- */
  const dwell = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onPointerEnter = useCallback(() => {
    if (dwell.current) clearTimeout(dwell.current);
    dwell.current = setTimeout(() => {
      holding.current = true;
      markInput();
    }, HOVER_DWELL);
  }, [markInput]);
  const onPointerLeave = useCallback(() => {
    if (dwell.current) clearTimeout(dwell.current);
    holding.current = false;
    markInput(); // 離れてから 2 秒後に再開
  }, [markInput]);

  /* --- マウスのドラッグ。touch はブラウザ任せ（慣性を壊さない）。 --- */
  const drag = useRef({ active: false, x: 0, left: 0, moved: 0 });
  const onPointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      markInput();
      holding.current = true;
      if (e.pointerType !== "mouse") return;
      const el = trackRef.current;
      if (!el) return;
      drag.current = { active: true, x: e.clientX, left: el.scrollLeft, moved: 0 };
      suppressClick.current = false;
    },
    [markInput]
  );
  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d.active) return;
    const el = trackRef.current;
    if (!el) return;
    const dx = e.clientX - d.x;
    d.moved += Math.abs(dx);
    el.scrollLeft = d.left - dx;
    if (d.moved > DRAG_SLOP) suppressClick.current = true;
  }, []);
  const endDrag = useCallback(() => {
    drag.current.active = false;
    holding.current = false;
    markInput();
    // クリック抑止は次のクリックを1回だけ潰す
    setTimeout(() => {
      suppressClick.current = false;
    }, 0);
  }, [markInput]);

  /* --- trackpad / wheel。横方向の意図があるときだけ自動を止める。 --- */
  const onWheel = useCallback(
    (e: React.WheelEvent<HTMLDivElement>) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) markInput();
    },
    [markInput]
  );

  /* --- キーボード --- */
  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const el = trackRef.current;
      if (!el) return;
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      e.preventDefault();
      markInput();
      el.scrollBy({
        left: e.key === "ArrowRight" ? 320 : -320,
        behavior: reduced ? "auto" : "smooth",
      });
    },
    [markInput, reduced]
  );

  const sets = Array.from({ length: SETS }, (_, i) => i);

  return (
    <div className="mt-20">
      {/* 見出しはコンテナ内。レールだけ画面端まで抜けさせる。 */}
      <div className="mx-auto max-w-[1180px] px-6 md:px-10">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h3 className="text-[20px] font-bold tracking-tight text-[var(--v3-fg)] md:text-[24px]">
            ほかにつくったもの
          </h3>
          <p className="text-[12px] text-[var(--v3-fg-2)]">
            {reduced
              ? "横にスクロールしてご覧ください"
              : "ゆっくり流れています。触ると止まります"}
          </p>
        </div>
      </div>

      <div
        ref={trackRef}
        role="region"
        aria-label="ほかにつくったもの"
        tabIndex={0}
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onWheel={onWheel}
        onKeyDown={onKeyDown}
        onFocusCapture={markInput}
        onScroll={normalize}
        className="mt-7 overflow-x-auto overscroll-x-contain pt-2 pb-4 [-ms-overflow-style:none] [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--v3-accent)] [&::-webkit-scrollbar]:hidden"
      >
        <ul className="flex w-max items-start gap-6 px-6 md:px-10">
          {sets.map((setIndex) =>
            v3Rail.map((item) => (
              <RailCard
                key={`${setIndex}-${item.key}`}
                item={item}
                clone={setIndex !== 1}
                suppressClick={suppressClick}
              />
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
