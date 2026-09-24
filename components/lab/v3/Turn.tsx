"use client";

/**
 * Projects と Internships のあいだに置く「転換点」。
 *
 * ここは情報を足す区画ではない。Hirolia を店舗へ入れたことで視点が
 * 「動くものを作る」から「使われ続けるものにする」へ変わった、という
 * 一度きりの切り替わりを、読む速度ごと体験させるための区画。
 *
 * 作り:
 *   背の高い section（scroll container）＋ position: sticky の子。
 *   ページの scroll は一切奪わない。wheel の横取り・scroll lock・snap は使わない。
 *   ユーザーはいつでも普通に上下できるし、一気に飛ばすこともできる。
 *
 * 表示の進み方は scroll progress（--p）から CSS の calc/clamp で出す。
 * JS は 1 フレームにつき変数を 1 つ書くだけで、React の再描画は起きない。
 *
 * 一文字ずつ出す typewriter はしない。意味のかたまり（phrase）単位で出す。
 */
import { useScrollProgress } from "./motion";

/**
 * scroll progress の from〜to 区間で、ぼんやり → くっきり に変わる一片。
 *
 * --l はこの一片のローカル進捗(0〜1)。opacity / blur / translate の 3 つだけを
 * 動かす。scale も色も動かさないので、文字は最後まで同じ形・同じ色で読める。
 */
function Phrase({
  from,
  to,
  className = "",
  rise = 10,
  floor = 0.22,
  children,
}: {
  from: number;
  to: number;
  className?: string;
  /** 立ち上がりに使う移動量(px)。本文は控えめ、補足はさらに控えめ。 */
  rise?: number;
  /**
   * 立ち上がる前の最低不透明度。0 にすると区画へ入った直後が真っ白になり、
   * 「何も無い画面を通過させられる」体験になるので、薄く置いておく。
   */
  floor?: number;
  children: React.ReactNode;
}) {
  return (
    <span
      className={`block will-change-[opacity,transform] ${className}`}
      style={
        {
          "--l": `clamp(0, calc((var(--p) - ${from}) / ${(to - from).toFixed(3)}), 1)`,
          opacity: `calc(${floor} + var(--l) * ${(1 - floor).toFixed(3)})`,
          filter: "blur(calc((1 - var(--l)) * 4px))",
          transform: `translateY(calc((1 - var(--l)) * ${rise}px))`,
        } as React.CSSProperties
      }
    >
      {children}
    </span>
  );
}

export default function Turn() {
  /* sticky が張り付いている区間の進み具合を --p に書く */
  const { ref, reduced } = useScrollProgress<HTMLElement>({
    mode: "sticky",
    varName: "--p",
  });

  /*
    動きを止める設定では、長いスクロールを読むための条件にしない。
    背の高い箱も sticky もやめて、完成した状態の文章をそのまま置く。
  */
  if (reduced) {
    return (
      <section ref={ref} className="relative">
        <div className="mx-auto max-w-[1180px] px-5 py-24 min-[360px]:px-6 md:px-10 md:py-32">
          <div className="max-w-[34rem] lg:max-w-[38rem]">
            <span
              aria-hidden="true"
              className="mb-9 block h-px w-24 bg-[var(--v3-accent)]"
            />
            <p className="text-[16px] font-medium leading-[1.8] tracking-tight min-[360px]:text-[19px] text-[var(--v3-fg)] [word-break:auto-phrase] md:text-[28px] md:leading-[1.65] lg:text-[34px]">
              <span className="block">「技術的に動くもの」と</span>
              <span className="block">「現場で使われ続けるもの」は違う。</span>
            </p>
            <p className="mt-6 text-[14px] leading-8 md:mt-8 text-[var(--v3-fg-2)] [word-break:auto-phrase] md:text-[15px]">
              実店舗へ届けて、初めて見えたことでした。
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    /*
      高さ = 画面1枚 + 移動ぶん。travel は SP 80vh / PC 120vh。
      --p は JS 前提で 1（＝完成状態）を初期値にしておく。JS が無い環境でも
      文章は最初から全部読める。
    */
    <section
      ref={ref}
      className="relative h-[150vh] md:h-[170vh]"
      style={{ "--p": "1" } as React.CSSProperties}
    >
      {/*
        箱を画面より低くしてある。中央寄せのまま 100vh にすると、コピーの上下に
        半画面ずつの空きができ、Rail を抜けてから文章が見えるまでに
        「何も映っていない時間」が生まれるため。
      */}
      <div
        data-sticky
        className="sticky top-0 flex h-[76vh] items-center md:h-[82vh]"
      >
        <div className="mx-auto w-full max-w-[1180px] px-5 min-[360px]:px-6 md:px-10">
          <div className="max-w-[34rem] lg:max-w-[38rem]">
            {/*
              「点を線でつなぐ」の反復。進捗ぶんだけ横に伸びる細い線を
              文章の上に置いて、いまどこを通過中かを言葉以外で示す。
            */}
            <span
              aria-hidden="true"
              className="mb-9 block h-px w-24 origin-left bg-[var(--v3-accent)]"
              style={{
                transform: "scaleX(clamp(0.08, var(--p), 1))",
                opacity: "clamp(0.25, var(--p), 1)",
              }}
            />

            <p className="text-[16px] font-medium leading-[1.8] tracking-tight min-[360px]:text-[19px] text-[var(--v3-fg)] [word-break:auto-phrase] md:text-[28px] md:leading-[1.65] lg:text-[34px]">
              {/* 前半の概念 → 後半との対比、の順に立ち上げる */}
              <Phrase from={0.05} to={0.3}>
                「技術的に動くもの」と
              </Phrase>
              <Phrase from={0.3} to={0.56}>
                「現場で使われ続けるもの」は違う。
              </Phrase>
            </p>

            {/* どこで知ったか、という事実だけ。教訓は足さない。 */}
            <Phrase
              from={0.56}
              to={0.74}
              rise={6}
              floor={0.05}
              className="mt-6 text-[14px] leading-8 md:mt-8 text-[var(--v3-fg-2)] [word-break:auto-phrase] md:text-[15px]"
            >
              実店舗へ届けて、初めて見えたことでした。
            </Phrase>

            {/* 読み終わる頃に下へ抜ける線が出る。矢印や「続き」の文字は置かない。 */}
            <span
              aria-hidden="true"
              className="mt-10 block h-24 w-px origin-top bg-gradient-to-b from-[var(--v3-accent)]/55 to-transparent md:h-40"
              style={{
                transform:
                  "scaleY(clamp(0, calc((var(--p) - 0.74) / 0.26), 1))",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
