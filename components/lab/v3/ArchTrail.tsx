"use client";

/**
 * 転換点の引用をまたぐ、光の軌跡。
 *
 * 引用の上を横長の半楕円で越えて、左下から右上へ抜ける。
 * 借りているのは「中央に主役があり、左から光が駆け上がって大きな弧を描き、
 * 右へ抜けて、きらめいた余韻が残る」という映画の導入の運びだけで、
 * 城・ロゴ・キャラクターの形は描かない。
 *
 * 作り:
 *   SVG 1 枚。核は offset-path で軌跡の上を進み、尾は dasharray の先端を
 *   核に合わせて追わせる。粒は核が通ったところで生まれ、重力に従って落ちる。
 *   進捗に応じた濃さは、Turn 側が書く --p をそのまま使う。
 *
 * 負荷:
 *   animation は offset-distance / stroke-dashoffset / transform / opacity のみ。
 *   画面外では animation-play-state: paused で止める。依存は増やさない。
 */
import { useEffect, useRef, useState } from "react";

/**
 * 位置の決め方（順序が大事）:
 *   1. まず文字が中心を取る。引用を 112px 下げると、ヘッダー下端から
 *      セクション下端までの「読める領域」のちょうど中央に文字が来る。
 *      この 112px は画面の高さによらず一定になる。既定位置も目標位置も
 *      セクション高の 1/2 で動くので、その差は変わらないため。
 *   2. 弧はその残りの空間に収める。余白を弧の都合で決めない。
 *
 * 座標系:
 *   viewBox は 1180 × 420。1180 は本文の枠と同じ幅なので x は本文と対応する。
 *   箱は引用ブロックの上端を基準に -61.905%（= y 260 が引用ブロックの先頭）に置く。
 *   文字は y 297〜474、弧は y 148〜348 を通る。
 *   頂点の x は 590 ＝ 枠のちょうど中央。引用も中央に置いてあるので、
 *   弧の一番高いところが引用の中心軸の真上に来る。
 *   左右の端だけが引用の1行目を少しかすめる（801点中 27点）。
 *   ここは「触れない」より「かすめる」ほうが、軌跡が文字の後ろから
 *   出てきたように見えるので、意図的に重ねている。
 */

const ARCH_PATH =
  "M 22 332 C 180 216 382 150 590 148 C 796 146 966 212 1160 348";

/*
 * 引用を下げる量は 112px。Turn 本体で xl:translate-y-[112px] として当てている。
 * 上に弧の通り道を作るためだけの移動で、レイアウトは動かさない。
 */

/**
 * 尾。A/B と同じ考え方だが、走る速度が倍近いので少しだけ長く取る。
 * 線そのものを濃くはしない。主役は粒。
 */
const ARCH_WAKE = [
  { len: 0.05, w: 3.4, op: 0.05 },
  { len: 0.026, w: 1.2, op: 0.5 },
  { len: 0.075, w: 0.85, op: 0.2 },
  { len: 0.16, w: 0.6, op: 0.09 },
  { len: 0.3, w: 0.4, op: 0.045 },
];

