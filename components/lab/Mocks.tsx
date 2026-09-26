/**
 * Hybrid v2 の画像 placeholder。
 *
 * 灰色BOXにしない。実画面が入ったときに何が見えるかが分かるところまで描く。
 * 内容は Hirolia の実物に即したもの（卓番・メニュー行・円価格・カート / 稼働バーとデプロイ履歴）。
 * 差し替え時はこのコンポーネントを <Image> に置き換えるだけでよい。
 */

/** 来店客の注文画面（スマホ）のスケッチ */
export function OrderScreenMock() {
  const items = [
    { name: "バターチキンカレー", price: "1,180", w: "78%" },
    { name: "ナン / ライス セット", price: "380", w: "62%" },
    { name: "タンドリーチキン", price: "880", w: "70%" },
  ];

  return (
    <div className="flex h-full w-full flex-col bg-[#FBF8F3] text-[#14110E]">
      {/* 店名と卓番 */}
      <div className="flex items-center justify-between border-b border-[#E3DCCF] px-3 py-2.5">
        <div className="h-2 w-16 rounded-full bg-[#14110E]/75" />
        <span className="text-[9px] tabular-nums text-[#14110E]/55">卓 12</span>
      </div>

      {/* カテゴリ */}
      <div className="flex gap-1.5 px-3 py-2">
        <span className="rounded-full bg-[#E8991F] px-2 py-[3px] text-[8px] font-semibold text-[#14110E]">
          カレー
        </span>
        {["タンドール", "ドリンク"].map((c) => (
          <span
            key={c}
            className="rounded-full border border-[#E3DCCF] px-2 py-[3px] text-[8px] text-[#14110E]/60"
          >
            {c}
          </span>
        ))}
      </div>

      {/* メニュー行 */}
      <div className="flex-1 space-y-2 overflow-hidden px-3">
        {items.map((it) => (
          <div
            key={it.name}
            className="flex items-center gap-2.5 rounded-md border border-[#EAE3D6] bg-white p-2"
          >
            <div className="h-9 w-9 shrink-0 rounded bg-[#E8991F]/25" />
            <div className="min-w-0 flex-1">
              <div
                className="h-[7px] rounded-full bg-[#14110E]/60"
                style={{ width: it.w }}
              />
              <div className="mt-1.5 h-[5px] w-[45%] rounded-full bg-[#14110E]/20" />
            </div>
            <span className="text-[9px] font-semibold tabular-nums">
              ¥{it.price}
            </span>
          </div>
        ))}
      </div>

      {/* カート */}
      <div className="m-3 flex items-center justify-between rounded-md bg-[#14110E] px-3 py-2.5 text-[#FBF8F3]">
        <span className="text-[9px]">カートに追加</span>
        <span className="text-[9px] tabular-nums">2点 ¥2,010</span>
      </div>
    </div>
  );
}

/**
 * 監視 / デプロイ / 障害記録のスケッチ。
 * 「落ちたことに店舗からの連絡で気づく」状態をやめた、という内容を画で出す。
 */
