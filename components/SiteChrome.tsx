"use client";

/**
 * サイト共通のヘッダー / フッターの出し分け。
 *
 * 外す対象:
 *   /design-lab … Home v3 が自前の Header を持つため
 *   /work/...   … ケーススタディが Home と揃えた Header / Footer を自前で持つため
 *
 * TOP（/）の表示は従来どおり。
 */
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import SpikeHeader from "@/components/spike/SpikeHeader";
import Footer from "@/components/Footer";

export default function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const bare =
    pathname?.startsWith("/design-lab") ||
    pathname?.startsWith("/work/") ||
    false;

  return (
    <>
      {!bare && <SpikeHeader />}
      <main>{children}</main>
      {!bare && <Footer />}
    </>
  );
}
