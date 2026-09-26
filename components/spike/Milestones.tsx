/**
 * Visual Spike 2026-09 — 旧 Timeline（13件 + フィルタ10個 + トグル3系統 + 入れ子スクロール）は
 * 今回レンダリングしない。7件に絞り、並び順は書き手が決める（トグルを置かない）。
 */
import Section from "./Section";
import { milestones } from "@/config/spike";

export default function Milestones() {
  return (
    <Section
      id="milestones"
      eyebrow="Selected Milestones"
      title="変化に関係したものだけ"
      weight="minor"
    >
      <ol className="relative border-t border-line pl-6 md:pl-0">
        <span
          aria-hidden="true"
          className="absolute left-[3px] top-8 bottom-8 w-px bg-line md:hidden"
        />
        {milestones.map((m) => {
          const current = "current" in m && m.current;
          return (
            <li
              key={m.date + m.title}
              className="relative grid grid-cols-1 gap-x-8 gap-y-1 border-b border-line py-5 md:grid-cols-[130px_1fr] md:items-baseline"
            >
              <span
                aria-hidden="true"
                className={`absolute -left-6 top-[26px] h-[7px] w-[7px] rounded-full md:hidden ${
                  current ? "bg-accent" : "bg-ink-3"
                }`}
              />
              <p
                className={`font-mono text-[12px] ${
                  current ? "text-accent" : "text-ink-3"
                }`}
              >
                {m.date}
              </p>
              <p
                className={`text-[15px] leading-7 ${
                  current ? "text-ink" : "text-ink-2"
                }`}
              >
                {m.title}
              </p>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
