/**
 * /design-lab 共通の画像まわり。
 *
 * 色は持たない。各 Direction のラッパが定義する CSS 変数
 * (--lab-panel / --lab-line / --lab-ink / --lab-muted / --lab-accent) を参照する。
 * これにより「同じ部品を3案で使い回しているのに見た目が違う」状態を作る。
 */
import Image from "next/image";
import type { ReactNode } from "react";

/** ブラウザ枠。実UIを「製品」として見せるための最小の枠。信号機ドットは使わない。 */
export function BrowserFrame({
  children,
  label,
  className = "",
}: {
  children: ReactNode;
  label?: string;
  className?: string;
}) {
  return (
    <figure
      className={`overflow-hidden rounded-[10px] border border-[var(--lab-line)] bg-[var(--lab-panel)] ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-[var(--lab-line)] px-3 py-2">
        <span className="h-[7px] w-[7px] rounded-full bg-[var(--lab-muted)] opacity-40" />
        {label && (
          <span className="truncate text-[10px] tracking-wide text-[var(--lab-muted)]">
            {label}
          </span>
        )}
      </div>
      <div className="relative">{children}</div>
    </figure>
  );
}

/** 端末枠。来店客が自分のスマホで使う、という事実を画で出すため。 */
export function PhoneFrame({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-[26px] border-[6px] border-[var(--lab-line)] bg-[var(--lab-panel)] shadow-[0_24px_60px_-24px_rgba(0,0,0,0.6)] ${className}`}
    >
      <div className="relative aspect-[9/17]">{children}</div>
    </div>
  );
}

/**
 * まだ撮れていない画面の置き場所。
 * 「壊れている」ではなく「これから入る」に見えるよう、斜線と必要な内容を明示する。
 */
export function ShotPlaceholder({
  label,
  hint,
  className = "",
  ratio = "aspect-[16/10]",
}: {
  label: string;
  hint?: string;
  className?: string;
  ratio?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[10px] border border-dashed border-[var(--lab-line)] bg-[var(--lab-panel)] ${ratio} ${className}`}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, transparent 0 9px, var(--lab-line) 9px 10px)",
        }}
      />
      <div className="absolute inset-0 flex flex-col items-start justify-end gap-1 p-4 md:p-5">
        <p className="text-[11px] tracking-[0.12em] text-[var(--lab-muted)]">
          IMAGE PENDING
        </p>
        <p className="text-[13px] font-medium text-[var(--lab-ink)] md:text-[15px]">
          {label}
        </p>
        {hint && (
          <p className="text-[11px] leading-5 text-[var(--lab-muted)]">{hint}</p>
        )}
      </div>
    </div>
  );
}

/** 実在するスクリーンショット。必ず「何の画像か」の注記を添えて出す。 */
export function Shot({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className={`h-full w-full object-cover ${className}`}
    />
  );
}

/** 画像に添える出典・注記。「本物」と「仮」の区別を必ず見せる。 */
export function ShotNote({ children }: { children: ReactNode }) {
  return (
    <p className="mt-2 text-[11px] leading-5 text-[var(--lab-muted)]">
      {children}
    </p>
  );
}
