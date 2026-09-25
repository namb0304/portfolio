"use client";

/**
 * Projects と Internships のあいだに置く「転換点」。
 *
 * ここは情報を足す区画ではない。Hirolia を店舗へ入れたことで視点が
 * 「動くものを作る」から「使われ続けるものにする」へ変わった、という
 * 一度きりの切り替わりを、読む速度ごと体験させるための区画。
 *
 * 作り:
 *   背の高い section（scroll container）＋ position: sticky の子。
 *   ページの scroll は一切奪わない。wheel の横取り・scroll lock・snap は使わない。
 *   ユーザーはいつでも普通に上下できるし、一気に飛ばすこともできる。
 *
 * 表示の進み方は scroll progress（--p）から CSS の calc/clamp で出す。
 * JS は 1 フレームにつき変数を 1 つ書くだけで、React の再描画は起きない。
 *
 * 一文字ずつ出す typewriter はしない。意味のかたまり（phrase）単位で出す。
 */
import { useEffect, useRef, useState } from "react";
import { useScrollProgress } from "./motion";

/**
 * scroll progress の from〜to 区間で、無い状態 → くっきり に変わる一片。
 *
 * --l はこの一片のローカル進捗(0〜1)。opacity / blur / translate の 3 つだけを
 * 動かす。scale も色も動かさないので、文字は最後まで同じ形・同じ色で読める。
 *
 * 出したい感覚は「ある地点でスッと現れる」。そのため立ち上がる前は
 * 完全に不可視にして、立ち上がり始めたら短い区間で一気に濃くする。
 * うっすら見えている時間を作ると「いつ読めるのか分からない」状態になる。
 */
function Phrase({
  from,
  to,
  className = "",
  rise = 12,
  floor = 0,
  children,
}: {
  from: number;
  to: number;
  className?: string;
  /** 立ち上がりに使う移動量(px)。本文は控えめ、補足はさらに控えめ。 */
  rise?: number;
  /** 立ち上がる前の不透明度。既定は 0 ＝ 何も無い状態から始める。 */
  floor?: number;
  children: React.ReactNode;
}) {
  return (
    <span
      className={`block will-change-[opacity,transform] ${className}`}
      style={
        {
          "--l": `clamp(0, calc((var(--p) - ${from}) / ${(to - from).toFixed(3)}), 1)`,
          opacity:
            floor === 0
              ? "var(--l)"
              : `calc(${floor} + var(--l) * ${(1 - floor).toFixed(3)})`,
          /* 立ち上がりが速いので blur はほぼ知覚されない。輪郭のにじみ止め程度。 */
          filter: "blur(calc((1 - var(--l)) * 2px))",
          transform: `translateY(calc((1 - var(--l)) * ${rise}px))`,
        } as React.CSSProperties
      }
    >
      {children}
    </span>
  );
}

/* ------------------------------------------------------------ 右側の彗星 */

/**
 * 転換点の右に置く、光の粒をまとった軌跡。
 *
 * 意味づけ:
 *   この区画は「一度通り過ぎて、次へ抜ける」ことが主題なので、
 *   右肩上がりに一筋だけ走って消えるものにする。
 *   Activities の「点 → 線」と同じ語彙を、抽象的な光として薄く反復する。
 *
 * 構造は 3 つ:
 *   核 … 先頭を進む小さな芯と、そのまわりのにじみ
 *   尾 … 核の後ろに残る光跡。核へ近いほど太く明るく、後方で細く消える
 *   粒 … 核が通り過ぎたあと、軌跡から離れて散っていく微粒子
 *
 * 「線」を主役にしないのが要点。常時見えている 1 本線は、
 * どれだけ細くしても髪の毛にしか見えない。
 *
 * 負荷:
 *   animation は offset-distance / stroke-dashoffset / transform / opacity のみ。
 *   画面外では animation-play-state: paused で止める。依存は増やさない。
 */

/**
 * 軌跡。左下から右上へ抜ける、ゆるい一方向の弧。
 *
 * 旧版は 縦:横 = 1.70 の S 字で、上下に 2 回折り返していた。
 * 細い線が縦に長く蛇行する形は、何を描いても髪の毛に見える。
 * ここでは横長（縦:横 = 0.44）にし、折り返しを無くして向きを一つに絞る。
 */
const COMET_PATH = "M 18 214 C 128 210 232 168 300 112 C 348 72 392 50 424 34";

/**
 * 尾。len は path 全長に対する長さ、w は太さ。
 *
 * 前版は核のすぐ後ろを 2.6px / 不透明度 0.85 で描いていたが、
 * 太い尾は「はっきりした線」になってしまう。主役は粒なので、
 * 尾はあくまで粒がどこを通ったかを示す薄い気配に留める。
 */
const WAKE = [
  { len: 0.045, w: 3.2, op: 0.05 }, // 外側のにじみ
  { len: 0.026, w: 1.2, op: 0.5 }, // 核のすぐ後ろ
  { len: 0.07, w: 0.85, op: 0.2 },
  { len: 0.15, w: 0.6, op: 0.09 },
  { len: 0.26, w: 0.4, op: 0.04 }, // 後方でほどけて消える
];

/**
 * 核が走ったあとに散る粒。ここが主役。
 *
 * 軌跡の真上に等間隔で並べると点線に見えるので、接線の法線方向へ
 * ±13 ばらしてある。at は「核がその位置を通る瞬間」に合わせてあり、
 * dx,dy は進行方向の逆 + 法線方向の散り + わずかな落下。
 */
