/**
 * Visual Spike 2026-09 — Hirolia 以外。同格には並べない。
 * Thanks と Thank x Chain は「一続きの経験」として1件で扱う（カードを2枚にしない）。
 */
import { FaArrowUpRightFromSquare, FaGithub } from "react-icons/fa6";
import Section from "./Section";
import { otherWork, thankXChain } from "@/config/spike";

export default function SelectedWork() {
  return (
    <Section
      id="work"
      eyebrow="Selected Work"
      title={thankXChain.name}
      lead={
        <>
          <span className="block text-ink">{thankXChain.tagline}</span>
          <span className="mt-2 block text-[13px] text-ink-3">
            {thankXChain.period} ・ {thankXChain.context}
          </span>
        </>
      }
    >
      <p className="max-w-2xl text-[17px] font-medium leading-[1.8] text-ink md:text-[20px]">
        機能を足したのではなく、狙っていた行動が起きなかったので作り直した。
      </p>

      <ol className="mt-12 border-t border-line">
        {thankXChain.arc.map((a) => (
          <li
            key={a.label}
            className="grid grid-cols-1 gap-x-8 gap-y-2 border-b border-line py-7 md:grid-cols-[200px_1fr]"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-3 md:pt-1.5">
              {a.label}
            </p>
            <div>
              <p className="text-[16px] font-semibold text-ink">{a.title}</p>
              <p className="mt-2 max-w-2xl text-[14px] leading-7 text-ink-2">
                {a.body}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
        <a
          href={thankXChain.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded text-[14px] text-ink-2 transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          <FaArrowUpRightFromSquare size={12} />
          サービスを見る
        </a>
        <a
          href={thankXChain.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded text-[14px] text-ink-2 transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          <FaGithub size={14} />
          GitHub
        </a>
        <p className="font-mono text-[12px] text-ink-3">
          {thankXChain.tech.join(" / ")}
        </p>
      </div>

      {/* --- その他。一覧は軽量に。カードにしない。 --------------------- */}
      <div className="mt-20">
        <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3">
          Other Work
        </h3>
        <ul className="mt-6 border-t border-line">
          {otherWork.map((w) => (
            <li
              key={w.title}
              className="grid grid-cols-1 gap-x-8 gap-y-1 border-b border-line py-4 md:grid-cols-[120px_1fr_auto] md:items-baseline"
            >
              <p className="font-mono text-[12px] text-ink-3">{w.year}</p>
              <p className="text-[14px] text-ink">
                {w.title}
                <span className="mt-1 block text-[13px] leading-6 text-ink-3 md:mt-0.5">
                  {w.note}
                </span>
              </p>
              {w.href && (
                <a
                  href={w.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded text-[12px] text-ink-3 transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                >
                  <FaGithub size={12} />
                  GitHub
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
