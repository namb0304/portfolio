import type { Metadata } from "next";
// 1. フォントのimportを1行にまとめました
import { Inter, Dancing_Script } from "next/font/google";
import "./globals.css";
import GlobalHeader from "@/components/GlobalHeader";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

// Dancing Scriptフォントの定義
const dancingScript = Dancing_Script({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-dancing-script', // CSS変数として定義
});

export const metadata: Metadata = {
  title: "My Portfolio",
  description: "これは私のポートフォリオサイトです。",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className="scroll-smooth">
      {/* 2. bodyのクラスにカスタムフォントの変数を追加しました */}
      <body className={`${inter.className} ${dancingScript.variable} bg-gray-900 text-white`}>
        {/* 3. 不要なdivを削除し、構造をシンプルにしました */}
        <GlobalHeader />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}