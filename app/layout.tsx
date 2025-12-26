import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import GlobalHeader from "@/components/GlobalHeader";
import Footer from "@/components/Footer";
import ErrorBoundary from "@/components/ErrorBoundary";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Portfolio",
  description: "南保俊輔についてのポートフォリオサイトです",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className="scroll-smooth">
      <body className={`${inter.className} bg-gray-900 text-white`}>
        <ErrorBoundary>
          <div className={`${inter.className} bg-gray-900 text-white`}>
            <GlobalHeader />
            <main>{children}</main>
            <Footer />
          </div>
        </ErrorBoundary>
      </body>
    </html>
  );
}