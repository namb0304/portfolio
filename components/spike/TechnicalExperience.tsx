/**
 * Visual Spike 2026-09 — 旧 Skills（4カード・アイコン14個）は使わない。
 * ロゴを並べず「どこで使ったか」を出す。人物像の主役にはしない。
 */
import Section from "./Section";
import { technicalExperience } from "@/config/spike";

export default function TechnicalExperience() {
  return (
    <Section
      id="tech"
      eyebrow="Technical Experience"
      title="どこで使ったか"
      weight="minor"
      lead="技術の数ではなく、本番で動かしているものと、そうでないものを分けています。"
    >
      <div className="space-y-12">
        {technicalExperience.map((g) => (
          <div key={g.group}>
            <div className="flex flex-col gap-1 border-b border-line pb-3 md:flex-row md:items-baseline md:justify-between md:gap-6">
              <h3 className="text-[15px] font-semibold text-ink">{g.group}</h3>
              <p className="text-[12px] text-ink-3">{g.note}</p>
            </div>
            <dl className="mt-1">
              {g.items.map((it) => (
                <div
                  key={it.tech}
                  className="grid grid-cols-1 gap-x-8 gap-y-0.5 border-b border-line/60 py-3.5 md:grid-cols-[minmax(0,280px)_1fr] md:items-baseline"
                >
                  <dt className="text-[14px] text-ink">{it.tech}</dt>
                  <dd className="text-[13px] leading-6 text-ink-3">
                    {it.where}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
    </Section>
  );
}
