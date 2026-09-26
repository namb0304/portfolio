/**
 * Visual Spike 2026-09 の TOP（旧Home）。
 *
 * 2026-09-26 に Home v3 を正式な / へ昇格したため、公開経路からは外れている。
 * 参照用に構成をそのまま残してあるだけで、どのルートからも描画されない。
 *
 * 情報の順番：何者か → 一番強い証拠 → その他の経験 → どう考えるようになったか → 技術的な裏付け。
 * 旧構成は components/LegacyHome.tsx にそのまま残してある（戻す場合はそれを返す）。
 */
import Hero from "@/components/spike/Hero";
import FeaturedHirolia from "@/components/spike/FeaturedHirolia";
import SelectedWork from "@/components/spike/SelectedWork";
import ThinkingSection from "@/components/spike/ThinkingSection";
import TechnicalExperience from "@/components/spike/TechnicalExperience";
import Milestones from "@/components/spike/Milestones";
import SpikeGitHub from "@/components/spike/SpikeGitHub";
import Contact from "@/components/Contact";

export default function SpikeHome() {
  return (
    <>
      {/* 1. 何者か */}
      <Hero />

      {/* 2. 一番強い証拠 */}
      <FeaturedHirolia />

      {/* 3. その他の経験 */}
      <SelectedWork />

      {/* 4. そこからどう考えるようになったか */}
      <ThinkingSection />

      {/* 5. 技術的な裏付け（主役にしない） */}
      <TechnicalExperience />
      <Milestones />
      <SpikeGitHub />

      {/* 6. 連絡先（既存フォームを流用） */}
      <div className="border-t border-line">
        <Contact />
      </div>
    </>
  );
}
