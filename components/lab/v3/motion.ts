"use client";

/**
 * Home v3 の motion / pointer interaction の共通部品。
 *
 * 方針:
 *  - duration は 140〜260ms。Hero の初回 reveal だけ長くてよい。
 *  - prefers-reduced-motion では「位置が動くもの」を全部止める。
 *    色・不透明度の変化だけ残すので、情報は変わらない。
 *  - cursor follower（常時追従する丸）は作らない。光は要素の内側にだけ出す。
 */
import { useCallback, useEffect, useRef, useState } from "react";

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

/**
 * 要素の内側に、ポインタ位置へ寄る淡い光を出すための座標を CSS 変数で渡す。
 * rAF で間引く。reduced-motion では何もしない。
 */
export function usePointerLight<T extends HTMLElement>(enabled = true) {
  const ref = useRef<T | null>(null);
  const frame = useRef(0);
  const reduced = usePrefersReducedMotion();
  const on = enabled && !reduced;

  const onPointerMove = useCallback(
    (e: React.PointerEvent<T>) => {
      if (!on) return;
      const el = ref.current;
      if (!el) return;
      const { clientX, clientY } = e;
      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${((clientX - r.left) / r.width) * 100}%`);
        el.style.setProperty("--my", `${((clientY - r.top) / r.height) * 100}%`);
      });
    },
    [on]
  );

  const onPointerLeave = useCallback(() => {
    cancelAnimationFrame(frame.current);
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--mx", "50%");
    el.style.setProperty("--my", "50%");
  }, []);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  return { ref, onPointerMove, onPointerLeave, active: on };
}

/** 一度だけ発火する画面内判定。スクロールのたびに再生はしない。 */
export function useRevealOnce<T extends HTMLElement>(rootMargin = "-12% 0px") {
  const ref = useRef<T | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || shown) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [shown, rootMargin]);

  return { ref, shown };
}

/**
 * カードの「近づいたら反応する」を作るための近接検知。
 *
 * カード要素上の pointermove だけでは外側を拾えないので window で受け、
 * pointer とカード矩形の**最短距離**から強度を出す。
 *
 * 強度の設計（目視で調整）:
 *   100px より外 … 0        反応なし
 *   50px 付近    … 0.3      うっすら出る
 *   枠のすぐ外   … 0.6      はっきりする
 *   カード内     … 1.0      最大
 *
 * 負荷対策: rAF で 1 フレーム 1 回に束ね、画面外では listener 自体を外す。
 * touch 端末（pointer: coarse）と reduced-motion では動かさない。
 */
const PROXIMITY_RANGE = 100; // px

export function useProximity<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const reduced = usePrefersReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [inView, setInView] = useState(false);

  // マウス等の正確なポインタがある環境でだけ有効にする
  useEffect(() => {
    if (reduced) {
      setEnabled(false);
      return;
    }
    const mq = window.matchMedia("(pointer: fine)");
    const on = () => setEnabled(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [reduced]);

  // 画面外では計算しない
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), {
      rootMargin: "120px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled || !inView) return;

    let frame = 0;
    let px = 0;
    let py = 0;

    const apply = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      if (!r.width || !r.height) return;

      // 矩形に押し込んだ点＝最も近い点。内側なら pointer そのもの。
      const cx = Math.min(Math.max(px, r.left), r.right);
      const cy = Math.min(Math.max(py, r.top), r.bottom);
      const dist = Math.hypot(px - cx, py - cy);
      const inside = dist === 0;

      const strength = inside
        ? 1
        : Math.max(0, 1 - dist / PROXIMITY_RANGE) * 0.6;

      // ハイライトの位置。外にいるときは一番近い縁へ寄せる。
      el.style.setProperty("--mx", `${((cx - r.left) / r.width) * 100}%`);
      el.style.setProperty("--my", `${((cy - r.top) / r.height) * 100}%`);
      el.style.setProperty("--prox", strength.toFixed(3));
    };

    const onMove = (e: PointerEvent) => {
      px = e.clientX;
      py = e.clientY;
      if (!frame) frame = requestAnimationFrame(apply);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
      el.style.setProperty("--prox", "0");
    };
  }, [enabled, inView]);

  return { ref, active: enabled };
}

/**
 * セクションの scroll progress を 0〜1 で取り出し、CSS 変数として書き込む。
 *
 * なぜ CSS 変数か:
 *   進捗を React state に入れると 1 フレームごとに再描画が走る。
 *   変数へ書いて、見た目は CSS 側の calc/clamp で表現すれば再描画は 0 回になる。
 *   「何番目まで進んだか」だけは state で持つが、これは値が変わった時だけ更新する。
 *
 * 負荷対策:
 *   - listener は section が viewport 付近にいる間だけ張る。常時監視はしない。
 *   - passive + rAF で 1 フレーム 1 回に束ねる。
 *   - rect の read と style の write を同じ関数内で read → write の順に固定する。
 *
 * mode:
 *   span   … 通常のセクション。viewport を横切る間に 0→1。
 *   sticky … 背の高いセクション + position: sticky の子。sticky が張り付いて
 *            いる区間の進み具合を 0→1 にする。
 *
 * reduced-motion では最初から 1（＝完成状態）にして、二度と計算しない。
 */

/** sticky モードで、貼り付く前にどれだけ先行して進捗を始めるか（画面高に対する比） */
const STICKY_LEAD = 0.35;

/** span モード: 上端がこの高さに来たら進捗 0 / 下端がこの高さに来たら進捗 1 */
const SPAN_START = 0.85;
const SPAN_END = 0.64;
export function useScrollProgress<T extends HTMLElement>({
  mode = "span",
  varName = "--sp",
  steps = 0,
}: {
  mode?: "span" | "sticky";
  varName?: string;
  steps?: number;
} = {}) {
  const ref = useRef<T | null>(null);
  const reduced = usePrefersReducedMotion();
  const [near, setNear] = useState(false);
  const [step, setStep] = useState(0);
  const stepRef = useRef(0);

  // viewport 付近にいる間だけ処理する。ここが「常時監視の禁止」の担保。
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    if (typeof IntersectionObserver === "undefined") {
      setNear(true);
      return;
    }
    const io = new IntersectionObserver(([e]) => setNear(e.isIntersecting), {
      rootMargin: "20% 0px 20% 0px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // 動きを止める設定では、完成状態で固定して listener を張らない。
    if (reduced) {
      el.style.setProperty(varName, "1");
      if (steps > 0) {
        stepRef.current = steps - 1;
        setStep(steps - 1);
      }
      return;
    }
    if (!near) return;

    let frame = 0;

    const measure = () => {
      frame = 0;
      const vh = window.innerHeight || 1;
      const r = el.getBoundingClientRect(); // read

      let p: number;
      if (mode === "sticky") {
        /*
          sticky の子が張り付いていられる距離 ＝ 全体高 - 子の高さ。
          子の高さは実測する。画面1枚ぶんと決め打ちにすると、子を 100vh 以外に
          した時に「進捗が 1 になる前に剥がれる」ずれが出るため。

          さらに、貼り付く**前**から進捗を始める（STICKY_LEAD）。
          貼り付いた瞬間を 0 にすると、前のセクションを抜けてから貼り付くまでの
          1 画面ぶん、文章が画面にあるのに何も起きない時間ができてしまう。
          上端が画面の 35% まで上がってきた時点を 0 とし、剥がれる時点を 1 とする。
        */
        const child = el.querySelector<HTMLElement>("[data-sticky]");
        const pinTravel = r.height - (child ? child.offsetHeight : vh);
        const lead = vh * STICKY_LEAD;
        const span = pinTravel + lead;
        p = span > 0 ? (lead - r.top) / span : 0;
      } else {
        /*
          上端が画面の SPAN_START に来た時点で 0、
          下端が SPAN_END まで上がってきた時点で 1。

          終わりを早くしてあるのは、最後の項目を読んでいる最中に線が届いて
          ほしいため。下端が画面中央まで上がるのを待つと、その頃には該当項目が
          画面のかなり上へ流れていて、線がテキストを後ろから追いかける形になる。

          計測対象はセクションではなく、余白を含まない中身の要素に付けること。
          上下の padding まで含めて測ると、その分だけ端がずれる。
        */
        const travel = r.height + vh * (SPAN_START - SPAN_END);
        p = travel > 0 ? (vh * SPAN_START - r.top) / travel : 0;
      }
      p = p < 0 ? 0 : p > 1 ? 1 : p;

      el.style.setProperty(varName, p.toFixed(4)); // write

      if (steps > 0) {
        const s = Math.min(steps - 1, Math.max(0, Math.floor(p * steps)));
        if (s !== stepRef.current) {
          stepRef.current = s;
          setStep(s); // 値が変わった時だけ。全体で steps 回しか走らない。
        }
      }
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [near, reduced, mode, varName, steps]);

  return { ref, step, reduced };
}

/**
 * マウス/トラックパッドのような正確なポインタがあるか。
 * touch 端末と reduced-motion では false にして、pointer 前提の表現を出さない。
 */
export function useFinePointer() {
  const reduced = usePrefersReducedMotion();
  const [fine, setFine] = useState(false);
  useEffect(() => {
    if (reduced) {
      setFine(false);
      return;
    }
    const mq = window.matchMedia("(pointer: fine)");
    const on = () => setFine(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [reduced]);
  return fine;
}
