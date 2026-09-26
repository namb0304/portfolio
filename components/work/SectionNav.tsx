"use client";

/**
 * ケーススタディ用の、ヘッダー直下に貼り付く細い章ナビ。
 *
 * 目的は3つだけ。
 *   いまどの章を読んでいるか分かる / 別の章へすぐ飛べる / 長い本文を読み進めやすい
 * 読むための補助なので、主役にはしない。pill も影も使わず、
 * 色と 1px の下線だけで現在地を示す。
 *
 * 現在地の判定は IntersectionObserver のみ。scroll listener は張らない。
 * 見出しがヘッダー + このナビに隠れないよう、章側は scroll-mt を持つ。
 */
import { useEffect, useRef, useState } from "react";

export type NavItem = { id: string; label: string };

/** ヘッダー 60px + このナビ 44px。章の scroll-mt はこれに合わせる。 */
export const NAV_OFFSET = 104;

export default function SectionNav({ items }: { items: readonly NavItem[] }) {
  const [active, setActive] = useState<string>(items[0]?.id ?? "");
  const scroller = useRef<HTMLDivElement | null>(null);
  const links = useRef<Record<string, HTMLAnchorElement | null>>({});

  /* 現在地の判定。いちばん上にある「見えている章」を採る。 */
  useEffect(() => {
    const els = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => !!el);
    if (!els.length || typeof IntersectionObserver === "undefined") return;

    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
          )[0];
        if (hit?.target.id) setActive(hit.target.id);
      },
      /* 上端はヘッダー + ナビのぶん外し、下半分は判定に入れない */
      { rootMargin: `-${NAV_OFFSET + 8}px 0px -58% 0px` }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  /*
    モバイルは横スクロールするので、現在地が画面外だと意味がない。
    スクロール位置だけ直接動かす（scrollIntoView はページ側も動かしうる）。
  */
  useEffect(() => {
    const box = scroller.current;
    const link = links.current[active];
    if (!box || !link) return;
    const target =
      link.offsetLeft - box.clientWidth / 2 + link.clientWidth / 2;
    const max = box.scrollWidth - box.clientWidth;
    if (max <= 0) return;
    box.scrollLeft = Math.max(0, Math.min(max, target));
  }, [active]);

  return (
    <nav
      aria-label="ケーススタディの章"
      className="sticky top-[60px] z-20 border-b border-[var(--v3-rule)]/70 bg-[var(--v3-bg)]/92 backdrop-blur-md"
    >
      <div
        ref={scroller}
        className="mx-auto flex h-11 max-w-[900px] items-stretch gap-5 overflow-x-auto px-6 [-ms-overflow-style:none] [scrollbar-width:none] md:px-8 [&::-webkit-scrollbar]:hidden"
      >
        {items.map((it) => {
          const on = active === it.id;
          return (
            <a
              key={it.id}
              href={`#${it.id}`}
              ref={(el) => {
                links.current[it.id] = el;
              }}
              aria-current={on ? "location" : undefined}
              className={`relative flex shrink-0 items-center whitespace-nowrap rounded text-[13px] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--v3-accent)] ${
                on
                  ? "text-[var(--v3-accent)]"
                  : "text-[var(--v3-fg-2)] hover:text-[var(--v3-fg)]"
              }`}
            >
              {it.label}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-px origin-left bg-[var(--v3-accent)] transition-transform duration-200 ease-out"
                style={{ transform: on ? "scaleX(1)" : "scaleX(0)" }}
              />
            </a>
          );
        })}
      </div>
    </nav>
  );
}
