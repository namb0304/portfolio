import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ErrorBoundary from "@/components/ErrorBoundary";
import { OG_IMAGE, SITE_NAME, SITE_URL } from "@/config/site";

const inter = Inter({ subsets: ["latin"] });

/*
  ヘッダー / フッターは各ページが自分で持つ。
  Home（components/lab/v3/HomeV3）とケーススタディ（app/work/...）は
  同じ高さ・同じ罫のヘッダーを自前で描くため、ここでは共通の枠を足さない。
  旧Home用の components/SiteChrome.tsx は残してあるが、公開経路では使わない。
*/
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "南保俊輔｜2028卒 エンジニア志望・ポートフォリオ",
    template: "%s｜南保 俊輔 ポートフォリオ",
  },
  description:
    "武蔵野大学 データサイエンス学部3年。飲食店向けモバイルオーダー「Hirolia」で注文画面・メニュー管理画面・APIの実装とDB設計、本番運用を担当しています。",
  applicationName: SITE_NAME,
  authors: [{ name: "南保 俊輔" }],
  creator: "南保 俊輔",
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: SITE_NAME,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    images: [OG_IMAGE.url],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className="scroll-smooth">
      <body className={`${inter.className} bg-ground text-ink antialiased`}>
        <ErrorBoundary>
          <main>{children}</main>
        </ErrorBoundary>
      </body>
    </html>
  );
}
