/**
 * セクション見出しの階層。
 *
 * 以前は 7 セクションすべてが同じ声量（26/32px・同ウェイト・同じ余白）で並び、
 * 「同じテンプレの反復」に見えていた。重要度を 3 段階に分ける。
 *
 *   primary   … つくったもの（このサイトの主役）
 *   secondary … インターン・参加プログラム / これまで
 *   tertiary  … 使っている技術 / 連絡先（裏づけ・導線）
 *
 * カードや罫を足して階層を作らない。size / weight / leading / 余白 / 補足文の
 * 扱いだけで差をつける。semantic には全部 h2 のまま。
 */
import type { ReactNode } from "react";

export type HeadLevel = "primary" | "secondary" | "tertiary";

const TITLE: Record<HeadLevel, string> = {
  primary:
    "text-[32px] font-bold leading-[1.25] tracking-tight md:text-[44px]",
  secondary:
    "text-[24px] font-bold leading-[1.3] tracking-tight md:text-[30px]",
  tertiary: "text-[18px] font-bold leading-[1.4] tracking-tight md:text-[21px]",
};

/** 見出しと本文のあいだ。主役ほど広く取って「間」を作る。 */
const GAP: Record<HeadLevel, string> = {
  primary: "mb-12 md:mb-16",
  secondary: "mb-9 md:mb-12",
  tertiary: "mb-7 md:mb-9",
};

export default function SectionHead({
  level,
  title,
  note,
}: {
  level: HeadLevel;
  title: string;
  note?: ReactNode;
}) {
  // primary だけ補足を見出しの下へ置き、縦に読ませる。他は横並びで軽く。
  if (level === "primary") {
    return (
      <header className={GAP[level]}>
        <h2 className={`${TITLE[level]} text-[var(--v3-fg)]`}>{title}</h2>
        {note && (
          <p className="mt-4 max-w-[34rem] text-[14px] leading-7 text-[var(--v3-fg-2)]">
            {note}
          </p>
        )}
      </header>
    );
  }

  return (
    <header
      className={`flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 ${GAP[level]}`}
    >
      <h2 className={`${TITLE[level]} text-[var(--v3-fg)]`}>{title}</h2>
      {note && (
        <p className="text-[13px] text-[var(--v3-fg-2)]">{note}</p>
      )}
    </header>
  );
}