export function OpsScreenMock() {
  // 直近30日の稼働。1本だけ落ちている＝障害のあった日。
  const bars = Array.from({ length: 30 }, (_, i) => (i === 19 ? "down" : "up"));
  const deploys = [
    ["09-18 21:40", "店舗別の税率設定を追加"],
    ["09-11 02:15", "注文確定のリトライを修正"],
    ["08-29 19:02", "メニュー画像の圧縮"],
  ] as const;

  return (
    <div className="grid h-full w-full grid-cols-1 gap-x-8 gap-y-6 bg-[#1D1916] px-7 py-7 text-[#EDE7DC] sm:grid-cols-[minmax(0,1fr)_minmax(0,300px)] sm:px-10 sm:py-9">
      {/* 稼働とデプロイ */}
      <div className="flex flex-col justify-center gap-7">
        <div>
          <div className="flex items-baseline justify-between">
            <span className="text-[12px] text-[#A69C8D]">稼働（直近30日）</span>
            <span className="text-[12px] tabular-nums text-[#A69C8D]">99.6%</span>
          </div>
          <div className="mt-3 flex h-12 items-end gap-[2px]">
            {bars.map((b, i) => (
              <span
                key={i}
                className="w-full flex-1 rounded-[1px]"
                style={{
                  height: b === "up" ? "100%" : "38%",
                  background: b === "up" ? "#3E6F52" : "#E8991F",
                }}
              />
            ))}
          </div>
        </div>

        <div>
          <span className="text-[12px] text-[#A69C8D]">デプロイ</span>
          <ul className="mt-3 space-y-2">
            {deploys.map(([when, what]) => (
              <li key={when} className="flex items-center gap-3">
                <span className="h-[5px] w-[5px] shrink-0 rounded-full bg-[#3E6F52]" />
                <span className="text-[11px] tabular-nums text-[#A69C8D]">
                  {when}
                </span>
                <span className="truncate text-[11px] text-[#EDE7DC]/85">
                  {what}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 障害の記録。ここが「運用まで持っている」ことの中身。 */}
      <div className="flex flex-col justify-center border-t border-[#2E2822] pt-6 sm:border-l sm:border-t-0 sm:pl-8 sm:pt-0">
        <div className="flex items-center gap-2">
          <span className="h-[6px] w-[6px] rounded-full bg-[#E8991F]" />
          <span className="text-[12px] text-[#EDE7DC]">直近の障害</span>
        </div>
        <dl className="mt-4 space-y-2.5">
          {[
            ["発生", "08-12 19:41"],
            ["気づいた経路", "外形監視のアラート"],
            ["復旧", "20:08"],
            ["影響", "1店舗・営業中"],
          ].map(([k, v]) => (
            <div key={k} className="flex items-baseline justify-between gap-4">
              <dt className="text-[11px] text-[#A69C8D]">{k}</dt>
              <dd className="text-[11px] tabular-nums text-[#EDE7DC]/85">{v}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-5 border-t border-[#2E2822] pt-4 text-[11px] leading-6 text-[#A69C8D]">
          店舗から連絡が来る前に気づけるようになったのは、外形監視を入れてから。
        </p>
      </div>
    </div>
  );
}

/**
 * 実店舗でQRを読んで注文しているところの写真が入る場所。
 * 灰色BOXにしないため、「卓上のQR」と「それを読んだ客の画面」の関係まで描く。
 */
export function StorePhotoMock() {
  return (
    <div className="flex h-full w-full items-center gap-8 bg-[#1D1916] px-7 py-6 sm:gap-12 sm:px-12">
      {/* 卓上に置かれたQRの札 */}
      <div className="shrink-0">
        <div className="rounded-[4px] bg-[#F2EDE4] p-3.5 shadow-[0_20px_44px_-16px_rgba(0,0,0,0.75)]">
          <div className="grid grid-cols-5 gap-[3px]">
            {Array.from({ length: 25 }, (_, i) => (
              <span
                key={i}
                className="h-3.5 w-3.5 rounded-[1px] sm:h-4 sm:w-4"
                style={{
                  background: [0, 1, 4, 5, 6, 9, 12, 15, 18, 19, 20, 24].includes(i)
                    ? "#14110E"
                    : "#14110E14",
                }}
              />
            ))}
          </div>
          <p className="mt-2.5 text-center text-[9px] tracking-[0.06em] text-[#14110E]/60">
            卓 12
          </p>
        </div>
      </div>

      {/* 読んだ客の端末 */}
      <div className="h-full max-h-[230px] w-[124px] shrink-0 overflow-hidden rounded-[16px] border-[4px] border-[#2E2822] sm:max-h-[290px] sm:w-[152px]">
        <OrderScreenMock />
      </div>

      <div className="hidden min-w-0 flex-1 sm:block">
        <p className="text-[13px] leading-7 text-[#A69C8D]">
          卓上のQRを読むと、来店客の端末に注文画面が開く。
          ここに、実際に店内で使われているところの写真が入る。
        </p>
      </div>
    </div>
  );
}

/** スケッチであることを必ず示す小さな印 */
export function SketchTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="pointer-events-none absolute right-2 top-2 z-10 rounded-sm bg-[#14110E]/80 px-1.5 py-[3px] text-[9px] leading-none text-[#EDE7DC]/80 backdrop-blur-sm">
      {children}
    </span>
  );
}
