import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// 作成したコンポーネントを読み込む
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Portfolio", // ブラウザのタブに表示されるタイトル
  description: "これは私のポートフォリオサイトです。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${inter.className} bg-gray-800 text-white`}>
        <Header /> {/* ここにヘッダーを配置 */}
        <main>{children}</main> {/* この中に各ページの中身が表示される */}
        <Footer /> {/* ここにフッターを配置 */}
      </body>
    </html>
  );
}