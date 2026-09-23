"use client";

/**
 * /design-lab — Visual Direction の比較用ページ。
 *
 * - サイト本体ではない。TOP には一切反映していない。
 * - 3案は**同じコンテンツ**（config/lab.ts）を使う。違うのは構図・密度・階層・インタラクション。
 * - 各案で作るのは Header / Hero / Featured Hirolia / Secondary work の4ブロックのみ。
 */
import { useState } from "react";
import DirectionA from "@/components/lab/DirectionA";
import DirectionB from "@/components/lab/DirectionB";
import DirectionC from "@/components/lab/DirectionC";
import HybridV2 from "@/components/lab/HybridV2";
import HomeV3 from "@/components/lab/v3/HomeV3";
import HomeV3Base from "@/components/lab/v3base/HomeV3";
import { displayMincho, displaySerif } from "./fonts";

type Key = "V3" | "V3B" | "H" | "A" | "B" | "C" | "all";

const directions = [
  {
    key: "V3" as const,
    name: "Portfolio Home v3",
    keywords: "person first / portrait anchor / deep navy + cool blue / Home全体",
    thesis:
      "主語は Hirolia ではなく本人。旧Portfolioの良かった資産を戻し、2026年の人物像へ更新する。",
  },
  {
    key: "V3B" as const,
    name: "Home v3（polish前）",
    keywords: "比較用に凍結した版。v3 の polish 前の見た目",
    thesis: "polish の前後を見比べるために残している。コピーは共通の config を見ているため最新。",
  },
  {
    key: "H" as const,
    name: "Hybrid v2",
    keywords: "A 70% + C 30% / 明朝は2箇所だけ / 伝票の帯 / 切替は1箇所",
    thesis:
      "Aの見た瞬間の強さに、Cの「実際に動いている」走査レイヤーを足す。dashboardにはしない。",
  },
  {
    key: "A" as const,
    name: "Product Editorial",
    keywords: "editorial / 明朝 / サフラン / 非対称 / 大きな製品画像",
    thesis:
      "Hirolia を「学生の制作物」ではなく、動いている Product の launch page として見せる。",
  },
  {
    key: "B" as const,
    name: "Design Engineer / Interactive",
    keywords: "monochrome / 2状態の切り替え / tactile / 低彩度",
    thesis:
      "「動く ≠ 使われる」を読ませるのではなく、操作して分からせる。色は状態の表現に限定する。",
  },
  {
    key: "C" as const,
    name: "Product System",
    keywords: "light / 高密度 / status strip / 記録らしさ",
    thesis:
      "「実運用まで持っている」を視覚言語にする。3案で唯一のライト基調。",
  },
];

export default function DesignLab() {
  const [view, setView] = useState<Key>("V3");

  const show = (k: "V3" | "V3B" | "H" | "A" | "B" | "C") => view === "all" || view === k;

  return (
    <div className="min-h-screen bg-[#0E1013]">
      {/* ===== Lab のツールバー。3案のどれとも違う見た目にして、評価を汚さない ===== */}
      <div className="sticky top-0 z-50 border-b border-[#23272E] bg-[#0E1013]/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center gap-x-6 gap-y-3 px-5 py-3 md:px-8">
          <div>
            <p className="text-[13px] font-semibold text-[#E6E8EB]">
              Design Lab
            </p>
            <p className="text-[11px] text-[#7C838C]">
              同じ内容・3つの Visual Direction（TOPには未反映）
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Visual Direction"
            className="ml-auto flex flex-wrap gap-1 rounded-lg border border-[#23272E] p-1"
          >
            {(
              [
                ["V3", "Home v3"],
                ["V3B", "v3 polish前"],
                ["H", "Hybrid v2"],
                ["A", "A — Editorial"],
                ["B", "B — Interactive"],
                ["C", "C — System"],
                ["all", "縦に比較"],
              ] as const
            ).map(([k, label]) => (
              <button
                key={k}
                role="tab"
                aria-selected={view === k}
                onClick={() => setView(k)}
                className={`rounded-md px-3.5 py-1.5 text-[12px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6E9BD1] ${
                  view === k
                    ? "bg-[#E6E8EB] text-[#0E1013]"
                    : "text-[#7C838C] hover:text-[#E6E8EB]"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ===== 各 Direction ===== */}
      {directions.map((d) =>
        show(d.key) ? (
          <section key={d.key} aria-label={`Direction ${d.key} — ${d.name}`}>
            {/* 見出し帯。デザインの一部ではなく、ラボの注釈であることが分かる見た目にする */}
            <div className="border-y border-[#23272E] bg-[#15181C]">
              <div className="mx-auto flex max-w-[1200px] flex-col gap-1.5 px-5 py-4 md:flex-row md:items-baseline md:gap-6 md:px-8">
                <p className="text-[13px] font-bold text-[#E6E8EB]">
                  Direction {d.key}
                  <span className="ml-2.5 font-normal text-[#9AA1AA]">
                    {d.name}
                  </span>
                </p>
                <p className="text-[11px] text-[#6E757E]">{d.keywords}</p>
                <p className="text-[11px] leading-5 text-[#7C838C] md:ml-auto md:max-w-[46%] md:text-right">
                  {d.thesis}
                </p>
              </div>
            </div>

            {d.key === "V3" && <HomeV3 />}
            {d.key === "V3B" && <HomeV3Base />}
            {d.key === "H" && <HybridV2 minchoClass={displayMincho.className} />}
            {d.key === "A" && (
              <DirectionA serifClass={displaySerif.className} />
            )}
            {d.key === "B" && <DirectionB />}
            {d.key === "C" && <DirectionC />}
          </section>
        ) : null
      )}

      <footer className="border-t border-[#23272E] px-5 py-10 md:px-8">
        <div className="mx-auto max-w-[1200px] space-y-1.5">
          <p className="text-[11px] text-[#6E757E]">
            画像: Thank x Chain は実物。Hirolia は前身プロダクト（モバオル）の画面を差し替え前提で使用、
            残りは撮影内容を明示した placeholder。
          </p>
          <p className="text-[11px] text-[#6E757E]">
            コピー・色・書体はすべて検証用の仮。Contact はこのページには置いていない。
          </p>
        </div>
      </footer>
    </div>
  );
}