const ARCH_DUST = [
  { x: 70, y: 315, r: 2.0, at: 0.071, dx: -2.5, dy: 38.1, warm: false, bright: false, life: "c" },
  { x: 86, y: 291, r: 1.0, at: 0.077, dx: -2.7, dy: 35.7, warm: false, bright: false, life: "c" },
  { x: 102, y: 272, r: 2.0, at: 0.081, dx: -4.4, dy: 21.1, warm: false, bright: false, life: "" },
  { x: 145, y: 277, r: 1.0, at: 0.084, dx: -4.4, dy: 35.6, warm: false, bright: false, life: "c" },
  { x: 133, y: 264, r: 1.1, at: 0.089, dx: -1.8, dy: 28.5, warm: false, bright: false, life: "" },
  { x: 163, y: 252, r: 1.0, at: 0.096, dx: -5.7, dy: 36.4, warm: true, bright: false, life: "c" },
  { x: 188, y: 234, r: 1.1, at: 0.1, dx: -2.9, dy: 31.4, warm: false, bright: true, life: "b" },
  { x: 215, y: 246, r: 1.3, at: 0.11, dx: 0.1, dy: 24.0, warm: false, bright: false, life: "b" },
  { x: 280, y: 206, r: 0.8, at: 0.114, dx: -6.1, dy: 35.0, warm: false, bright: false, life: "c" },
  { x: 243, y: 217, r: 2.0, at: 0.118, dx: -1.6, dy: 33.5, warm: false, bright: false, life: "c" },
  { x: 252, y: 198, r: 2.0, at: 0.12, dx: -4.3, dy: 31.6, warm: false, bright: false, life: "b" },
  { x: 312, y: 204, r: 1.1, at: 0.127, dx: -3.1, dy: 28.5, warm: false, bright: false, life: "b" },
  { x: 350, y: 180, r: 1.1, at: 0.137, dx: -1.1, dy: 20.5, warm: false, bright: false, life: "c" },
  { x: 340, y: 190, r: 0.7, at: 0.138, dx: -0.0, dy: 31.8, warm: false, bright: false, life: "" },
  { x: 418, y: 174, r: 0.7, at: 0.144, dx: -3.0, dy: 36.9, warm: false, bright: false, life: "" },
  { x: 391, y: 171, r: 0.8, at: 0.148, dx: -3.9, dy: 25.4, warm: false, bright: false, life: "b" },
  { x: 430, y: 151, r: 0.8, at: 0.154, dx: -0.3, dy: 17.3, warm: true, bright: false, life: "b" },
  { x: 455, y: 135, r: 1.0, at: 0.158, dx: 1.3, dy: 29.5, warm: false, bright: false, life: "b" },
  { x: 495, y: 160, r: 0.9, at: 0.163, dx: -4.2, dy: 22.0, warm: false, bright: true, life: "c" },
  { x: 525, y: 149, r: 0.7, at: 0.166, dx: -3.8, dy: 23.2, warm: false, bright: false, life: "b" },
  { x: 485, y: 156, r: 2.0, at: 0.168, dx: -4.7, dy: 20.9, warm: false, bright: false, life: "c" },
  { x: 554, y: 156, r: 0.9, at: 0.174, dx: -2.2, dy: 22.4, warm: false, bright: false, life: "b" },
  { x: 610, y: 150, r: 2.0, at: 0.183, dx: -2.8, dy: 22.1, warm: false, bright: false, life: "" },
  { x: 593, y: 148, r: 0.7, at: 0.187, dx: -7.2, dy: 24.4, warm: false, bright: false, life: "c" },
  { x: 658, y: 153, r: 1.1, at: 0.193, dx: -1.1, dy: 20.4, warm: false, bright: false, life: "" },
  { x: 625, y: 147, r: 0.8, at: 0.197, dx: -6.2, dy: 36.1, warm: false, bright: false, life: "b" },
  { x: 700, y: 157, r: 2.0, at: 0.204, dx: -4.4, dy: 29.4, warm: true, bright: false, life: "c" },
  { x: 679, y: 143, r: 0.6, at: 0.207, dx: 0.4, dy: 33.5, warm: false, bright: false, life: "" },
  { x: 729, y: 152, r: 0.8, at: 0.215, dx: -0.5, dy: 32.2, warm: false, bright: false, life: "" },
  { x: 749, y: 161, r: 1.0, at: 0.224, dx: -1.0, dy: 29.2, warm: false, bright: false, life: "" },
  { x: 777, y: 161, r: 0.8, at: 0.226, dx: -5.5, dy: 26.6, warm: false, bright: false, life: "" },
  { x: 800, y: 161, r: 2.0, at: 0.228, dx: -4.1, dy: 29.7, warm: false, bright: false, life: "b" },
  { x: 812, y: 178, r: 2.0, at: 0.232, dx: 0.4, dy: 29.6, warm: false, bright: true, life: "c" },
  { x: 858, y: 192, r: 0.7, at: 0.239, dx: -6.3, dy: 36.5, warm: false, bright: false, life: "b" },
  { x: 852, y: 186, r: 2.0, at: 0.244, dx: -6.7, dy: 19.4, warm: false, bright: false, life: "b" },
  { x: 896, y: 203, r: 1.3, at: 0.254, dx: -5.4, dy: 29.7, warm: false, bright: false, life: "b" },
  { x: 929, y: 192, r: 0.8, at: 0.26, dx: -2.0, dy: 27.9, warm: false, bright: false, life: "b" },
  { x: 938, y: 213, r: 0.6, at: 0.261, dx: -0.2, dy: 37.6, warm: false, bright: false, life: "c" },
  { x: 989, y: 248, r: 0.8, at: 0.267, dx: 1.0, dy: 24.0, warm: false, bright: false, life: "b" },
  { x: 963, y: 226, r: 1.3, at: 0.271, dx: -4.0, dy: 21.6, warm: true, bright: false, life: "c" },
  { x: 973, y: 244, r: 0.8, at: 0.272, dx: -5.1, dy: 22.3, warm: false, bright: false, life: "" },
  { x: 1022, y: 257, r: 1.6, at: 0.278, dx: -5.2, dy: 16.1, warm: false, bright: false, life: "c" },
  { x: 1044, y: 275, r: 1.0, at: 0.282, dx: -4.7, dy: 30.9, warm: false, bright: false, life: "c" },
  { x: 1074, y: 288, r: 1.1, at: 0.289, dx: -3.6, dy: 22.9, warm: false, bright: false, life: "c" },
  { x: 1096, y: 313, r: 1.6, at: 0.291, dx: -0.4, dy: 32.9, warm: false, bright: false, life: "" },
  { x: 1105, y: 327, r: 1.6, at: 0.3, dx: -3.6, dy: 28.3, warm: false, bright: true, life: "" },
];

