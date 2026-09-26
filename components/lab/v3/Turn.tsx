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
import ArchTrail from "./ArchTrail";
import { useScrollProgress } from "./motion";

/**
 * scroll progress の from〜to 区間で、無い状態 → くっきり に変わる一片。
 *
 * --l はこの一片のローカル進捗(0〜1)。opacity / blur / translate の 3 つだけを
 * 動かす。scale も色も動かさないので、文字は最後まで同じ形・同じ色で読める。
 *
 * 出したい感覚は「ある地点でスッと現れる」。そのため立ち上がる前は
 * 完全に不可視にして、立ち上がり始めたら短い区間で一気に濃くする。
 * うっすら見えている時間を作ると「いつ読めるのか分からない」状態になる。
 */
function Phrase({
  from,
  to,
  className = "",
  rise = 12,
  floor = 0,
  children,
}: {
  from: number;
  to: number;
  className?: string;
  /** 立ち上がりに使う移動量(px)。本文は控えめ、補足はさらに控えめ。 */
  rise?: number;
  /** 立ち上がる前の不透明度。既定は 0 ＝ 何も無い状態から始める。 */
  floor?: number;
  children: React.ReactNode;
}) {
  return (
    <span
      className={`block will-change-[opacity,transform] ${className}`}
      style={
        {
          "--l": `clamp(0, calc((var(--p) - ${from}) / ${(to - from).toFixed(3)}), 1)`,
          opacity:
            floor === 0
              ? "var(--l)"
              : `calc(${floor} + var(--l) * ${(1 - floor).toFixed(3)})`,
          /* 立ち上がりが速いので blur はほぼ知覚されない。輪郭のにじみ止め程度。 */
          filter: "blur(calc((1 - var(--l)) * 2px))",
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
    右の光は消さずに、動かない一枚絵として残す。
  */
  if (reduced) {
    return (
      <section ref={ref} className="relative">
        <div className="relative mx-auto max-w-[1180px] px-5 py-24 min-[360px]:px-6 md:px-10 md:py-32">
          <div className="max-w-[34rem] lg:max-w-[38rem] xl:mx-auto xl:text-center">
            <span
              aria-hidden="true"
              className="mb-9 block h-px w-24 bg-[var(--v3-accent)] xl:mx-auto"
            />
            <p className="text-[16px] font-medium leading-[1.8] tracking-tight min-[360px]:text-[19px] text-[var(--v3-fg)] [word-break:auto-phrase] md:text-[28px] md:leading-[1.65] lg:text-[34px]">
              <span className="block">「技術的に動くもの」と</span>
              <span className="block">「現場で使われ続けるもの」は違う。</span>
            </p>
            <p className="mt-6 text-[14px] leading-8 md:mt-8 text-[var(--v3-fg-2)] [word-break:auto-phrase] md:text-[15px]">
              実店舗へ届けて、初めて見えたことでした。
            </p>
          </div>

          {/* 弧は本文カラムではなく、1180px の枠を基準に置く */}
          <ArchTrail still />
        </div>
      </section>
    );
  }

  return (
    /*
      高さ = 画面1枚 + 移動ぶん。travel は SP 74vh / PC 88vh。
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
        {/*
          引用を 112px 下げ、上に弧の通り道を作る。
          transform なのでレイアウトは動かず、中の弧も一緒に下がるので
          弧と引用の位置関係は保たれる。
        */}
        <div className="relative mx-auto w-full max-w-[1180px] px-5 min-[360px]:px-6 md:px-10 xl:translate-y-[112px]">
          {/*
            引用は中央に据える。弧が上をまたぐ構図なので、主役が左に寄っていると
            「装飾が上、文章が左」に見えて構図が決まらない。
            箱の中央寄せと text-align を両方かける。片方だけだと
            「箱は中央、文字は左」になって直らない。
          */}
          <div className="max-w-[34rem] lg:max-w-[38rem] xl:mx-auto xl:text-center">
            {/*
              「点を線でつなぐ」の反復。進捗ぶんだけ横に伸びる細い線を
              文章の上に置いて、いまどこを通過中かを言葉以外で示す。
              文章が出る前の唯一の手がかりなので、これだけは最初から見せる。
              中央寄せのときは中心から左右へ伸ばす。
            */}
            <span
              aria-hidden="true"
              className="mb-9 block h-px w-24 origin-left bg-[var(--v3-accent)] xl:mx-auto xl:origin-center"
              style={{
                transform: "scaleX(clamp(0.08, var(--p), 1))",
                opacity: "clamp(0.2, var(--p), 1)",
              }}
            />

            <p className="text-[16px] font-medium leading-[1.8] tracking-tight min-[360px]:text-[19px] text-[var(--v3-fg)] [word-break:auto-phrase] md:text-[28px] md:leading-[1.65] lg:text-[34px]">
              {/* 何も無い状態から、短い区間で一気に立ち上げる */}
              <Phrase from={0.06} to={0.24}>
                「技術的に動くもの」と
              </Phrase>
              <Phrase from={0.24} to={0.42}>
                「現場で使われ続けるもの」は違う。
              </Phrase>
            </p>

            {/* どこで知ったか、という事実だけ。教訓は足さない。 */}
            <Phrase
              from={0.44}
              to={0.58}
              rise={8}
              className="mt-6 text-[14px] leading-8 md:mt-8 text-[var(--v3-fg-2)] [word-break:auto-phrase] md:text-[15px]"
            >
              実店舗へ届けて、初めて見えたことでした。
            </Phrase>

            {/* 読み終わる頃に下へ抜ける線が出る。矢印や「続き」の文字は置かない。 */}
            <span
              aria-hidden="true"
              className="mt-10 block h-24 w-px origin-top bg-gradient-to-b from-[var(--v3-accent)]/55 to-transparent md:h-40 xl:mx-auto"
              style={{
                transform: "scaleY(clamp(0, calc((var(--p) - 0.62) / 0.3), 1))",
              }}
            />
          </div>

          <ArchTrail still={false} />
        </div>
      </div>
    </section>
  );
}
