/**
 * /design-lab のみで使う書体。
 * Direction A は「編集的」であることを日本語の明朝体で出す（システムフォントで完結させ、依存は増やさない）。
 * 欧文のディスプレイだけ Google Fonts から 1 ファミリ追加する。
 */
import { Instrument_Serif, Shippori_Mincho } from "next/font/google";

export const displaySerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-display-serif",
});

/** 日本語は OS 搭載の書体を使う（Webフォントを増やさない） */
export const JP_SERIF =
  '"Hiragino Mincho ProN", "Yu Mincho", YuMincho, "Noto Serif JP", serif';
export const JP_SANS =
  '"Hiragino Kaku Gothic ProN", "Yu Gothic", YuGothic, "Noto Sans JP", sans-serif';

/**
 * Hybrid v2 の見出し用。日本語の明朝を **肉声の2文だけ** に限定して使う。
 * 「明朝を使えば個性的」にしないため、本文・ラベル・数値には一切使わない。
 */
export const displayMincho = Shippori_Mincho({
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
  variable: "--font-display-mincho",
});
