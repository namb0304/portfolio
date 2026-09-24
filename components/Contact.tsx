"use client";

import { useState, FormEvent } from 'react';
import { siteConfig } from '@/config';
import { FaGithub, FaPaperPlane } from 'react-icons/fa';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // EmailJSの設定（環境変数から取得）
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      // 環境変数が設定されていない場合のエラーハンドリング
      if (!serviceId || !templateId || !publicKey) {
        console.error('EmailJS環境変数が設定されていません。.env.localファイルを確認してください。');
        setSubmitStatus('error');
        return;
      }

      // 本人宛ての通知メール（初回公開では自動返信は送らない）
      await emailjs.send(
        serviceId,
        templateId,
        {
          // To はテンプレート側で固定済み。フロントからは宛先を渡さない。
          // テンプレートが {{name}}/{{email}} と {{from_name}}/{{from_email}} を
          // 併用しているため、両方の名前で同じ値を渡す。
          name: formData.name,
          email: formData.email,
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        publicKey
      );

      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('メール送信エラー:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  return (
    /* Visual Spike 2026-09: フォームのロジックは変更していない。
       文言（フリーランス向け → 採用・インターン向け）と見た目のみ差し替えている。 */
    <section id="contact" className="scroll-mt-16 py-20 md:py-28">
      <div className="mx-auto w-full max-w-5xl px-5 md:px-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3">
          Contact
        </p>
        <h2 className="mt-3 text-2xl font-bold tracking-tight text-ink md:text-3xl">
          連絡先
        </h2>
        <p className="mt-5 max-w-2xl text-[15px] leading-8 text-ink-2">
          採用・インターン・開発に関するご連絡はこちらからお願いします。
          このサイトに書いた内容について、詳しく聞きたい点があればその旨をお書きください。
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          <a
            href={siteConfig.author.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded text-[14px] text-ink-2 transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            <FaGithub size={15} />
            GitHub
          </a>
        </div>

        <form onSubmit={handleSubmit} className="mt-12 max-w-xl space-y-6">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block font-mono text-[11px] uppercase tracking-[0.14em] text-ink-3"
            >
              お名前 <span className="text-accent">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-line bg-panel px-4 py-3 text-[15px] text-ink placeholder:text-ink-3 transition-colors focus:border-ink-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              placeholder="お名前"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block font-mono text-[11px] uppercase tracking-[0.14em] text-ink-3"
            >
              メールアドレス <span className="text-accent">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-line bg-panel px-4 py-3 text-[15px] text-ink placeholder:text-ink-3 transition-colors focus:border-ink-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              placeholder="example@email.com"
            />
          </div>

          <div>
            <label
              htmlFor="subject"
              className="mb-2 block font-mono text-[11px] uppercase tracking-[0.14em] text-ink-3"
            >
              件名
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full rounded-md border border-line bg-panel px-4 py-3 text-[15px] text-ink placeholder:text-ink-3 transition-colors focus:border-ink-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              placeholder="ご用件"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="mb-2 block font-mono text-[11px] uppercase tracking-[0.14em] text-ink-3"
            >
              メッセージ <span className="text-accent">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              className="w-full resize-y rounded-md border border-line bg-panel px-4 py-3 text-[15px] leading-7 text-ink placeholder:text-ink-3 transition-colors focus:border-ink-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              placeholder="ご連絡内容をご記入ください"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`inline-flex items-center justify-center gap-2.5 rounded-md px-6 py-3.5 text-[15px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
              isSubmitting
                ? "cursor-not-allowed bg-line text-ink-3"
                : "bg-ink text-ground hover:bg-white"
            }`}
          >
            <FaPaperPlane size={14} />
            <span>{isSubmitting ? "送信中..." : "送信する"}</span>
          </button>

          {submitStatus === "success" && (
            <p role="status" className="text-[14px] leading-7 text-accent">
              メッセージを送信しました。ご連絡ありがとうございます。
            </p>
          )}
          {submitStatus === "error" && (
            <p role="alert" className="text-[14px] leading-7 text-ink-2">
              送信に失敗しました。お手数ですが、時間をおいて再度お試しください。
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default Contact;
