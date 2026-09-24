"use client";

/**
 * お問い合わせフォームの送信ロジック。
 *
 * 宛先:
 *   EmailJS テンプレート側で To Email を固定済みのため、フロントからは
 *   `to_email` を一切渡さない。個人アドレスがクライアントバンドルへ入る経路を
 *   コードから完全になくすため、env 経由の fallback も持たない。
 *
 * 自動返信:
 *   初回公開では送らない。本人宛て通知が成功したのに自動返信だけ失敗すると
 *   フォーム全体が失敗表示になり、利用者が再送して二重問い合わせになるため。
 */
import { useCallback, useState } from "react";
import emailjs from "@emailjs/browser";

export type ContactStatus = "idle" | "sending" | "success" | "error";

export type ContactFields = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export type ContactErrors = Partial<Record<keyof ContactFields, string>>;

const EMPTY: ContactFields = { name: "", email: "", subject: "", message: "" };

/** ブラウザと同等のゆるい判定。厳格にしすぎて正当なアドレスを弾かない。 */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validate(values: ContactFields): ContactErrors {
  const errors: ContactErrors = {};
  if (!values.name.trim()) errors.name = "お名前を入力してください。";
  if (!values.email.trim()) {
    errors.email = "メールアドレスを入力してください。";
  } else if (!EMAIL_RE.test(values.email.trim())) {
    errors.email = "メールアドレスの形式を確認してください。";
  }
  if (!values.message.trim()) errors.message = "メッセージを入力してください。";
  return errors;
}

export function useContactForm() {
  const [values, setValues] = useState<ContactFields>(EMPTY);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<ContactStatus>("idle");

  const setField = useCallback((key: keyof ContactFields, value: string) => {
    setValues((v) => ({ ...v, [key]: value }));
    // 入力し直したらそのフィールドのエラーだけ消す
    setErrors((e) => (e[key] ? { ...e, [key]: undefined } : e));
  }, []);

  const submit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (status === "sending") return; // 二重送信防止

      const found = validate(values);
      if (Object.keys(found).length > 0) {
        setErrors(found);
        return;
      }

      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        // 設定不足は開発側の問題。利用者には内部事情を見せない。
        console.error("EmailJS の環境変数が設定されていません。");
        setStatus("error");
        return;
      }

      setStatus("sending");
      try {
        await emailjs.send(
          serviceId,
          templateId,
          {
            // テンプレートが {{name}}/{{email}} と {{from_name}}/{{from_email}} を
            // 併用しているため、両方の名前で同じ値を渡して取りこぼしを防ぐ。
            name: values.name,
            email: values.email,
            from_name: values.name,
            from_email: values.email,
            subject: values.subject,
            message: values.message,
          },
          publicKey
        );


        setStatus("success");
        setValues(EMPTY); // 成功時だけ消す
      } catch (err) {
        // 失敗時は入力を残す。内部メッセージは表に出さない。
        console.error("お問い合わせの送信に失敗しました", err);
        setStatus("error");
      }
    },
    [status, values]
  );

  return { values, errors, status, setField, submit };
}
