import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import GlobalHeader from "@/components/GlobalHeader"; // 新しいヘッダーをインポート
import Footer from "@/components/Footer";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Portfolio",
  description: "これは私のポートフォリオサイトです。",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className="scroll-smooth">
      <body className={`${inter.className} bg-gray-900 text-white`}>
        <div className={`${inter.className} bg-gray-900 text-white`}>
          <GlobalHeader /> 
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}