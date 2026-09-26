/**
 * Visual Spike 2026-09 — STORES を「企業名」ではなく「考え方の変化」として置く。
 * Project Card にしない。失敗談カードにもしない。
 */
import Section from "./Section";
import { storesExperience as s } from "@/config/spike";

export default function ThinkingSection() {
  return (
    <Section
      id="thinking"
      eyebrow="Experience / Thinking"
      title="実装に入ると、最初に置いた課題を基準として持ち続けられなかった"
      lead={
        <p className="font-mono text-[12px] tracking-wide text-ink-3">
          {s.when} ・ {s.what} ・ {s.detail}
        </p>
      }
    >
      <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:gap-x-16 md:gap-y-0">
        <div className="md:border-r md:border-line md:pr-16">
          <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3">
            What happened
          </h3>
          <ol className="mt-6 space-y-5">
            {s.whatHappened.map((p, i) => (
              <li key={i} className="flex gap-4">
                <span
                  aria-hidden="true"
                  className="mt-1 font-mono text-[11px] text-ink-3"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-[15px] leading-8 text-ink-2">{p}</p>
              </li>
            ))}
          </ol>
        </div>

        <div>
          <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3">
            いま意識していること
          </h3>
          <ul className="mt-6 space-y-3.5">
            {s.nowPracticing.map((p) => (
              <li key={p} className="flex gap-3.5">
                <span
                  aria-hidden="true"
                  className="mt-[11px] h-px w-3.5 shrink-0 bg-ink-3"
                />
                <span className="text-[15px] leading-8 text-ink">{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="mt-14 max-w-3xl border-t border-line pt-7 text-[14px] leading-8 text-ink-3">
        {s.closing}
      </p>
    </Section>
  );
}
