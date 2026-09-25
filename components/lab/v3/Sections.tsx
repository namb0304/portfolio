"use client";

/**
 * Portfolio Home v3 — Experience / Skills / Activities / GitHub / Contact。
 * どれも Home では「概要」に留める。長文は詳細ページへ逃がす前提。
 */
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useFinePointer, useScrollProgress } from "./motion";
import type { IconType } from "react-icons";
import {
  FaArrowUpRightFromSquare,
  FaChevronDown,
  FaCloud,
  FaLightbulb,
} from "react-icons/fa6";
import SectionHead from "./SectionHead";
import { TECH } from "./techIcons";
import { useContactForm, type ContactFields } from "@/hooks/useContactForm";
import { v3Activities, v3Experience, v3Profile, v3Skills } from "@/config/v3";


/* ---------------------------------------------------------------- Experience */

/**
 * 参加形態を示す小さな印。企業ロゴは出さない。
 * 主役は「何を経験したか」であって、どこに行ったかではない。
 */
const EXP_MARK: Record<string, { Icon: IconType; label: string }> = {
  product: { Icon: FaLightbulb, label: "プロダクト開発" },
  cloud: { Icon: FaCloud, label: "クラウド / インフラ" },
};

/**
 * 取り組んだこと / 気づいたこと / 次に活かすこと の共通ブロック。
 *
 * active は「いまポインタ（またはフォーカス）がこのブロックにいる」状態。
 * 変えるのは見出しの色だけにする。背景やカード枠を足すと、3 つの
 * 意味の違いより「囲み」のほうが目立ってしまう。
 */
