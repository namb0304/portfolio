/**
 * Visual Spike 2026-09 — セクションの共通器。
 * カードを使わずに「区切り」と「重要度差」を出すための最小限の枠だけを持つ。
 * weight: セクションの重み。余白・見出しサイズがこれで変わる（強弱を明示的に扱う）。
 */
import type { ReactNode } from "react";

type Weight = "lead" | "normal" | "minor";

const pad: Record<Weight, string> = {
  lead: "py-24 md:py-36",
  normal: "py-20 md:py-28",
  minor: "py-14 md:py-20",
};

const titleSize: Record<Weight, string> = {
  lead: "text-3xl md:text-5xl",
  normal: "text-2xl md:text-3xl",
  minor: "text-xl md:text-2xl",
};

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-5xl px-5 md:px-8 ${className}`}>
      {children}
    </div>
  );
}

/** セクション見出しの上に置く小さなラベル。ここだけ等幅・大文字・字間広め。 */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3">
      {children}
    </p>
  );
}

export default function Section({
  id,
  eyebrow,
  title,
  lead,
  weight = "normal",
  divider = true,
  children,
}: {
  id: string;
  eyebrow?: string;
  title?: string;
  lead?: ReactNode;
  weight?: Weight;
  divider?: boolean;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={`${pad[weight]} scroll-mt-16 ${
        divider ? "border-t border-line" : ""
      }`}
    >
      <Container>
        {(eyebrow || title) && (
          <header className="mb-10 md:mb-14">
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            {title && (
              <h2
                className={`mt-3 font-bold leading-tight text-ink ${titleSize[weight]}`}
              >
                {title}
              </h2>
            )}
            {lead && (
              <div className="mt-5 max-w-2xl text-[15px] leading-8 text-ink-2">
                {lead}
              </div>
            )}
          </header>
        )}
        {children}
      </Container>
    </section>
  );
}
