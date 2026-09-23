"use client";

/**
 * Visual Spike 2026-09 — サイト識別子を「My Portfolio」から氏名へ。
 * 旧 GlobalHeader.tsx は削除せず残している（今回レンダリングしないだけ）。
 */
import { useEffect, useState } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";

/** 詳細ページからも戻れるよう、すべて絶対パス + ハッシュ。名称は仮。 */
const navLinks = [
  { href: "/#about", label: "About" },
  { href: "/#hirolia", label: "Hirolia" },
  { href: "/#work", label: "Work" },
  { href: "/#thinking", label: "Experience" },
  { href: "/#github", label: "GitHub" },
  { href: "/#contact", label: "Contact" },
];

export default function SpikeHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ground/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-5 md:px-8">
        <Link
          href="/"
          className="rounded text-[15px] font-bold tracking-tight text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          南保 俊輔
          <span className="ml-2 hidden font-mono text-[11px] font-normal uppercase tracking-[0.14em] text-ink-3 sm:inline">
            Shunsuke Nambo
          </span>
        </Link>

        <nav className="hidden md:block" aria-label="メインナビゲーション">
          <ul className="flex items-center gap-6">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="rounded text-[13px] text-ink-3 transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="rounded p-2 text-ink md:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          aria-label={open ? "メニューを閉じる" : "メニューを開く"}
          aria-expanded={open}
          aria-controls="spike-mobile-menu"
        >
          {open ? <FaTimes size={18} /> : <FaBars size={18} />}
        </button>
      </div>

      {open && (
        <nav
          id="spike-mobile-menu"
          className="border-t border-line bg-ground md:hidden"
          aria-label="モバイルナビゲーション"
        >
          <ul className="mx-auto w-full max-w-5xl px-5 py-2">
            {navLinks.map((l) => (
              <li key={l.href} className="border-b border-line/60 last:border-b-0">
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-3.5 text-[15px] text-ink-2 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