function Block({
  label,
  lead,
  points,
  active = false,
}: {
  label: string;
  lead?: string;
  points: readonly string[];
  active?: boolean;
}) {
  return (
    <div>
      <h4
        className={`text-[12px] font-bold tracking-[0.04em] transition-colors duration-200 ${
          active ? "text-[var(--v3-accent)]" : "text-[var(--v3-fg-2)]"
        }`}
      >
        {label}
      </h4>
      {lead && (
        <p className="mt-2.5 text-[15px] leading-8 text-[var(--v3-fg)] [word-break:auto-phrase]">
          {lead}
        </p>
      )}
      <ul className="mt-2.5 space-y-2">
        {points.map((p) => (
          <li key={p} className="flex gap-3">
            <span
              aria-hidden="true"
              className="mt-[13px] h-px w-3 shrink-0 bg-[var(--v3-rule)]"
            />
            <span className="text-[13px] leading-7 text-[var(--v3-fg-2)] [word-break:auto-phrase]">
              {p}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * 展開後の 3 ブロックに「いまどこを読んでいるか」を出す panel。
 *
 * 画面全体を追いかける cursor follower は作らない。あくまで panel の中だけで、
 * 左の細い線の上を小さな marker が移動する **reading position indicator**。
 * Activities の「点 → 線」と同じ言語を薄く反復するが、component は共有しない。
 * 共有すると timeline に見えてしまい、思考の流れという意味が消えるため。
 *
 * touch / reduced-motion では marker を出さない。出さなくても
 * 見出し・リード・箇条書きの階層だけで 3 つの違いは読める。
 */
function ReadingPanel({
  e,
  open,
}: {
  e: (typeof v3Experience)[number];
  open: boolean;
}) {
  const fine = useFinePointer();
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const blockRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(-1);
  const [marker, setMarker] = useState<{ top: number; h: number } | null>(null);

  /** wrapper 上端を基準にした各ブロックの縦の範囲。hover に入った時だけ測る。 */
  const bands = useRef<{ top: number; bottom: number }[]>([]);
  const frame = useRef(0);

  const readBands = () => {
    const w = wrapRef.current;
    if (!w) return;
    const wt = w.getBoundingClientRect().top;
    bands.current = blockRefs.current.map((el) => {
      if (!el) return { top: 0, bottom: 0 };
      const r = el.getBoundingClientRect();
      return { top: r.top - wt, bottom: r.bottom - wt };
    });
  };

  // 閉じたら状態を戻す。開いたままサイズが変わる場合に備えて測り直す。
  useEffect(() => {
    if (!open) {
      setActive(-1);
      setMarker(null);
      return;
    }
    const id = window.setTimeout(readBands, 340); // 開くアニメの後で測る
    return () => window.clearTimeout(id);
  }, [open]);

  // active が変わった時だけ marker の位置を出す。毎フレームは測らない。
  useEffect(() => {
    if (active < 0) {
      setMarker(null);
      return;
    }
    const el = blockRefs.current[active];
    const w = wrapRef.current;
    if (!el || !w) return;
    setMarker({ top: el.offsetTop, h: el.offsetHeight });
  }, [active]);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  const onPointerMove = (ev: React.PointerEvent<HTMLDivElement>) => {
    if (!fine || !open) return;
    const y = ev.clientY;
    if (frame.current) return;
    frame.current = requestAnimationFrame(() => {
      frame.current = 0;
      const w = wrapRef.current;
      if (!w) return;
      const local = y - w.getBoundingClientRect().top;
      const hit = bands.current.findIndex(
        (b) => local >= b.top && local <= b.bottom
      );
      // ブロックの隙間では切り替えない。これがそのまま threshold になる。
      if (hit >= 0) setActive(hit);
    });
  };

  const blocks = [
    { label: "取り組んだこと", lead: e.did.lead, points: e.did.points },
    { label: "気づいたこと", lead: e.learned.lead, points: e.learned.points },
    { label: "次に活かすこと", points: e.next },
  ] as const;

  return (
    <div
      ref={wrapRef}
      onPointerEnter={() => {
        if (fine) readBands();
      }}
      onPointerMove={onPointerMove}
      onPointerLeave={() => setActive(-1)}
      className="relative space-y-8 border-l border-[var(--v3-rule)] pb-9 pl-6 md:pl-8"
    >
      {/* 線の上を動く marker。pointer / focus のある環境にだけ出す。 */}
      {fine && (
        <span
          aria-hidden="true"
          className="absolute -left-px w-[2px] rounded-full bg-[var(--v3-accent)] transition-[top,height,opacity] duration-[240ms] ease-out"
          style={{
            top: marker ? marker.top : 0,
            height: marker ? marker.h : 0,
            opacity: marker ? 0.9 : 0,
          }}
        />
      )}

      {blocks.map((b, i) => (
        /*
          読むだけの本文なので、操作対象にはしない。
          Tab 停止を足すと、キーボード利用者は開閉ボタンのほかに
          3 つの通過点を踏まされる。marker はあくまで pointer 利用者向けの
          補助表示で、無くても 3 つの違いは見出しと構造で読める。
        */
        <div
          key={b.label}
          ref={(el) => {
            blockRefs.current[i] = el;
          }}
        >
          <Block
            label={b.label}
            lead={"lead" in b ? b.lead : undefined}
            points={b.points}
            active={active === i}
          />
        </div>
      ))}
    </div>
  );
}

/**
 * 1件ぶんの開閉。閉じているときは「どこで・いつ・何を学んだか」の3行だけ。
 * 高さは grid-template-rows で変化させるので、開いた瞬間に飛ばない。
 */
function ExperienceItem({ e }: { e: (typeof v3Experience)[number] }) {
  const [open, setOpen] = useState(false);
  const mark = EXP_MARK[e.mark];
  const panelId = `exp-panel-${e.key}`;
  const btnId = `exp-btn-${e.key}`;

  return (
    <article className="border-b border-[var(--v3-rule)] last:border-b-0">
      <h3>
        <button
          type="button"
          id={btnId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          className="group flex w-full items-start gap-5 py-7 text-left transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--v3-accent)]"
        >
          <span className="min-w-0 flex-1">
            <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="text-[19px] font-bold tracking-tight text-[var(--v3-fg)]">
                {e.org}
              </span>
              <span className="text-[13px] text-[var(--v3-fg-2)]">
                {e.program}
              </span>
            </span>
            <span className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] tabular-nums text-[var(--v3-fg-2)]">
              {e.format}
              {mark && (
                <span className="inline-flex items-center gap-1.5">
                  <mark.Icon className="text-[11px]" aria-hidden="true" />
                  {mark.label}
                </span>
              )}
            </span>
            <span className="mt-3 block max-w-[46rem] text-[14px] leading-7 text-[var(--v3-fg-2)] [word-break:auto-phrase]">
              {e.summary}
            </span>
          </span>

          <span className="mt-1 flex shrink-0 items-center gap-2 text-[12px] text-[var(--v3-fg-2)] transition-colors duration-200 group-hover:text-[var(--v3-fg)]">
            <span className="hidden sm:inline">{open ? "閉じる" : "詳しく見る"}</span>
            <span
              aria-hidden="true"
              className="flex h-7 w-7 items-center justify-center rounded-full border border-[var(--v3-rule)] transition-[transform,border-color] duration-300 ease-out group-hover:border-[var(--v3-accent)]/60"
              style={{ transform: open ? "rotate(180deg)" : "none" }}
            >
              <FaChevronDown className="text-[10px]" />
            </span>
          </span>
        </button>
      </h3>

      {/* 0fr → 1fr。高さを直接指定しないので中身が変わっても破綻しない。 */}
      <div
        id={panelId}
        role="region"
        aria-labelledby={btnId}
        className={`grid transition-[grid-template-rows] duration-[320ms] ease-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        {/*
          閉じている間は高さ 0 で見えないだけで、読み上げには残ってしまう。
          inert で支援技術とフォーカスの両方から外し、開閉の状態と
          アクセシビリティツリーを一致させる。
        */}
        <div className="overflow-hidden" inert={!open} aria-hidden={!open}>
          <ReadingPanel e={e} open={open} />
        </div>
      </div>
    </article>
  );
}

export function Experience() {
  return (
    <section id="experience" className="scroll-mt-24">
      {/* 上は転換点セクションが「間」を持っているので、ここでは詰める */}
      <div className="mx-auto max-w-[1080px] px-6 pt-14 pb-24 md:px-10 md:pt-16 md:pb-28">
        <SectionHead
          level="secondary"
          title="インターン・参加プログラム"
          note="開くと、取り組んだこと・気づいたこと・次に活かすこと が読めます"
        />

        <div className="border-t border-[var(--v3-rule)]">
          {v3Experience.map((e) => (
            <ExperienceItem key={e.key} e={e} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------- Skills */

const ICONS = TECH;

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-24 bg-[var(--v3-surface)]/80">
      <div className="mx-auto max-w-[1080px] px-6 py-20 md:px-10 md:py-24">
        <SectionHead
          level="tertiary"
          title="使っている技術"
          note="Hirolia の実運用で使う技術と、その他の制作・学習で使った技術"
        />

        <div className="space-y-12">
          {v3Skills.map((g) => (
            <div key={g.group}>
              <div className="flex flex-col gap-1 border-b border-[var(--v3-rule)] pb-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                <h3 className="text-[15px] font-bold tracking-tight text-[var(--v3-fg)]">
                  {g.group}
                </h3>
                <p className="text-[12px] text-[var(--v3-fg-2)]">{g.note}</p>
              </div>

              <ul className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                {g.items.map((it) => {
                  const entry = ICONS[it.icon];
                  const Icon = entry?.Icon;
                  return (
                    /*
                      リンクでもボタンでもないので Tab では止めない。
                      hover の色だけ残す（キーボード利用者は素通りできる）。
                    */
                    <li
                      key={it.name}
                      style={{ "--brand": entry?.brand } as React.CSSProperties}
                      className="group flex items-center gap-3.5 rounded-[12px] border border-transparent px-3 py-2.5 transition-[background-color,border-color] duration-200 hover:border-[var(--brand)]/35 hover:bg-[var(--v3-fg)]/[0.04]"
                    >
                      {Icon && (
                        <span className="shrink-0 text-[20px] text-[var(--v3-fg-2)]">
                          {/* 静止時は落ち着いた無彩色。hover / focus でその技術の色だけ戻る。 */}
                          <Icon className="transition-[color,filter] duration-200 group-hover:text-[var(--brand)] group-hover:[filter:drop-shadow(0_0_7px_var(--brand))]" />
                        </span>
                      )}
                      <span className="min-w-0">
                        <span className="block truncate text-[14px] text-[var(--v3-fg)]">
                          {it.name}
                        </span>
                        <span className="block truncate text-[11px] text-[var(--v3-fg-2)] transition-colors duration-200 group-hover:text-[var(--v3-fg)]">
                          {it.where}
                        </span>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- Activities */

/**
 * Activities — 「点と点を線でつなぐ」。
 *
 * 飾りの timeline ではなく、「この経験が次につながった」という本人の
 * 考え方そのものを形にする区画。
 *
 * 動きは scroll progress と同期させ、**可逆**にする。下へ進めば線が伸び、
 * 上へ戻れば線も戻る。一度見たら固定される演出にしないのは、
 * 過去と現在を自分で行き来できることに意味があるため。
 *
 * 実装: 進捗は --tp（0〜1）として section に書き、点と線の見た目は
 * CSS の clamp/calc で --tp から導く。1 フレームごとの再描画は発生しない。
 * 「いま何番目か」だけ state で持ち、値が変わった時だけ更新する。
 */

/**
 * 線が動く区間。進捗をそのまま点の数で等分する。
 * こうしておくと「いま何番目か」（= floor(進捗 × 点の数)）と
 * 線の先端が必ず一致し、年の強調と線がずれない。
 */
const TL_START = 0;
const TL_END = 1;

export function Activities() {
  // 全 milestone を 1 本の連なりとして扱う
  const flat = v3Activities.flatMap((y) =>
    y.items.map((it) => ({ year: y.year, ...it }))
  );
  const total = flat.length;

  const { ref, reduced, step } = useScrollProgress<HTMLDivElement>({
    varName: "--tp",
    steps: total,
  });

  /** 点 i が立ち上がり始める進捗 */
  const band = (TL_END - TL_START) / total;
  const startOf = (i: number) => TL_START + i * band;

  // いま線の先端がいる年。scroll を戻せばこれも戻る。
  const activeYear = flat[Math.min(step, total - 1)]?.year ?? null;

  let cursor = -1;

  return (
    <section id="activities" className="scroll-mt-24 bg-[var(--v3-navy)]/55">
      <div className="mx-auto max-w-[920px] px-6 py-28 md:px-10 md:py-36">
        <SectionHead
          level="secondary"
          title="これまで"
          note="点がつながって、いまの考え方になった"
        />

        {/*
          進捗はセクションではなく、この一覧そのものを基準に測る。
          セクションには上下 144px の余白があり、そこまで含めて測ると
          「最後の項目を読んでいるのに線がまだ届かない」ずれになる。
          --tp はここに書き、点と線は子孫として受け取る。
        */}
        <div
          ref={ref}
          className="space-y-10"
          /* JS が無い / まだ動いていない間は完成状態。情報が隠れないようにする。 */
          style={{ "--tp": "1" } as React.CSSProperties}
        >
          {v3Activities.map((y) => (
            <div
              key={y.year}
              data-year={y.year}
              className="grid grid-cols-1 gap-x-10 gap-y-4 md:grid-cols-[96px_minmax(0,1fr)]"
            >
              <div className="md:sticky md:top-24 md:self-start">
                <p
                  className={`text-[28px] font-bold tabular-nums leading-none transition-colors duration-300 ${
                    activeYear === y.year
                      ? "text-[var(--v3-accent)]"
                      : "text-[var(--v3-fg-2)]"
                  }`}
                >
                  {y.year}
                </p>
                <span
                  aria-hidden="true"
                  className="mt-3 block h-px w-10 origin-left bg-[var(--v3-accent)] transition-[transform,opacity] duration-[400ms] ease-out"
                  style={{
                    transform:
                      activeYear === y.year ? "scaleX(1)" : "scaleX(0.15)",
                    opacity: activeYear === y.year ? 1 : 0.35,
                  }}
                />
              </div>

              {/* 点を貫く 1 本の線。進捗ぶんだけ下へ伸びる。 */}
              <ul className="relative space-y-3.5 pl-6">
                <span
                  aria-hidden="true"
                  className="absolute left-[3px] top-2 bottom-2 w-px bg-[var(--v3-rule)]"
                />
                {y.items.map((it) => {
                  cursor += 1;
                  const i = cursor;
                  const from = startOf(i);
                  const isNow = "current" in it && it.current;
                  const isHead = !reduced && i === step;

                  /* この点のローカル進捗。線はゆっくり、点は少し早く立ち上がる。 */
                  const seg = `clamp(0, calc((var(--tp) - ${from.toFixed(4)}) / ${band.toFixed(4)}), 1)`;
                  const dot = `clamp(0, calc((var(--tp) - ${from.toFixed(4)}) / ${(band * 0.45).toFixed(4)}), 1)`;

                  return (
                    <li
                      key={it.text}
                      data-node={i}
                      className="relative flex items-baseline gap-3.5"
                    >
                      {/* 次の点へ向かう区間。進捗に従って伸び、戻せば縮む。 */}
                      <span
                        aria-hidden="true"
                        className="absolute -left-6 top-[10px] w-px origin-top bg-[var(--v3-accent)]/55"
                        style={{
                          height: "calc(100% + 0.875rem)",
                          transform: `scaleY(${seg})`,
                        }}
                      />
                      {/*
                        点は 2 枚重ね。下が未通過の色、上が通過後の色で、
                        上の不透明度だけを進捗で動かす。
                        ring / glow は使わない。主役は点ではなく線なので、
                        現在地は「わずかに大きい」だけで示す。
                      */}
                      <span
                        aria-hidden="true"
                        className="absolute -left-6 top-[7px] h-[7px] w-[7px] -translate-x-[2px] rounded-full bg-[var(--v3-rule)] transition-transform duration-[320ms] ease-out"
                        style={{ transform: isHead ? "scale(1.3)" : "scale(1)" }}
                      >
                        <span
                          className="block h-full w-full rounded-full"
                          style={{
                            opacity: dot,
                            background: isNow
                              ? "var(--v3-accent)"
                              : "var(--v3-fg-2)",
                          }}
                        />
                      </span>
                      <span
                        className="text-[15px] leading-8 text-[var(--v3-fg)] [word-break:auto-phrase]"
                        /* 通過前は沈ませ、通過後に読みやすい濃さへ戻す */
                        style={{ opacity: `calc(0.5 + ${dot} * 0.5)` }}
                      >
                        {it.text}
                        {"award" in it && it.award && (
                          <span className="ml-2.5 rounded-full border border-[var(--v3-accent)]/45 px-2 py-[2px] text-[11px] text-[var(--v3-accent)] transition-colors duration-200 hover:bg-[var(--v3-accent)]/12">
                            {it.award}
                          </span>
                        )}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------- GitHub */

export function GitHubActivity() {
  const [failed, setFailed] = useState(false);
  const username = "namb0304";
  const chart = `https://ghchart.rshah.org/${username}?theme=onedark`;

  return (
    <section id="github" className="scroll-mt-24">
      <div className="mx-auto max-w-[920px] px-6 py-14 md:px-10 md:py-16">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="text-[18px] font-bold tracking-tight text-[var(--v3-fg)]">
            GitHub
          </h2>
          <a
            href={v3Profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded text-[13px] text-[var(--v3-fg-2)] transition-colors hover:text-[var(--v3-accent)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--v3-accent)]"
          >
            github.com/{username}
          </a>
        </div>

        <a
          href={v3Profile.github}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-6 block rounded-[14px] border border-transparent p-3 transition-colors duration-200 hover:border-[var(--v3-rule)] hover:bg-[var(--v3-surface)]/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--v3-accent)]"
        >
          {failed ? (
            // 外部サービスが落ちても「壊れている」ようには見せない
            <div className="flex h-[112px] items-center justify-center rounded-[14px] border border-dashed border-[var(--v3-rule)] text-[12px] text-[var(--v3-fg-2)]">
              コントリビューショングラフを読み込めませんでした
            </div>
          ) : (
            <Image
              src={chart}
              alt={`${username} のコントリビューショングラフ`}
              width={896}
              height={112}
              unoptimized
              onError={() => setFailed(true)}
              className="h-auto w-full opacity-80 transition-opacity duration-200 group-hover:opacity-100"
            />
          )}
          <span className="mt-3 flex items-center gap-1.5 text-[12px] text-[var(--v3-fg-2)] transition-colors duration-200 group-hover:text-[var(--v3-accent)]">
            <FaArrowUpRightFromSquare size={10} />
            GitHub で見る
          </span>
        </a>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ Contact */

export function Contact() {
  /* 入力に不備があったら、その最初のフィールドへ実際に移動する */
  const inputs = useRef<Partial<Record<keyof ContactFields, HTMLElement | null>>>(
    {}
  );
  const focusInvalid = useCallback(
    (field: keyof ContactFields) => inputs.current[field]?.focus(),
    []
  );
  const { values, errors, status, setField, submit } = useContactForm({
    onInvalid: focusInvalid,
  });
  const sending = status === "sending";

  const fields = [
    { key: "name" as const, id: "v3-name", label: "お名前", type: "text", required: true },
    { key: "email" as const, id: "v3-email", label: "メールアドレス", type: "email", required: true },
    { key: "subject" as const, id: "v3-subject", label: "件名", type: "text", required: false },
  ];

  return (
    <section id="contact" className="scroll-mt-24 bg-[var(--v3-surface)]/45">
      {/* 見出し・本文・フォームを同じ幅の1列に揃える。 */}
      <div className="mx-auto max-w-[620px] px-6 py-20 md:py-24">
        <h2 className="text-[18px] font-bold leading-[1.4] tracking-tight text-[var(--v3-fg)] md:text-[21px]">
          連絡先
        </h2>
        {/* 営業文句にしない。本人が普通に話している語り口に寄せる。 */}
        <p className="mt-4 text-[15px] leading-8 text-[var(--v3-fg-2)] [word-break:auto-phrase]">
          採用・インターン・開発について、このサイトを見て気になったことがあればお聞かせください。
        </p>

        <form className="mt-10 space-y-6" onSubmit={submit} noValidate>
          {fields.map((f) => {
            const err = errors[f.key];
            return (
              <div key={f.id}>
                <label
                  htmlFor={f.id}
                  className="mb-2 block text-[13px] font-medium text-[var(--v3-fg-2)]"
                >
                  {f.label}
                  {f.required && (
                    <span className="ml-1 text-[var(--v3-accent)]">*</span>
                  )}
                </label>
                <input
                  id={f.id}
                  type={f.type}
                  ref={(el) => {
                    inputs.current[f.key] = el;
                  }}
                  /* 表示は独自メッセージで行うので noValidate のままにし、
                     required は支援技術へ必須であることを伝えるために付ける */
                  required={f.required}
                  value={values[f.key]}
                  onChange={(e) => setField(f.key, e.target.value)}
                  disabled={sending}
                  aria-invalid={err ? true : undefined}
                  aria-describedby={err ? `${f.id}-error` : undefined}
                  className={`w-full rounded-[12px] border bg-[var(--v3-surface)] px-4 py-3 text-[15px] text-[var(--v3-fg)] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--v3-accent)] disabled:opacity-60 ${
                    err
                      ? "border-[#E0796B]"
                      : "border-[var(--v3-rule)] focus:border-[var(--v3-accent)]"
                  }`}
                />
                {/* 色だけでエラーを示さない。文言も必ず出す。 */}
                {err && (
                  <p
                    id={`${f.id}-error`}
                    className="mt-2 text-[12px] leading-6 text-[#E0796B]"
                  >
                    {err}
                  </p>
                )}
              </div>
            );
          })}

          <div>
            <label
              htmlFor="v3-message"
              className="mb-2 block text-[13px] font-medium text-[var(--v3-fg-2)]"
            >
              メッセージ<span className="ml-1 text-[var(--v3-accent)]">*</span>
            </label>
            <textarea
              id="v3-message"
              rows={5}
              ref={(el) => {
                inputs.current.message = el;
              }}
              required
              value={values.message}
              onChange={(e) => setField("message", e.target.value)}
              disabled={sending}
              aria-invalid={errors.message ? true : undefined}
              aria-describedby={errors.message ? "v3-message-error" : undefined}
              className={`w-full resize-y rounded-[12px] border bg-[var(--v3-surface)] px-4 py-3 text-[15px] leading-7 text-[var(--v3-fg)] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--v3-accent)] disabled:opacity-60 ${
                errors.message
                  ? "border-[#E0796B]"
                  : "border-[var(--v3-rule)] focus:border-[var(--v3-accent)]"
              }`}
            />
            {errors.message && (
              <p
                id="v3-message-error"
                className="mt-2 text-[12px] leading-6 text-[#E0796B]"
              >
                {errors.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={sending}
            className="rounded-[10px] bg-[var(--v3-fg)] px-7 py-3 text-[14px] font-semibold text-[var(--v3-bg)] transition-opacity duration-200 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--v3-accent)]"
          >
            {sending ? "送信中..." : "送信する"}
          </button>

          {/* 状態は読み上げにも伝える。内部エラーは出さない。 */}
          <p role="status" aria-live="polite" className="text-[13px] leading-7">
            {status === "success" && (
              <span className="text-[var(--v3-accent)]">
                送信しました。ありがとうございます。
              </span>
            )}
            {status === "error" && (
              <span className="text-[#E0796B]">
                送信できませんでした。時間をおいてもう一度お試しください。
              </span>
            )}
          </p>
        </form>
      </div>
    </section>
  );
}
