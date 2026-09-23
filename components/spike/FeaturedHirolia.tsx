/**
 * Visual Spike 2026-09 — TOP で最も重いセクション。
 * 普通の Project Card にはしない。順序は「事実 → 担当範囲 → 変化の流れ」。
 */
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { Container, Eyebrow } from "./Section";
import { hirolia } from "@/config/spike";

export default function FeaturedHirolia() {
  return (
    <section
      id="hirolia"
      className="scroll-mt-16 border-t border-line py-24 md:py-36"
    >
      <Container>
        <Eyebrow>Featured Case Study</Eyebrow>
        <h2 className="mt-3 text-4xl font-bold tracking-tight text-ink md:text-6xl">
          {hirolia.name}
        </h2>
        <p className="mt-4 text-[17px] leading-8 text-ink-2 md:text-[19px]">
          {hirolia.tagline}
        </p>
        <p className="mt-4 flex items-center gap-2.5 text-[13px] text-ink-3">
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 rounded-full bg-accent"
          />
          {hirolia.status}
        </p>

        {/* --- 一目で分かる事実 ------------------------------------------ */}
        <dl className="mt-14 grid grid-cols-1 gap-x-10 border-t border-line sm:grid-cols-2 md:mt-16 md:grid-cols-3">
          {hirolia.facts.map((f) => (
            <div key={f.label} className="border-b border-line py-5">
              <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-3">
                {f.label}
              </dt>
              <dd className="mt-2 text-[15px] leading-7 text-ink">{f.value}</dd>
            </div>
          ))}
        </dl>

        {/* --- 自分の担当範囲 -------------------------------------------- */}
        <div className="mt-20 md:mt-24">
          <h3 className="text-xl font-bold text-ink md:text-2xl">
            設計から運用まで、ひと続きで担当している
          </h3>
          <p className="mt-3 max-w-2xl text-[14px] leading-7 text-ink-3">
            使った技術の一覧ではなく、どのフェーズに責任を持っているかで並べています。
          </p>

          <ol className="relative mt-10 pl-6 md:pl-8">
            {/* 4フェーズを貫く1本線＝「範囲がひと続きである」ことの表現 */}
            <span
              aria-hidden="true"
              className="absolute left-[3px] top-2 bottom-2 w-px bg-line md:left-[5px]"
            />
            {hirolia.scope.map((s) => (
              <li key={s.phase} className="relative pb-9 last:pb-0">
                <span
                  aria-hidden="true"
                  className="absolute -left-6 top-[7px] h-[7px] w-[7px] rounded-[1px] bg-ink-3 md:-left-8"
                />
                <p className="text-[15px] font-semibold text-ink">{s.phase}</p>
                <p className="mt-2 text-[14px] leading-7 text-ink-2">
                  {s.items.join(" / ")}
                </p>
              </li>
            ))}
          </ol>
        </div>

        {/* --- 変化の流れ（このケースで伝えたい中心） --------------------- */}
        <div className="mt-20 md:mt-24">
          <h3 className="text-xl font-bold text-ink md:text-2xl">
            作ったことより、入れてから起きたことの方が長い
          </h3>

          <ol className="mt-10 grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-y-0">
            {hirolia.arc.map((a, i) => (
              <li
                key={a.step}
                className={`border-t pt-5 ${
                  "current" in a && a.current ? "border-accent" : "border-line"
                }`}
              >
                <p className="font-mono text-[11px] tracking-[0.14em] text-ink-3">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p
                  className={`mt-2 text-[15px] font-semibold ${
                    "current" in a && a.current ? "text-accent" : "text-ink"
                  }`}
                >
                  {a.step}
                </p>
                <p className="mt-2.5 text-[14px] leading-7 text-ink-2">
                  {a.body}
                </p>
              </li>
            ))}
          </ol>

          <p className="mt-14 max-w-2xl text-[18px] font-medium leading-[1.8] text-ink md:text-[22px]">
            {hirolia.thesis}
          </p>
        </div>

        <div className="mt-12">
          <Link
            href="/work/hirolia"
            className="group inline-flex items-center gap-2 rounded-md bg-ink px-6 py-3.5 text-[15px] font-semibold text-ground transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Hirolia の詳細を読む
            <FaArrowRight
              size={12}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </Container>
    </section>
  );
}
