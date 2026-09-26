"use client";

/**
 * 南保俊輔 固有の visual motif — 「つながり」。
 *
 * 本人の考え方は
 *   課題理解 → 要件・仕様 → 実装 → 導入 → 運用改善
 * であり、バラバラの実績ではなく **ひと続きであること** が本人の特徴。
 * それを「節（ノード）を1本の細い線でつなぐ」形にした。
 *
 * 使う場所は 2 箇所だけ（Featured project / Hero の小さな accent line）。
 * 全画面に線を引くと timeline になってしまうので、意図的に増やさない。
 *
 * 線は reveal で一度だけ引かれる。スクロールのたびには再生しない。
 */
import { useRevealOnce } from "./motion";

type Node = { step: string; body: string };

/** 横並び時は線の向きが変わるので、方向だけ差し替える */
const LINE_H =
  "linear-gradient(to right, var(--v3-rule) 0%, var(--v3-rule) 72%, transparent 100%)";

export default function Flow({
  nodes,
  accent = "var(--v3-accent)",
  orientation = "responsive",
}: {
  nodes: readonly Node[];
  accent?: string;
  /** responsive: SPは縦・PCは横 / vertical: 常に縦（狭いカラム用） */
  orientation?: "responsive" | "vertical";
}) {
  const { ref, shown } = useRevealOnce<HTMLOListElement>();

  return (
    <ol
      ref={ref}
      className={
        orientation === "vertical"
          ? "relative grid grid-cols-1 gap-y-5 [--line-dir:linear-gradient(to_bottom,var(--v3-rule)_0%,var(--v3-rule)_72%,transparent_100%)]"
          : "relative grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-3 [--line-dir:linear-gradient(to_bottom,var(--v3-rule)_0%,var(--v3-rule)_72%,transparent_100%)] sm:[--line-dir:var(--line-h)]"
      }
      style={
        {
          "--flow-accent": accent,
          "--line-h": LINE_H,
        } as React.CSSProperties
      }
    >
      {/* 節をつなぐ線。SP では縦、PC では横に引かれる。 */}
      <span
        aria-hidden="true"
        className={`absolute left-[3px] top-2 bottom-2 w-px origin-top transition-transform duration-[600ms] ease-out ${
          orientation === "vertical"
            ? ""
            : "sm:left-0 sm:right-0 sm:top-[3px] sm:bottom-auto sm:h-px sm:w-auto sm:origin-left"
        }`}
        style={{
          transform: shown ? "scale(1)" : "scaleY(0)",
          transitionProperty: "transform",
          // 最後の節の先は消えていく。終わった話ではなく、続いていることの表現。
          background: "var(--line-dir)",
        }}
      />

      {nodes.map((n, i) => (
        <li
          key={n.step}
          className={
            orientation === "vertical"
              ? "relative pl-6"
              : "relative pl-6 sm:pl-0 sm:pt-6"
          }
        >
          {/* 節。最後の節（結果）だけ塗りつぶして、流れの到達点を示す。 */}
          <span
            aria-hidden="true"
            className={`absolute left-0 top-[6px] h-[7px] w-[7px] rounded-[1px] transition-all duration-300 ${
              orientation === "vertical" ? "" : "sm:top-0"
            }`}
            style={{
              background:
                i === nodes.length - 1 ? "var(--flow-accent)" : "var(--v3-bg)",
              border: `1px solid ${
                i === nodes.length - 1 ? "var(--flow-accent)" : "var(--v3-fg-2)"
              }`,
              opacity: shown ? 1 : 0,
              transitionDelay: `${180 + i * 90}ms`,
            }}
          />
          <p className="text-[11px] font-semibold tracking-[0.08em] text-[var(--v3-fg-2)]">
            {n.step}
          </p>
          <p className="mt-1.5 text-[13px] leading-6 text-[var(--v3-fg)]">
            {n.body}
          </p>
        </li>
      ))}
    </ol>
  );
}