const DUST = [
  { x: 28, y: 215, r: 1.4, at: 0.069, dx: -7.4, dy: 4.8, warm: false, life: "c" },
  { x: 73, y: 204, r: 2.6, at: 0.083, dx: -6.7, dy: -1.7, warm: false, life: "b" },
  { x: 34, y: 211, r: 0.7, at: 0.084, dx: -13.4, dy: -1.7, warm: false, life: "" },
  { x: 60, y: 214, r: 1.2, at: 0.085, dx: -10.7, dy: 8.7, warm: false, life: "" },
  { x: 67, y: 213, r: 0.9, at: 0.092, dx: -9.6, dy: 0.7, warm: false, life: "b" },
  { x: 116, y: 221, r: 0.8, at: 0.098, dx: -8.6, dy: 5.7, warm: false, life: "c" },
  { x: 85, y: 213, r: 1.2, at: 0.099, dx: -8.3, dy: 9.5, warm: true, life: "b" },
  { x: 134, y: 198, r: 1, at: 0.106, dx: -4.5, dy: 5.6, warm: false, life: "" },
  { x: 113, y: 201, r: 0.9, at: 0.107, dx: -7.8, dy: 0.3, warm: false, life: "b" },
  { x: 139, y: 203, r: 0.7, at: 0.107, dx: -6.3, dy: 2, warm: false, life: "" },
  { x: 153, y: 201, r: 1, at: 0.126, dx: -11.9, dy: -0.5, warm: false, life: "c" },
  { x: 175, y: 180, r: 0.7, at: 0.126, dx: -7.4, dy: 8.2, warm: false, life: "b" },
  { x: 163, y: 186, r: 0.6, at: 0.13, dx: -7.2, dy: 11.4, warm: false, life: "c" },
  { x: 197, y: 177, r: 2.6, at: 0.147, dx: -11.7, dy: 11.5, warm: true, life: "b" },
  { x: 237, y: 145, r: 1.4, at: 0.152, dx: -4.2, dy: 5.9, warm: false, life: "" },
  { x: 208, y: 155, r: 1.2, at: 0.154, dx: -10.8, dy: 4.4, warm: false, life: "b" },
  { x: 234, y: 149, r: 0.9, at: 0.154, dx: -6.1, dy: 0.1, warm: false, life: "" },
  { x: 209, y: 180, r: 1.2, at: 0.156, dx: -13.2, dy: 2.9, warm: false, life: "" },
  { x: 230, y: 154, r: 1, at: 0.161, dx: -13.9, dy: 4.1, warm: false, life: "b" },
  { x: 256, y: 140, r: 2.6, at: 0.171, dx: -6, dy: 0.8, warm: false, life: "" },
  { x: 273, y: 135, r: 1.4, at: 0.171, dx: -8.6, dy: 6.4, warm: true, life: "b" },
  { x: 270, y: 141, r: 1.4, at: 0.173, dx: -3.4, dy: 7.7, warm: false, life: "" },
  { x: 281, y: 130, r: 1.4, at: 0.177, dx: -2.4, dy: 10.9, warm: false, life: "b" },
  { x: 288, y: 123, r: 0.9, at: 0.187, dx: -4.9, dy: 6.1, warm: false, life: "c" },
  { x: 305, y: 112, r: 0.7, at: 0.189, dx: -5.4, dy: 10, warm: false, life: "" },
  { x: 333, y: 115, r: 0.9, at: 0.195, dx: -4.3, dy: 5.9, warm: false, life: "b" },
  { x: 329, y: 98, r: 0.7, at: 0.196, dx: -11.7, dy: 9.5, warm: false, life: "b" },
  { x: 373, y: 71, r: 0.6, at: 0.212, dx: -14.2, dy: 4.8, warm: true, life: "b" },
  { x: 338, y: 67, r: 0.7, at: 0.219, dx: -9.4, dy: 4.5, warm: false, life: "" },
  { x: 374, y: 74, r: 0.7, at: 0.224, dx: -8.4, dy: 7.4, warm: false, life: "" },
  { x: 353, y: 75, r: 0.7, at: 0.227, dx: -5.1, dy: 4.7, warm: false, life: "b" },
  { x: 393, y: 36, r: 1, at: 0.231, dx: -3.6, dy: 6.6, warm: false, life: "c" },
  { x: 378, y: 56, r: 1.2, at: 0.235, dx: -2.2, dy: 8.2, warm: false, life: "c" },
  { x: 395, y: 53, r: 0.7, at: 0.238, dx: -4.8, dy: 8.1, warm: false, life: "" },
  { x: 407, y: 43, r: 2.1, at: 0.246, dx: -9.4, dy: 16.4, warm: false, life: "" },
  { x: 430, y: 51, r: 1, at: 0.25, dx: -8.5, dy: 11, warm: false, life: "c" },
];

/**
 * 走っていない間、右側が完全に無音にならないための微光。
 * 軌跡から外れた位置にばらし、本体よりずっと遅い周期でまたたく。
 */
const AMBIENT = [
  { x: 56, y: 150, r: 0.9, at: 0 },
  { x: 108, y: 226, r: 1.1, at: 0.17 },
  { x: 152, y: 118, r: 0.8, at: 0.34 },
  { x: 205, y: 208, r: 1, at: 0.51 },
  { x: 244, y: 84, r: 0.9, at: 0.68 },
  { x: 298, y: 172, r: 1.1, at: 0.85 },
  { x: 334, y: 36, r: 0.8, at: 0.09 },
  { x: 372, y: 124, r: 1, at: 0.26 },
  { x: 398, y: 82, r: 0.9, at: 0.43 },
  { x: 418, y: 170, r: 1.1, at: 0.6 },
];

