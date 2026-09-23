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
