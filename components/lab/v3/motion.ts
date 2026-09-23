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
