import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// Visual Spike 2026-09: サイト識別子を氏名にしたヘッダーへ差し替え。
// 旧 GlobalHeader.tsx は削除せず残している。
import SiteChrome from "@/components/SiteChrome";
import ErrorBoundary from "@/components/ErrorBoundary";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "南保 俊輔 — ポートフォリオ",
  description:
    "武蔵野大学 データサイエンス学部3年。飲食店向けモバイルオーダーSaaS「Hirolia」の開発と本番運用を担当しています。",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className="scroll-smooth">
      <body className={`${inter.className} bg-ground text-ink antialiased`}>
        <ErrorBoundary>
          <SiteChrome>{children}</SiteChrome>
        </ErrorBoundary>
      </body>
    </html>
  );
}
