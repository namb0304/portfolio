"use client";

/**
 * サイト共通のヘッダー / フッターの出し分け。
 * /design-lab は 3 案それぞれが独自の Header を持つため、サイト側の chrome を外す。
 * （TOP の表示は変わらない）
 */
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import SpikeHeader from "@/components/spike/SpikeHeader";
import Footer from "@/components/Footer";

export default function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const bare = pathname?.startsWith("/design-lab") ?? false;

  return (
    <>
      {!bare && <SpikeHeader />}
      <main>{children}</main>
      {!bare && <Footer />}
    </>
  );
}