/** 走っていない間の微光。弧から離し、引用の上の空間に薄く散らす。 */
const ARCH_AMBIENT = [
  { x: 210, y: 182, r: 0.9, at: 0 },
  { x: 430, y: 104, r: 0.8, at: 0.22 },
  { x: 660, y: 96, r: 1, at: 0.44 },
  { x: 852, y: 132, r: 0.8, at: 0.66 },
  { x: 1046, y: 196, r: 0.9, at: 0.88 },
  { x: 318, y: 246, r: 0.8, at: 0.33 },
];

/** 1 周 6 秒。走行 1.5 秒（814px/秒）、余韻 約1.1 秒、間 約2.5 秒。 */
const ARCH_CYCLE = 6;
const ARCH_FROM = 6;
const ARCH_TO = 31;

export default function ArchTrail({ still }: { still: boolean }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || still) return;
    if (typeof IntersectionObserver === "undefined") {
      setLive(true);
      return;
    }
    const io = new IntersectionObserver(([e]) => setLive(e.isIntersecting), {
      rootMargin: "15% 0px 15% 0px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, [still]);

  const running = live && !still;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      /*
        引用ブロックの上端を基準に、弧の高さぶん持ち上げる。

        -61.905% は viewBox の y=260（引用ブロックの先頭）を
        引用の上端へ合わせる値。

        xl（1280px）未満では出さない。viewBox の x はコンテナ幅に合わせて
        伸縮するのに対し、本文の余白(40px)と最大幅(38rem)は固定なので、
        コンテナが 1180px に達しない幅では両者の座標がずれる。
      */
      className="pointer-events-none absolute inset-x-0 top-0 hidden aspect-[1180/420] -translate-y-[61.905%] xl:block"
      style={{ opacity: still ? 0.55 : "clamp(0, calc(var(--p) * 2.6), 1)" }}
    >
      <style>{`
        @keyframes v3-arch-run {
          0%, ${ARCH_FROM}%  { offset-distance: 0%; opacity: 0; }
          ${ARCH_FROM + 2}%  { opacity: 1; }
          ${ARCH_TO - 3}%    { opacity: 1; }
          ${ARCH_TO}%        { offset-distance: 100%; opacity: 0; }
          100%               { offset-distance: 100%; opacity: 0; }
        }
        @keyframes v3-arch-wake {
          0%, ${ARCH_FROM}%  { stroke-dashoffset: var(--d0); opacity: 0; }
          ${ARCH_FROM + 2}%  { opacity: 1; }
          ${ARCH_TO - 3}%    { opacity: 1; }
          ${ARCH_TO}%        { stroke-dashoffset: var(--d1); opacity: 0; }
          100%               { stroke-dashoffset: var(--d1); opacity: 0; }
        }
        /* 生まれるのは一瞬、消えるのはゆっくり。これが「残った」感覚になる。 */
        /*
          落ち方。寿命の 1/3 の時点でまだ 14% しか落ちていない状態を挟むことで、
          はじめはゆっくり、後半で速く落ちる＝重力に従うように見せる。
          等速で動かすと「流される」感じになり、落ちている感じが出ない。
        */
        @keyframes v3-arch-dust {
          0%, 100% { opacity: 0; transform: translate(0, 0) scale(0.25); }
          1%       { opacity: 1; transform: translate(0, 0) scale(1); }
          5%       { opacity: 0.62;
                     transform: translate(calc(var(--dx) * 0.26), calc(var(--dy) * 0.14))
                                scale(0.86); }
          13%      { opacity: 0;
                     transform: translate(var(--dx), var(--dy)) scale(0.25); }
        }
        @keyframes v3-arch-dust-b {
          0%, 100% { opacity: 0; transform: translate(0, 0) scale(0.25); }
          1%       { opacity: 1; transform: translate(0, 0) scale(1); }
          6%       { opacity: 0.68;
                     transform: translate(calc(var(--dx) * 0.26), calc(var(--dy) * 0.14))
                                scale(0.86); }
          18%      { opacity: 0;
                     transform: translate(var(--dx), var(--dy)) scale(0.25); }
        }
        @keyframes v3-arch-dust-c {
          0%, 100% { opacity: 0; transform: translate(0, 0) scale(0.3); }
          1.5%     { opacity: 0.9; transform: translate(0, 0) scale(1); }
          8%       { opacity: 0.5;
                     transform: translate(calc(var(--dx) * 0.26), calc(var(--dy) * 0.14))
                                scale(0.88); }
          24%      { opacity: 0;
                     transform: translate(var(--dx), var(--dy)) scale(0.3); }
        }
        @keyframes v3-arch-amb {
          0%, 100% { opacity: 0.05; }
          50%      { opacity: 0.17; }
        }
        .v3-arch-head {
          offset-path: path("${ARCH_PATH}");
          offset-rotate: 0deg;
          offset-distance: 0%;
          animation: v3-arch-run ${ARCH_CYCLE}s linear infinite;
        }
        .v3-arch-wake { animation: v3-arch-wake ${ARCH_CYCLE}s linear infinite; }
        .v3-arch-dust {
          transform-box: fill-box;
          transform-origin: center;
          opacity: 0;
          animation: v3-arch-dust ${ARCH_CYCLE}s linear infinite;
        }
        .v3-arch-dust-b { animation-name: v3-arch-dust-b; }
        .v3-arch-dust-c { animation-name: v3-arch-dust-c; }
        .v3-arch-amb {
          opacity: 0.05;
          animation: v3-arch-amb ${(ARCH_CYCLE * 2.4).toFixed(1)}s ease-in-out infinite;
        }
        .v3-arch-paused .v3-arch-head,
        .v3-arch-paused .v3-arch-wake,
        .v3-arch-paused .v3-arch-dust,
        .v3-arch-paused .v3-arch-dust-b,
        .v3-arch-paused .v3-arch-dust-c,
        .v3-arch-paused .v3-arch-amb {
          animation-play-state: paused;
        }
      `}</style>

      <svg
        viewBox="0 0 1180 420"
        fill="none"
        className={`h-full w-full ${running ? "" : "v3-arch-paused"}`}
      >
        <defs>
          <linearGradient id="v3-arch-grad" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--v3-accent)" stopOpacity="0.3" />
            <stop offset="45%" stopColor="#F2F8FF" stopOpacity="1" />
            <stop offset="100%" stopColor="var(--v3-accent)" stopOpacity="0.85" />
          </linearGradient>
          <radialGradient id="v3-arch-core">
            <stop offset="0%" stopColor="#F4F9FF" stopOpacity="0.55" />
            <stop offset="35%" stopColor="var(--v3-accent)" stopOpacity="0.26" />
            <stop offset="100%" stopColor="var(--v3-accent)" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="v3-arch-dustglow">
            <stop offset="0%" stopColor="#DCEAF6" stopOpacity="0.6" />
            <stop offset="55%" stopColor="#DCEAF6" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#DCEAF6" stopOpacity="0" />
          </radialGradient>
        </defs>

        {ARCH_AMBIENT.map((d) => (
          <circle
            key={`hamb-${d.x}`}
            className={still ? undefined : "v3-arch-amb"}
            cx={d.x}
            cy={d.y}
            r={d.r}
            fill="#CFE0EF"
            opacity={still ? 0.12 : undefined}
            style={
              still
                ? undefined
                : { animationDelay: `${(d.at * ARCH_CYCLE * 2.4).toFixed(2)}s` }
            }
          />
        ))}

        {still ? (
          <>
            <path
              d={ARCH_PATH}
              pathLength={1}
              stroke="url(#v3-arch-grad)"
              strokeWidth="0.9"
              strokeLinecap="round"
              strokeDasharray="0.22 1"
              strokeDashoffset="-0.78"
              strokeOpacity="0.3"
            />
            <g transform="translate(1160 348)">
              <circle r="7" fill="url(#v3-arch-core)" />
              <circle r="1.2" fill="#F8FBFF" opacity="0.9" />
            </g>
            {ARCH_DUST.slice(14).map((d, i, a) => (
              <g key={`hsd-${d.x}-${d.y}`}>
                <circle
                  cx={d.x}
                  cy={d.y}
                  r={d.r * 2.6}
                  fill="url(#v3-arch-dustglow)"
                  opacity={0.18 + (i / a.length) * 0.5}
                />
                <circle
                  cx={d.x}
                  cy={d.y}
                  r={d.r * (d.bright ? 1.5 : 1)}
                  fill={d.warm ? "#E8D7A8" : "#DCEAF6"}
                  opacity={0.18 + (i / a.length) * 0.55}
                />
              </g>
            ))}
          </>
        ) : (
          <>
            {ARCH_WAKE.map((w) => (
              <path
                key={`hw-${w.len}`}
                className="v3-arch-wake"
                d={ARCH_PATH}
                pathLength={1}
                stroke="url(#v3-arch-grad)"
                strokeWidth={w.w}
                strokeLinecap="round"
                strokeDasharray={`${w.len} 2`}
                strokeOpacity={w.op}
                style={
                  {
                    "--d0": `${w.len}`,
                    "--d1": `${(w.len - 1).toFixed(3)}`,
                  } as React.CSSProperties
                }
              />
            ))}

            <g className="v3-arch-head">
              <circle r="7" fill="url(#v3-arch-core)" />
              <circle r="2.4" fill="#F4F9FF" opacity="0.22" />
              <circle r="1.15" fill="#F8FBFF" />
            </g>

            {ARCH_DUST.map((d) => (
              <g
                key={`hd-${d.x}-${d.y}`}
                className={`v3-arch-dust${d.life ? ` v3-arch-dust-${d.life}` : ""}`}
                style={
                  {
                    "--dx": `${d.dx}px`,
                    "--dy": `${d.dy}px`,
                    animationDelay: `${(d.at * ARCH_CYCLE).toFixed(2)}s`,
                  } as React.CSSProperties
                }
              >
                <circle
                  cx={d.x}
                  cy={d.y}
                  r={d.r * (d.bright ? 3.6 : 2.8)}
                  fill="url(#v3-arch-dustglow)"
                />
                <circle
                  cx={d.x}
                  cy={d.y}
                  r={d.r * (d.bright ? 1.7 : 1.2)}
                  fill={d.warm ? "#E8D7A8" : "#DCEAF6"}
                />
              </g>
            ))}
          </>
        )}
      </svg>
    </div>
  );
}

/**
 * どの案を出すか。比較のためだけの切り替えで、決まったら他を消す。
 *   既定    … C案（引用の上をまたぐ弧）
 *   ?turn=arc   … B案（引用の下を回る弧）
 *   ?turn=comet … A案（右の余白を走る流れ星）
 */