/** 1 周の長さ。走るのは一瞬で、残りは余韻と間。 */
const CYCLE = 5.8;
/** 核が走り始める / 走り終わる、1 周に対する位置 */
const RUN_FROM = 6;
const RUN_TO = 24;

function CometArt({ still }: { still: boolean }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [live, setLive] = useState(false);

  /* 画面の近くにある間だけ動かす。離れたら止める。 */
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
        本文の右の余白に置く。lg 未満は本文が幅を使い切るので出さない。
        縦に長い箱にすると軌跡も縦長になるので、横長のまま小さく収める。
      */
      className="pointer-events-none absolute right-5 top-1/2 aspect-[440/260] w-[18rem] -translate-y-[56%] xl:right-14 xl:w-[26rem]"
      style={{
        opacity: still ? 0.55 : "clamp(0, calc(var(--p) * 3.5), 1)",
      }}
    >
      <style>{`
        @keyframes v3-comet-run {
          0%, ${RUN_FROM}%  { offset-distance: 0%; opacity: 0; }
          ${RUN_FROM + 3}%  { opacity: 1; }
          ${RUN_TO - 3}%    { opacity: 1; }
          ${RUN_TO}%        { offset-distance: 100%; opacity: 0; }
          100%              { offset-distance: 100%; opacity: 0; }
        }
        @keyframes v3-comet-wake {
          0%, ${RUN_FROM}%  { stroke-dashoffset: var(--d0); opacity: 0; }
          ${RUN_FROM + 3}%  { opacity: 1; }
          ${RUN_TO - 3}%    { opacity: 1; }
          ${RUN_TO}%        { stroke-dashoffset: var(--d1); opacity: 0; }
          100%              { stroke-dashoffset: var(--d1); opacity: 0; }
        }
        /*
          生まれた瞬間だけ速く、消えるのはゆっくり。これが余韻になる。
          寿命を 3 種類用意して、粒が一斉に消えないようにする。
          duration は共通なので、位相（生まれる順）はずれない。
        */
        @keyframes v3-comet-dust {
          0%, 100% { opacity: 0; transform: translate(0, 0) scale(0.25); }
          1.5%     { opacity: 1; transform: translate(0, 0) scale(1); }
          7%       { opacity: 0.6; }
          21%      { opacity: 0;
                     transform: translate(var(--dx), var(--dy)) scale(0.25); }
        }
        @keyframes v3-comet-dust-b {
          0%, 100% { opacity: 0; transform: translate(0, 0) scale(0.25); }
          1.5%     { opacity: 1; transform: translate(0, 0) scale(1); }
          8%       { opacity: 0.66; }
          30%      { opacity: 0;
                     transform: translate(var(--dx), var(--dy)) scale(0.25); }
        }
        @keyframes v3-comet-dust-c {
          0%, 100% { opacity: 0; transform: translate(0, 0) scale(0.3); }
          2%       { opacity: 0.92; transform: translate(0, 0) scale(1); }
          10%      { opacity: 0.5; }
          40%      { opacity: 0;
                     transform: translate(var(--dx), var(--dy)) scale(0.3); }
        }
        /* 本体よりずっと遅い、別のリズム */
        @keyframes v3-comet-amb {
          0%, 100% { opacity: 0.05; }
          50%      { opacity: 0.2; }
        }
        .v3-comet-head {
          offset-path: path("${COMET_PATH}");
          offset-rotate: 0deg;
          offset-distance: 0%;
          animation: v3-comet-run ${CYCLE}s linear infinite;
        }
        .v3-comet-wake {
          animation: v3-comet-wake ${CYCLE}s linear infinite;
        }
        .v3-comet-dust {
          transform-box: fill-box;
          transform-origin: center;
          opacity: 0;
          animation: v3-comet-dust ${CYCLE}s linear infinite;
        }
        .v3-comet-dust-b { animation-name: v3-comet-dust-b; }
        .v3-comet-dust-c { animation-name: v3-comet-dust-c; }
        .v3-comet-amb {
          opacity: 0.05;
          animation: v3-comet-amb ${(CYCLE * 2.3).toFixed(1)}s ease-in-out infinite;
        }
        .v3-comet-paused .v3-comet-head,
        .v3-comet-paused .v3-comet-wake,
        .v3-comet-paused .v3-comet-dust,
        .v3-comet-paused .v3-comet-dust-b,
        .v3-comet-paused .v3-comet-dust-c,
        .v3-comet-paused .v3-comet-amb {
          animation-play-state: paused;
        }
      `}</style>

      <svg
        viewBox="0 0 440 260"
        fill="none"
        className={`h-full w-full ${running ? "" : "v3-comet-paused"}`}
      >
        <defs>
          {/* 尾の色。核の側が明るく、後方で cyan に沈む。 */}
          <linearGradient id="v3-comet-grad" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--v3-accent)" stopOpacity="0.35" />
            <stop offset="65%" stopColor="var(--v3-accent)" stopOpacity="1" />
            <stop offset="100%" stopColor="#F2F8FF" stopOpacity="1" />
          </linearGradient>
          {/* 核のにじみ。filter は使わず、淡い円を重ねるだけにする。 */}
          <radialGradient id="v3-comet-core">
            <stop offset="0%" stopColor="#F4F9FF" stopOpacity="0.55" />
            <stop
              offset="35%"
              stopColor="var(--v3-accent)"
              stopOpacity="0.28"
            />
            <stop offset="100%" stopColor="var(--v3-accent)" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="v3-comet-dustglow">
            <stop offset="0%" stopColor="#DCEAF6" stopOpacity="0.62" />
            <stop offset="55%" stopColor="#DCEAF6" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#DCEAF6" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* 走っていない間の微光。軌跡から外れた位置に置く。 */}
        {AMBIENT.map((d) => (
          <circle
            key={`amb-${d.x}`}
            className={still ? undefined : "v3-comet-amb"}
            cx={d.x}
            cy={d.y}
            r={d.r}
            fill="#CFE0EF"
            opacity={still ? 0.12 : undefined}
            style={
              still
                ? undefined
                : { animationDelay: `${(d.at * CYCLE * 2.3).toFixed(2)}s` }
            }
          />
        ))}

        {still ? (
          /*
            動かさない設定では、走り抜けた瞬間を 1 枚の絵として止める。
            核を大きくすると「光る玉」になるので、ここでも小さいまま。
            粒は核に近いほど濃く、後方ほど薄くして、散った順序を出す。
          */
          <>
            <path
              d={COMET_PATH}
              pathLength={1}
              stroke="url(#v3-comet-grad)"
              strokeWidth="0.9"
              strokeLinecap="round"
              strokeDasharray="0.22 1"
              strokeDashoffset="-0.78"
              strokeOpacity="0.3"
            />
            <g transform="translate(424 34)">
              <circle r="7" fill="url(#v3-comet-core)" />
              <circle r="1.2" fill="#F8FBFF" opacity="0.9" />
            </g>
            {DUST.slice(10).map((d, i, a) => (
              <g key={`sd-${d.x}-${d.y}`}>
                <circle
                  cx={d.x}
                  cy={d.y}
                  r={d.r * 2.6}
                  fill="url(#v3-comet-dustglow)"
                  opacity={0.25 + (i / a.length) * 0.55}
                />
                <circle
                  cx={d.x}
                  cy={d.y}
                  r={d.r}
                  fill={d.warm ? "#E8D7A8" : "#DCEAF6"}
                  opacity={0.2 + (i / a.length) * 0.6}
                />
              </g>
            ))}
          </>
        ) : (
          <>
            {/*
              尾。dasharray の先端が核と同じ位置に来るよう、
              dashoffset を len → len - 1 で動かす。
            */}
            {WAKE.map((w) => (
              <path
                key={`w-${w.len}`}
                className="v3-comet-wake"
                d={COMET_PATH}
                pathLength={1}
                stroke="url(#v3-comet-grad)"
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

            {/* 核。軌跡の上を進む。 */}
            {/*
              核。主役は粒なので、ここは「いちばん明るい一粒」程度に留める。
              大きくすると、それだけが光る玉として目に残る。
            */}
            <g className="v3-comet-head">
              <circle r="7" fill="url(#v3-comet-core)" />
              <circle r="2.4" fill="#F4F9FF" opacity="0.22" />
              <circle r="1.15" fill="#F8FBFF" />
            </g>

            {/* 粒。核が通り過ぎたところから生まれ、離れながら消える。 */}
            {DUST.map((d) => (
              /*
                位置は cx/cy で持つ。transform 属性に置くと、
                CSS アニメーションの transform に丸ごと上書きされて
                粒が SVG の原点へ寄ってしまう。
              */
              <g
                key={`d-${d.x}-${d.y}`}
                className={`v3-comet-dust${d.life ? ` v3-comet-dust-${d.life}` : ""}`}
                style={
                  {
                    "--dx": `${d.dx}px`,
                    "--dy": `${d.dy}px`,
                    animationDelay: `${(d.at * CYCLE).toFixed(2)}s`,
                  } as React.CSSProperties
                }
              >
                <circle
                  cx={d.x}
                  cy={d.y}
                  r={d.r * 2.8}
                  fill="url(#v3-comet-dustglow)"
                />
                <circle
                  cx={d.x}
                  cy={d.y}
                  r={d.r * 1.2}
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

/* ------------------------------------------------------ B案: 弧で包む */

/**
 * B 案。引用の外側を、きらめく軌跡が大きな弧でなぞる構図。
 *
 * 借りているのは「中央の主役に対して、光の軌跡が弧を描いて印象づける」
 * という映画の導入の作法だけ。城・キャラクター・ロゴの形は描かない。
 * 弧そのものも常時は見えず、通り過ぎた粒の余韻としてだけ残る。
 *
 * 座標系:
 *   viewBox は 1180 × 760。1180 は本文の枠（max-w-[1180px]）と同じ幅なので、
 *   x はそのまま本文の位置と対応する（本文は x 40〜648 / y 325〜603）。
 *   箱は本文ブロックの上端を基準に -42.76%（= y 325 が本文の先頭）へ置く。
 *   画面の高さが変わっても、弧と本文の距離は崩れない。
 *
 * 弧の通り道:
 *   引用の下をくぐり、右側を回り込んで、右上へ抜ける。
 *   最初は「上をまたぐ」案にしたが、固定ヘッダーと本文のあいだに 100px ほどしか
 *   空きがなく、弧の頂点が画面の外へ出てしまうので却下した。
 *   下 → 右 → 上 なら引用を左下から包む形になり、視線も次の節へ抜ける。
 *
 *   本文の矩形に入る点は 0。本文の横幅の範囲で弧が最も近づくのは y 613 で、
 *   本文ブロックの下端 603（実際の文字の下端は 539）より下を通る。
 */
const ARC_PATH =
  "M 60 690 C 300 700 520 668 690 596 C 880 516 1010 420 1150 252";

/** 尾。A 案と同じ考え方で、核に近いほど太く明るい。 */
const ARC_WAKE = [
  { len: 0.04, w: 3.4, op: 0.05 },
  { len: 0.022, w: 1.2, op: 0.5 },
  { len: 0.06, w: 0.85, op: 0.2 },
  { len: 0.13, w: 0.6, op: 0.09 },
  { len: 0.23, w: 0.4, op: 0.04 },
];

/**
 * 粒。A 案は「進行方向の逆へほどける」だったが、こちらは **舞い落ちる**。
 * 弧の下に引用があるので、粉が主役の上へ静かに降りてくる形にする。
 * dy は全て正（下向き）。落ちても本文には届かない量に抑えてある。
 */
const ARC_DUST = [
  { x: 123, y: 683, r: 1, at: 0.062, dx: -3.7, dy: 24.8, warm: false, life: "b" },
  { x: 80, y: 688, r: 1.8, at: 0.069, dx: -2.7, dy: 20.4, warm: false, life: "" },
  { x: 125, y: 685, r: 1.4, at: 0.069, dx: -8.7, dy: 18.1, warm: false, life: "" },
  { x: 151, y: 701, r: 1.6, at: 0.072, dx: -9.1, dy: 29.8, warm: false, life: "" },
  { x: 195, y: 676, r: 1.4, at: 0.09, dx: -11.4, dy: 26.8, warm: true, life: "c" },
  { x: 212, y: 706, r: 1.6, at: 0.093, dx: -2.3, dy: 15.1, warm: false, life: "" },
  { x: 245, y: 683, r: 1.8, at: 0.093, dx: -3.3, dy: 19.6, warm: false, life: "c" },
  { x: 278, y: 679, r: 1.6, at: 0.097, dx: 2.3, dy: 17.6, warm: false, life: "b" },
  { x: 305, y: 685, r: 1.2, at: 0.124, dx: -4.7, dy: 27.3, warm: false, life: "" },
  { x: 357, y: 686, r: 1, at: 0.138, dx: -0.7, dy: 15.6, warm: false, life: "" },
  { x: 412, y: 670, r: 1.6, at: 0.145, dx: -6.3, dy: 27, warm: false, life: "c" },
  { x: 408, y: 697, r: 1.4, at: 0.147, dx: -0.9, dy: 13.2, warm: false, life: "b" },
  { x: 389, y: 678, r: 2.2, at: 0.148, dx: 1.4, dy: 17.2, warm: false, life: "c" },
  { x: 476, y: 633, r: 1.3, at: 0.156, dx: -9.8, dy: 17.6, warm: false, life: "" },
  { x: 452, y: 662, r: 1.2, at: 0.162, dx: -3.5, dy: 17.4, warm: true, life: "" },
  { x: 550, y: 651, r: 0.9, at: 0.186, dx: -1.2, dy: 15.8, warm: false, life: "b" },
  { x: 522, y: 644, r: 2.2, at: 0.188, dx: 4.5, dy: 24.7, warm: false, life: "c" },
  { x: 536, y: 657, r: 0.9, at: 0.195, dx: -0.7, dy: 21.7, warm: false, life: "b" },
  { x: 570, y: 627, r: 0.9, at: 0.196, dx: -7.6, dy: 27.8, warm: false, life: "b" },
  { x: 616, y: 607, r: 1.2, at: 0.201, dx: -4.7, dy: 22.6, warm: false, life: "c" },
  { x: 612, y: 627, r: 1.2, at: 0.207, dx: -3.1, dy: 18.5, warm: false, life: "b" },
  { x: 641, y: 614, r: 1.6, at: 0.207, dx: -1.9, dy: 11.9, warm: false, life: "c" },
  { x: 662, y: 603, r: 1.3, at: 0.223, dx: -6.6, dy: 12.6, warm: true, life: "c" },
  { x: 697, y: 586, r: 1.3, at: 0.229, dx: -2.4, dy: 26, warm: false, life: "" },
  { x: 745, y: 577, r: 1, at: 0.24, dx: 1.3, dy: 16.6, warm: false, life: "" },
  { x: 792, y: 546, r: 1, at: 0.256, dx: -0.5, dy: 17.2, warm: false, life: "b" },
  { x: 734, y: 570, r: 1.8, at: 0.262, dx: -4.5, dy: 18, warm: false, life: "b" },
  { x: 835, y: 518, r: 1.6, at: 0.27, dx: -5.1, dy: 19.7, warm: false, life: "" },
  { x: 773, y: 554, r: 1, at: 0.275, dx: 4, dy: 22, warm: false, life: "" },
  { x: 885, y: 491, r: 1.4, at: 0.289, dx: 1.5, dy: 16.5, warm: false, life: "" },
  { x: 832, y: 519, r: 1.4, at: 0.293, dx: 0.6, dy: 28.2, warm: false, life: "" },
  { x: 892, y: 497, r: 1, at: 0.297, dx: -4.7, dy: 22.3, warm: true, life: "c" },
  { x: 915, y: 492, r: 1.8, at: 0.301, dx: -7.1, dy: 16.3, warm: false, life: "b" },
  { x: 914, y: 452, r: 1.4, at: 0.304, dx: 1.2, dy: 12, warm: false, life: "c" },
  { x: 957, y: 419, r: 1.3, at: 0.332, dx: -5.1, dy: 27.7, warm: false, life: "b" },
  { x: 996, y: 406, r: 0.9, at: 0.337, dx: 3.4, dy: 17.7, warm: false, life: "c" },
  { x: 979, y: 406, r: 1, at: 0.351, dx: 3.6, dy: 12.7, warm: false, life: "b" },
  { x: 1021, y: 384, r: 1, at: 0.354, dx: 1.4, dy: 13.6, warm: false, life: "b" },
  { x: 1040, y: 362, r: 1, at: 0.359, dx: -7, dy: 14.1, warm: false, life: "c" },
  { x: 1065, y: 351, r: 1.6, at: 0.365, dx: -2, dy: 22.9, warm: false, life: "c" },
  { x: 1067, y: 336, r: 0.9, at: 0.365, dx: -7.8, dy: 19.3, warm: true, life: "" },
  { x: 1112, y: 298, r: 1.2, at: 0.398, dx: -0.5, dy: 22.1, warm: false, life: "c" },
  { x: 1132, y: 299, r: 1, at: 0.404, dx: -6.4, dy: 12.3, warm: false, life: "" },
  { x: 1137, y: 256, r: 1, at: 0.411, dx: 3.1, dy: 11.9, warm: false, life: "c" },
];

/** 走っていない間の微光。弧から離して、引用の周りに薄く散らす。 */
const ARC_AMBIENT = [
  { x: 176, y: 636, r: 0.9, at: 0 },
  { x: 330, y: 726, r: 1.1, at: 0.19 },
  { x: 498, y: 602, r: 0.8, at: 0.38 },
  { x: 704, y: 668, r: 1, at: 0.57 },
  { x: 796, y: 470, r: 0.9, at: 0.76 },
  { x: 900, y: 592, r: 1.1, at: 0.11 },
  { x: 1004, y: 300, r: 0.8, at: 0.3 },
  { x: 1088, y: 470, r: 1, at: 0.49 },
  { x: 1160, y: 380, r: 0.9, at: 0.68 },
  { x: 952, y: 540, r: 0.8, at: 0.87 },
];

/** 1 周。走るのは 5%〜40%（約 2.9 秒 / 444px 秒）、残りは余韻と間。 */
const ARC_CYCLE = 8.2;
const ARC_FROM = 5;
const ARC_TO = 40;

function ArcArt({ still }: { still: boolean }) {
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
        本文ブロックの上端を基準に、弧の高さぶん持ち上げる。
        -42.76% は viewBox の y=325（本文の先頭）を本文の上端に合わせる値。

        xl（1280px）未満では出さない。viewBox の x はコンテナ幅に合わせて
        伸縮するのに対し、本文の余白(40px)と最大幅(38rem)は固定なので、
        コンテナが 1180px に達しない幅では両者の座標がずれ、弧が文字へ
        かかってしまうため（1024px で実測 14 点が本文に重なった）。
      */
      className="pointer-events-none absolute inset-x-0 top-0 hidden aspect-[1180/760] -translate-y-[42.76%] xl:block"
      style={{
        opacity: still ? 0.55 : "clamp(0, calc(var(--p) * 3), 1)",
      }}
    >
      <style>{`
        @keyframes v3-arc-run {
          0%, ${ARC_FROM}%  { offset-distance: 0%; opacity: 0; }
          ${ARC_FROM + 3}%  { opacity: 1; }
          ${ARC_TO - 4}%    { opacity: 1; }
          ${ARC_TO}%        { offset-distance: 100%; opacity: 0; }
          100%              { offset-distance: 100%; opacity: 0; }
        }
        @keyframes v3-arc-wake {
          0%, ${ARC_FROM}%  { stroke-dashoffset: var(--d0); opacity: 0; }
          ${ARC_FROM + 3}%  { opacity: 1; }
          ${ARC_TO - 4}%    { opacity: 1; }
          ${ARC_TO}%        { stroke-dashoffset: var(--d1); opacity: 0; }
          100%              { stroke-dashoffset: var(--d1); opacity: 0; }
        }
        @keyframes v3-arc-dust {
          0%, 100% { opacity: 0; transform: translate(0, 0) scale(0.25); }
          1%       { opacity: 1; transform: translate(0, 0) scale(1); }
          5%       { opacity: 0.6; }
          15%      { opacity: 0;
                     transform: translate(var(--dx), var(--dy)) scale(0.25); }
        }
        @keyframes v3-arc-dust-b {
          0%, 100% { opacity: 0; transform: translate(0, 0) scale(0.25); }
          1%       { opacity: 1; transform: translate(0, 0) scale(1); }
          6%       { opacity: 0.66; }
          21%      { opacity: 0;
                     transform: translate(var(--dx), var(--dy)) scale(0.25); }
        }
        @keyframes v3-arc-dust-c {
          0%, 100% { opacity: 0; transform: translate(0, 0) scale(0.3); }
          1.5%     { opacity: 0.9; transform: translate(0, 0) scale(1); }
          8%       { opacity: 0.48; }
          28%      { opacity: 0;
                     transform: translate(var(--dx), var(--dy)) scale(0.3); }
        }
        @keyframes v3-arc-amb {
          0%, 100% { opacity: 0.05; }
          50%      { opacity: 0.18; }
        }
        .v3-arc-head {
          offset-path: path("${ARC_PATH}");
          offset-rotate: 0deg;
          offset-distance: 0%;
          animation: v3-arc-run ${ARC_CYCLE}s linear infinite;
        }
        .v3-arc-wake { animation: v3-arc-wake ${ARC_CYCLE}s linear infinite; }
        .v3-arc-dust {
          transform-box: fill-box;
          transform-origin: center;
          opacity: 0;
          animation: v3-arc-dust ${ARC_CYCLE}s linear infinite;
        }
        .v3-arc-dust-b { animation-name: v3-arc-dust-b; }
        .v3-arc-dust-c { animation-name: v3-arc-dust-c; }
        .v3-arc-amb {
          opacity: 0.05;
          animation: v3-arc-amb ${(ARC_CYCLE * 2.1).toFixed(1)}s ease-in-out infinite;
        }
        .v3-arc-paused .v3-arc-head,
        .v3-arc-paused .v3-arc-wake,
        .v3-arc-paused .v3-arc-dust,
        .v3-arc-paused .v3-arc-dust-b,
        .v3-arc-paused .v3-arc-dust-c,
        .v3-arc-paused .v3-arc-amb {
          animation-play-state: paused;
        }
      `}</style>

      <svg
        viewBox="0 0 1180 760"
        fill="none"
        className={`h-full w-full ${running ? "" : "v3-arc-paused"}`}
      >
        <defs>
          <linearGradient id="v3-arc-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--v3-accent)" stopOpacity="0.3" />
            <stop offset="55%" stopColor="#F2F8FF" stopOpacity="1" />
            <stop offset="100%" stopColor="var(--v3-accent)" stopOpacity="0.9" />
          </linearGradient>
          <radialGradient id="v3-arc-core">
            <stop offset="0%" stopColor="#F4F9FF" stopOpacity="0.55" />
            <stop offset="35%" stopColor="var(--v3-accent)" stopOpacity="0.26" />
            <stop offset="100%" stopColor="var(--v3-accent)" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="v3-arc-dustglow">
            <stop offset="0%" stopColor="#DCEAF6" stopOpacity="0.62" />
            <stop offset="55%" stopColor="#DCEAF6" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#DCEAF6" stopOpacity="0" />
          </radialGradient>
        </defs>

        {ARC_AMBIENT.map((d) => (
          <circle
            key={`aamb-${d.x}`}
            className={still ? undefined : "v3-arc-amb"}
            cx={d.x}
            cy={d.y}
            r={d.r}
            fill="#CFE0EF"
            opacity={still ? 0.12 : undefined}
            style={
              still
                ? undefined
                : { animationDelay: `${(d.at * ARC_CYCLE * 2.1).toFixed(2)}s` }
            }
          />
        ))}

        {still ? (
          <>
            <path
              d={ARC_PATH}
              pathLength={1}
              stroke="url(#v3-arc-grad)"
              strokeWidth="0.9"
              strokeLinecap="round"
              strokeDasharray="0.2 1"
              strokeDashoffset="-0.8"
              strokeOpacity="0.3"
            />
            <g transform="translate(1150 252)">
              <circle r="7" fill="url(#v3-arc-core)" />
              <circle r="1.2" fill="#F8FBFF" opacity="0.9" />
            </g>
            {ARC_DUST.slice(12).map((d, i, a) => (
              <g key={`asd-${d.x}-${d.y}`}>
                <circle
                  cx={d.x}
                  cy={d.y}
                  r={d.r * 2.6}
                  fill="url(#v3-arc-dustglow)"
                  opacity={0.22 + (i / a.length) * 0.5}
                />
                <circle
                  cx={d.x}
                  cy={d.y}
                  r={d.r}
                  fill={d.warm ? "#E8D7A8" : "#DCEAF6"}
                  opacity={0.2 + (i / a.length) * 0.55}
                />
              </g>
            ))}
          </>
        ) : (
          <>
            {ARC_WAKE.map((w) => (
              <path
                key={`aw-${w.len}`}
                className="v3-arc-wake"
                d={ARC_PATH}
                pathLength={1}
                stroke="url(#v3-arc-grad)"
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

            <g className="v3-arc-head">
              <circle r="7" fill="url(#v3-arc-core)" />
              <circle r="2.4" fill="#F4F9FF" opacity="0.22" />
              <circle r="1.15" fill="#F8FBFF" />
            </g>

            {ARC_DUST.map((d) => (
              <g
                key={`ad-${d.x}-${d.y}`}
                className={`v3-arc-dust${d.life ? ` v3-arc-dust-${d.life}` : ""}`}
                style={
                  {
                    "--dx": `${d.dx}px`,
                    "--dy": `${d.dy}px`,
                    animationDelay: `${(d.at * ARC_CYCLE).toFixed(2)}s`,
                  } as React.CSSProperties
                }
              >
                <circle
                  cx={d.x}
                  cy={d.y}
                  r={d.r * 2.8}
                  fill="url(#v3-arc-dustglow)"
                />
                <circle
                  cx={d.x}
                  cy={d.y}
                  r={d.r * 1.2}
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
 * どちらの案を出すか。?turn=comet で A 案（右側の流れ星）に戻せる。
 * 比較のためだけの切り替えで、決まったら片方を消す。
 */
function useTurnVariant() {
  const [variant, setVariant] = useState<"arc" | "comet">("arc");
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("turn");
    if (q === "comet") setVariant("comet");
  }, []);
  return variant;
}

export default function Turn() {
  /* sticky が張り付いている区間の進み具合を --p に書く */
  const { ref, reduced } = useScrollProgress<HTMLElement>({
    mode: "sticky",
    varName: "--p",
  });
  const variant = useTurnVariant();

  /*
    動きを止める設定では、長いスクロールを読むための条件にしない。
    背の高い箱も sticky もやめて、完成した状態の文章をそのまま置く。
    右の光は消さずに、動かない一枚絵として残す。
  */
  if (reduced) {
    return (
      <section ref={ref} className="relative">
        <div className="relative mx-auto max-w-[1180px] px-5 py-24 min-[360px]:px-6 md:px-10 md:py-32">
          <div className="max-w-[34rem] lg:max-w-[38rem]">
            <span
              aria-hidden="true"
              className="mb-9 block h-px w-24 bg-[var(--v3-accent)]"
            />
            <p className="text-[16px] font-medium leading-[1.8] tracking-tight min-[360px]:text-[19px] text-[var(--v3-fg)] [word-break:auto-phrase] md:text-[28px] md:leading-[1.65] lg:text-[34px]">
              <span className="block">「技術的に動くもの」と</span>
              <span className="block">「現場で使われ続けるもの」は違う。</span>
            </p>
            <p className="mt-6 text-[14px] leading-8 md:mt-8 text-[var(--v3-fg-2)] [word-break:auto-phrase] md:text-[15px]">
              実店舗へ届けて、初めて見えたことでした。
            </p>
          </div>

          {/* 弧は本文カラムではなく、1180px の枠を基準に置く */}
          {variant === "arc" && <ArcArt still />}
          {variant === "comet" && (
            <div className="pointer-events-none absolute inset-0 mx-auto hidden w-full max-w-[1180px] px-10 lg:block">
              <CometArt still />
            </div>
          )}
        </div>
      </section>
    );
  }

  return (
    /*
      高さ = 画面1枚 + 移動ぶん。travel は SP 74vh / PC 88vh。
      --p は JS 前提で 1（＝完成状態）を初期値にしておく。JS が無い環境でも
      文章は最初から全部読める。
    */
    <section
      ref={ref}
      className="relative h-[150vh] md:h-[170vh]"
      style={{ "--p": "1" } as React.CSSProperties}
    >
      {/*
        箱を画面より低くしてある。中央寄せのまま 100vh にすると、コピーの上下に
        半画面ずつの空きができ、Rail を抜けてから文章が見えるまでに
        「何も映っていない時間」が生まれるため。
      */}
      <div
        data-sticky
        className="sticky top-0 flex h-[76vh] items-center md:h-[82vh]"
      >
        <div className="relative mx-auto w-full max-w-[1180px] px-5 min-[360px]:px-6 md:px-10">
          <div className="max-w-[34rem] lg:max-w-[38rem]">
            {/*
              「点を線でつなぐ」の反復。進捗ぶんだけ横に伸びる細い線を
              文章の上に置いて、いまどこを通過中かを言葉以外で示す。
              文章が出る前の唯一の手がかりなので、これだけは最初から見せる。
            */}
            <span
              aria-hidden="true"
              className="mb-9 block h-px w-24 origin-left bg-[var(--v3-accent)]"
              style={{
                transform: "scaleX(clamp(0.08, var(--p), 1))",
                opacity: "clamp(0.2, var(--p), 1)",
              }}
            />

            <p className="text-[16px] font-medium leading-[1.8] tracking-tight min-[360px]:text-[19px] text-[var(--v3-fg)] [word-break:auto-phrase] md:text-[28px] md:leading-[1.65] lg:text-[34px]">
              {/* 何も無い状態から、短い区間で一気に立ち上げる */}
              <Phrase from={0.06} to={0.24}>
                「技術的に動くもの」と
              </Phrase>
              <Phrase from={0.24} to={0.42}>
                「現場で使われ続けるもの」は違う。
              </Phrase>
            </p>

            {/* どこで知ったか、という事実だけ。教訓は足さない。 */}
            <Phrase
              from={0.44}
              to={0.58}
              rise={8}
              className="mt-6 text-[14px] leading-8 md:mt-8 text-[var(--v3-fg-2)] [word-break:auto-phrase] md:text-[15px]"
            >
              実店舗へ届けて、初めて見えたことでした。
            </Phrase>

            {/* 読み終わる頃に下へ抜ける線が出る。矢印や「続き」の文字は置かない。 */}
            <span
              aria-hidden="true"
              className="mt-10 block h-24 w-px origin-top bg-gradient-to-b from-[var(--v3-accent)]/55 to-transparent md:h-40"
              style={{
                transform: "scaleY(clamp(0, calc((var(--p) - 0.62) / 0.3), 1))",
              }}
            />
          </div>

          {/* B案: 引用の外側を弧がなぞる。本文と同じ枠を基準にする。 */}
          {variant === "arc" && <ArcArt still={false} />}
        </div>

        {/*
          A案: 本文の右の余白で流れ星が走る。
          本文と同じ最大幅の枠を sticky 領域いっぱいに敷き、その右端に寄せる。
          どちらも本文側のレイアウトには一切触れない。
        */}
        {variant === "comet" && (
          <div className="pointer-events-none absolute inset-0 mx-auto hidden w-full max-w-[1180px] px-10 lg:block">
            <CometArt still={false} />
          </div>
        )}
      </div>
    </section>
  );
}
