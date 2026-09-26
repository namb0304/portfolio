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
import {
  FaArrowUpRightFromSquare,
  FaGithub,
  FaPause,
  FaPlay,
} from "react-icons/fa6";
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
/** 開始点からこれ以上動いたらドラッグとみなす（普通のクリックを誤判定しない） */
const DRAG_THRESHOLD = 7; // px

/**
 * この上で押し始めたときは drag を開始しない（pointer capture も取らない）。
 * リンクやボタンを普通に押しただけでクリックが奪われるのを防ぐ。
 */
const INTERACTIVE = "a, button, input, textarea, select, [role='button'], [contenteditable='true']";

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
  setIndex,
  index,
  suppressClick,
}: {
  item: Item;
  clone: boolean;
  setIndex: number;
  index: number;
  suppressClick: React.MutableRefObject<boolean>;
}) {
  const before = "beforeImage" in item ? item : null;
  /** Thank x Chain のみ。既定は「作り直した後」を見せる。 */
  const [showBefore, setShowBefore] = useState(false);

  return (
    <li
      className="shrink-0"
      style={{ width: `min(${item.width}px, 82vw)` }}
      aria-hidden={clone || undefined}
      data-set={setIndex}
      data-idx={index}
    >
      <article
        style={{ "--card-accent": item.accent } as React.CSSProperties}
        className="group/card flex h-full flex-col"
        onPointerLeave={() => before && setShowBefore(false)}
        onBlurCapture={(e) => {
          if (before && !e.currentTarget.contains(e.relatedTarget as Node | null)) {
            setShowBefore(false);
          }
        }}
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
            /* カード実寸: 320px幅で262 / 390で320 / 768以上で400 */
            sizes="(min-width: 768px) 400px, (min-width: 380px) 320px, 262px"
            className={`h-full w-full select-none transition-transform duration-[500ms] ease-out motion-safe:group-hover/card:scale-[1.02] ${
              item.imageFit === "contain"
                ? "object-contain p-3"
                : "object-cover object-top"
            }`}
          />

          {/*
            Thank x Chain だけ、再設計の前後を重ねて見せる。
            画像を切り替える演出ではなく、「一度作ったものをチームで見直して
            作り直した」という過程そのものの可視化。
            hover / focus / tap のどれでも切り替わり、ラベルは常時読める。
          */}
          {before && (
            <>
              <Image
                src={before.beforeImage}
                alt="再設計する前の Thanks の画面"
                width={2442}
                height={1330}
                draggable={false}
                sizes="(min-width: 768px) 400px, (min-width: 380px) 320px, 262px"
                aria-hidden={!showBefore}
                className="absolute inset-0 h-full w-full select-none object-cover object-top transition-opacity duration-[420ms] ease-out"
                style={{ opacity: showBefore ? 1 : 0 }}
              />

              {/* Before / After の現在地。常時読める。 */}
              <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-[var(--v3-bg)]/85 p-1 backdrop-blur-sm">
                {(
                  [
                    [true, before.beforeLabel],
                    [false, before.afterLabel],
                  ] as const
                ).map(([isBefore, label]) => (
                  <button
                    key={label}
                    type="button"
                    tabIndex={clone ? -1 : undefined}
                    aria-pressed={showBefore === isBefore}
                    onPointerEnter={() => setShowBefore(isBefore)}
                    onFocus={() => setShowBefore(isBefore)}
                    onClick={(e) => {
                      // Rail の drag 直後のクリックは無視する
                      if (suppressClick.current) {
                        e.preventDefault();
                        return;
                      }
                      setShowBefore(isBefore);
                    }}
                    className={`rounded-full px-2.5 py-[3px] text-[10px] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--v3-accent)] ${
                      showBefore === isBefore
                        ? "bg-[var(--v3-fg)] text-[var(--v3-bg)]"
                        : "text-[var(--v3-fg-2)] hover:text-[var(--v3-fg)]"
                    }`}
                  >
                    {label}
                  </button>
                ))}
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
              {/* 「結果」で一律にせず、意味に応じて 受賞 / 参加 / 制作機会 を出す */}
              <dt className="w-9 shrink-0 text-[var(--v3-fg-2)]">
                {"resultLabel" in item ? item.resultLabel : "結果"}
              </dt>
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

/** 自動を止めている理由。理由ごとに独立して持つ（1つの時刻変数で兼ねない）。 */
type Blockers = {
  hovered: boolean;
  focused: boolean;
  dragging: boolean;
};

export default function ProjectRail() {
  const reduced = usePrefersReducedMotion();

  const trackRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);

  /** 停止理由。rAF から毎フレーム読むので ref で持つ（再描画を起こさない）。 */
  const blockers = useRef<Blockers>({
    hovered: false,
    focused: false,
    dragging: false,
  });
  /**
   * すべての停止理由が解けた時刻 + 1500ms。これ未満では再開しない。
   * 初期値は 0（＝マウント直後は待たずに動き出す）。Infinity にすると
   * 停止理由が一度も発生しないまま永久に再開しない。
   */
  const resumeAt = useRef(0);
  /** 小数を保ったスクロール位置。整数丸めをしないため自前で持つ。 */
  const pos = useRef(0);
  /** DOM から実測した1セット分の繰り返し幅（gap/padding 込み） */
  const repeatW = useRef(0);
  const rampStart = useRef(0);
  const suppressClick = useRef(false);

  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);

  /** 停止理由が変わるたびに呼ぶ。全部解けたら 1500ms のカウントを始める。 */
  const syncResume = useCallback(() => {
    const b = blockers.current;
    const blocked = b.hovered || b.focused || b.dragging;
    if (blocked) {
      resumeAt.current = Number.POSITIVE_INFINITY;
      rampStart.current = 0;
    } else {
      resumeAt.current = performance.now() + RESUME_DELAY;
    }
  }, []);

  const setBlocker = useCallback(
    (key: keyof Blockers, value: boolean) => {
      if (blockers.current[key] === value) return;
      blockers.current[key] = value;
      syncResume();
    },
    [syncResume]
  );

  /* --- reduced motion なら初期状態を停止にする --- */
  useEffect(() => {
    if (reduced) setPaused(true);
  }, [reduced]);

  /* --- 画面内判定 --- */
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), {
      threshold: 0.15,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* --- タブの表示状態 --- */
  useEffect(() => {
    const onVis = () => setTabVisible(document.visibilityState === "visible");
    onVis();
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  /**
   * 1セット分の繰り返し幅を DOM から実測する。
   * scrollWidth/3 だと gap や左右 padding のぶんズレて loop 境界が飛ぶため、
   * 「セット0 の先頭カード」と「セット1 の先頭カード」の offsetLeft 差を使う。
   */
  const measure = useCallback(() => {
    const track = trackRef.current;
    const list = listRef.current;
    if (!track || !list) return;
    const a = list.querySelector<HTMLElement>('[data-set="0"][data-idx="0"]');
    const b = list.querySelector<HTMLElement>('[data-set="1"][data-idx="0"]');
    if (!a || !b) return;
    const w = b.offsetLeft - a.offsetLeft;
    if (w <= 0) return;

    const prev = repeatW.current;
    repeatW.current = w;

    // 初回、または幅が変わった時は中央セットの相対位置を保ったまま置き直す
    if (!prev) {
      pos.current = w;
    } else if (prev !== w) {
      const ratio = (pos.current - prev) / prev; // 中央セット内の進捗
      pos.current = w + ratio * w;
    }
    track.scrollLeft = pos.current;
  }, []);

  useEffect(() => {
    measure();
    const track = trackRef.current;
    const list = listRef.current;
    if (!track || !list) return;
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    ro.observe(list);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  /** 中央セットへ正規化。境界で見た目が変わらないよう1セット幅ちょうどずらす。 */
  const normalize = useCallback(() => {
    const w = repeatW.current;
    const track = trackRef.current;
    if (!w || !track) return;
    if (pos.current >= w * 2) {
      pos.current -= w;
      track.scrollLeft = pos.current;
    } else if (pos.current < w * 0.5) {
      pos.current += w;
      track.scrollLeft = pos.current;
    }
  }, []);

  /* --- ユーザー自身のスクロール（trackpad / touch）を取り込む --- */
  const onScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    // 自動送りで書いた値との差が大きければ、ユーザー操作とみなして同期する
    if (Math.abs(track.scrollLeft - pos.current) > 1.5) {
      pos.current = track.scrollLeft;
      resumeAt.current = performance.now() + RESUME_DELAY;
      rampStart.current = 0;
    }
    normalize();
  }, [normalize]);

  /* --- 自動送り本体 --- */
  useEffect(() => {
    const canRun = inView && tabVisible && !reduced && !paused;
    if (!canRun) return;
    const track = trackRef.current;
    if (!track) return;

    let raf = 0;
    let prev = performance.now();

    const tick = (now: number) => {
      const dt = Math.min(now - prev, 50); // タブ復帰直後の巨大な dt を捨てる
      prev = now;

      const b = blockers.current;
      const blocked = b.hovered || b.focused || b.dragging;

      if (!blocked && now >= resumeAt.current && repeatW.current > 0) {
        if (!rampStart.current) rampStart.current = now;
        const t = Math.min((now - rampStart.current) / RAMP, 1);
        const speed = AUTO_SPEED * (t * t);
        // 小数のまま加算する。整数へ丸めると 120Hz で段付きになる。
        pos.current += (speed * dt) / 1000;
        track.scrollLeft = pos.current;
        normalize();
      } else {
        rampStart.current = 0;
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, tabVisible, reduced, paused, normalize]);

  /* --- hover: 通り過ぎただけでは止めない --- */
  const dwell = useRef<ReturnType<typeof setTimeout> | null>(null);
  const clearDwell = () => {
    if (dwell.current) {
      clearTimeout(dwell.current);
      dwell.current = null;
    }
  };
  const onPointerEnter = useCallback(() => {
    clearDwell();
    dwell.current = setTimeout(() => setBlocker("hovered", true), HOVER_DWELL);
  }, [setBlocker]);
  const onPointerLeave = useCallback(() => {
    clearDwell();
    setBlocker("hovered", false);
  }, [setBlocker]);
  useEffect(() => clearDwell, []);

  /* --- drag: 開始点からの正味移動量で判定する --- */
  const drag = useRef({ id: -1, startX: 0, startLeft: 0, moved: false });

  const onPointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const track = trackRef.current;
      if (!track) return;

      /*
        リンク・ボタンの上で押した場合は drag ではない。
        ここで dragging を立てると、capture を取っていないぶん
        Rail の外で指を離したときに pointerup を受け取れず、
        blocker が立ったまま自動スクロールが戻らなくなる。
        ポインタは Rail 上にあるので hovered 側で止まっており、
        ここで何もしなくても勝手に動き出すことはない。
      */
      if ((e.target as Element | null)?.closest?.(INTERACTIVE)) return;

      // touch はブラウザのネイティブスクロールに任せる（慣性を壊さない）
      if (e.pointerType !== "mouse") {
        setBlocker("dragging", true);
        return;
      }
      drag.current = {
        id: e.pointerId,
        startX: e.clientX,
        startLeft: pos.current,
        moved: false,
      };
      suppressClick.current = false;
      setBlocker("dragging", true);
      try {
        track.setPointerCapture(e.pointerId);
      } catch {
        /* capture できなくても drag 自体は成立する */
      }
    },
    [setBlocker]
  );

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (d.id !== e.pointerId) return;
    const track = trackRef.current;
    if (!track) return;
    // 累積ではなく開始点からの正味移動量。普通のクリックを drag と誤判定しない。
    const dx = e.clientX - d.startX;
    if (!d.moved && Math.abs(dx) > DRAG_THRESHOLD) {
      d.moved = true;
      suppressClick.current = true;
    }
    if (d.moved) {
      pos.current = d.startLeft - dx;
      track.scrollLeft = pos.current;
    }
  }, []);

  const endDrag = useCallback(
    (e?: React.PointerEvent<HTMLDivElement>) => {
      const track = trackRef.current;
      if (track && e && track.hasPointerCapture?.(e.pointerId)) {
        try {
          track.releasePointerCapture(e.pointerId);
        } catch {
          /* 解放済みなら無視 */
        }
      }
      drag.current.id = -1;
      setBlocker("dragging", false);
      // クリック抑止は次の click 1回だけ潰す
      window.setTimeout(() => {
        suppressClick.current = false;
      }, 0);
    },
    [setBlocker]
  );

  /*
    Rail の外で指やボタンを離すと、track の pointerup は発火しない。
    dragging が立っている間だけ window 側でも終了を待ち、
    どこで離しても必ず解除されるようにする。
  */
  useEffect(() => {
    const clear = () => {
      if (!blockers.current.dragging) return;
      drag.current.id = -1;
      setBlocker("dragging", false);
      window.setTimeout(() => {
        suppressClick.current = false;
      }, 0);
    };
    window.addEventListener("pointerup", clear);
    window.addEventListener("pointercancel", clear);
    return () => {
      window.removeEventListener("pointerup", clear);
      window.removeEventListener("pointercancel", clear);
    };
  }, [setBlocker]);

  /* --- focus: Rail 内にフォーカスがある間は絶対に再開しない --- */
  const onFocusCapture = useCallback(
    () => setBlocker("focused", true),
    [setBlocker]
  );
  const onBlurCapture = useCallback(
    (e: React.FocusEvent<HTMLDivElement>) => {
      if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
        setBlocker("focused", false);
      }
    },
    [setBlocker]
  );

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const track = trackRef.current;
      if (!track) return;
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      e.preventDefault();
      pos.current += e.key === "ArrowRight" ? 320 : -320;
      track.scrollLeft = pos.current;
      normalize();
      resumeAt.current = performance.now() + RESUME_DELAY;
      rampStart.current = 0;
    },
    [normalize]
  );

  const sets = Array.from({ length: SETS }, (_, i) => i);
  const autoOn = !paused && !reduced;

  return (
    <div className="mt-20">
      <div className="mx-auto max-w-[1180px] px-6 md:px-10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <h3 className="text-[20px] font-bold tracking-tight text-[var(--v3-fg)] md:text-[24px]">
              ほかにつくったもの
            </h3>
            {/*
              自動で動き続けるので、明示的に止められるようにする。
              動きを止める設定のときは自動スクロール自体が走らないので、
              押しても何も起きないボタンは出さない。
            */}
            {!reduced && (
              <button
                type="button"
                onClick={() => setPaused((v) => !v)}
                aria-pressed={paused}
                aria-label={
                  paused ? "自動スクロールを再生" : "自動スクロールを停止"
                }
                title={paused ? "再生" : "停止"}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--v3-rule)] text-[10px] text-[var(--v3-fg-2)] transition-colors duration-200 hover:border-[var(--v3-accent)]/60 hover:text-[var(--v3-fg)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--v3-accent)]"
              >
                {paused ? <FaPlay /> : <FaPause />}
              </button>
            )}
          </div>
          <p className="text-[12px] text-[var(--v3-fg-2)]">
            {reduced
              ? "横にスクロールしてご覧ください"
              : paused
                ? "停止中です"
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
        onLostPointerCapture={() => endDrag()}
        onFocusCapture={onFocusCapture}
        onBlurCapture={onBlurCapture}
        onKeyDown={onKeyDown}
        onScroll={onScroll}
        className="mt-7 overflow-x-auto overscroll-x-contain pt-2 pb-4 [-ms-overflow-style:none] [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--v3-accent)] [&::-webkit-scrollbar]:hidden"
        aria-live={autoOn ? "off" : "polite"}
      >
        <ul ref={listRef} className="flex w-max items-start gap-6 px-6 md:px-10">
          {sets.map((setIndex) =>
            v3Rail.map((item, i) => (
              <RailCard
                key={`${setIndex}-${item.key}`}
                item={item}
                clone={setIndex !== 1}
                setIndex={setIndex}
                index={i}
                suppressClick={suppressClick}
              />
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
