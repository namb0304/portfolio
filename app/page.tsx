/**
 * Home。
 *
 * 中身は components/lab/v3/HomeV3。検証中は /design-lab に置いていたものを、
 * そのままここへ昇格した（見た目・文章は変えていない）。
 * ヘッダー / フッターは HomeV3 が自前で持つので、ここでは何も足さない。
 *
 * 旧Homeの構成は components/spike/SpikeHome.tsx に残してある。
 */
import type { Metadata } from "next";
import HomeV3 from "@/components/lab/v3/HomeV3";
import { OG_IMAGE, SITE_NAME } from "@/config/site";

export const metadata: Metadata = {
  /* テンプレート（%s｜…）を当てず、この1本で見せる */
  title: {
    absolute: "南保俊輔｜2028卒 エンジニア志望・ポートフォリオ",
  },
  description:
    "顧客の課題を理解し、「何をつくるか」から提案できるエンジニアを目指しています。飲食店向けモバイルオーダー「Hirolia」で、注文画面・メニュー管理画面・APIの実装、DB設計、本番運用を担当。武蔵野大学 データサイエンス学部3年（2028年3月卒業予定）。",
  alternates: { canonical: "/" },
  /*
    openGraph / twitter はページ側で書くと layout の指定を丸ごと置き換える。
    siteName と images をここでも書いているのはそのため（消すと共有画像が出ない）。
  */
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: SITE_NAME,
    images: [OG_IMAGE],
    url: "/",
    title: "南保俊輔｜2028卒 エンジニア志望・ポートフォリオ",
    description:
      "顧客の課題を理解し、「何をつくるか」から提案できるエンジニアを目指しています。Hirolia で注文画面・メニュー管理画面・APIの実装、DB設計、本番運用を担当。",
  },
  twitter: {
    card: "summary_large_image",
    images: [OG_IMAGE.url],
    title: "南保俊輔｜2028卒 エンジニア志望・ポートフォリオ",
    description:
      "顧客の課題を理解し、「何をつくるか」から提案できるエンジニアを目指しています。Hirolia で注文画面・メニュー管理画面・APIの実装、DB設計、本番運用を担当。",
  },
};

export default function Home() {
  return <HomeV3 />;
}
