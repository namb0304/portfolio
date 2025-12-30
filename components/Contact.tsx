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
      const autoReplyTemplateId = process.env.NEXT_PUBLIC_EMAILJS_AUTO_REPLY_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      // 環境変数が設定されていない場合のエラーハンドリング
      if (!serviceId || !templateId || !publicKey) {
        console.error('EmailJS環境変数が設定されていません。.env.localファイルを確認してください。');
        setSubmitStatus('error');
        return;
      }

      // 1通目: 自分宛にお問い合わせ内容を送信
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_email: siteConfig.author.email,
        },
        publicKey
      );

      // 2通目: お問い合わせ者に自動返信メールを送信
      if (autoReplyTemplateId) {
        await emailjs.send(
          serviceId,
          autoReplyTemplateId,
          {
            from_name: formData.name,
            from_email: formData.email,
            message: formData.message,
          },
          publicKey
        );
      }

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
    <section id="contact" className="container mx-auto p-4 md:p-8 scroll-mt-24">
      <div className="text-center">
        <h2 className="text-3xl font-bold">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
            Contact
          </span>
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto mb-12">
          <br />
          お仕事のご相談やご依頼など、お気軽にご連絡ください
        </p>
      </div>

      {/* === SNSリンク === */}
      <div className="flex justify-center mb-12">
        <a
          href={siteConfig.author.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-gray-700 to-gray-800 rounded-lg font-bold text-white text-lg shadow-lg transition-all duration-300 hover:from-gray-600 hover:to-gray-700 hover:scale-105 hover:shadow-cyan-500/50"
        >
          <FaGithub size={28} />
          <span>GitHub Profile</span>
        </a>
      </div>

      {/* === お問い合わせフォーム === */}
      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 名前 */}
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-300 mb-2">
              お名前 <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
              placeholder="山田 太郎"
            />
          </div>

          {/* メールアドレス */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-2">
              メールアドレス <span className="text-red-400">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
              placeholder="example@email.com"
            />
          </div>

          {/* 件名 */}
          <div>
            <label htmlFor="subject" className="block text-sm font-semibold text-gray-300 mb-2">
              件名
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
              placeholder="お問い合わせ内容"
            />
          </div>

          {/* メッセージ */}
          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-gray-300 mb-2">
              メッセージ <span className="text-red-400">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all resize-none"
              placeholder="お問い合わせ内容をご記入ください"
            />
          </div>

          {/* 送信ボタン */}
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full flex items-center justify-center gap-3 px-6 py-4 rounded-lg font-bold text-white transition-all duration-300 ${
                isSubmitting
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 hover:scale-105'
              }`}
            >
              <FaPaperPlane size={20} />
              <span>{isSubmitting ? '送信中...' : '送信する'}</span>
            </button>
          </div>

          {/* ステータスメッセージ */}
          {submitStatus === 'success' && (
            <div className="p-4 bg-green-900/30 border border-green-500 rounded-lg text-green-400 text-center">
              メッセージを送信しました。ご連絡ありがとうございます！
            </div>
          )}
          {submitStatus === 'error' && (
            <div className="p-4 bg-red-900/30 border border-red-500 rounded-lg text-red-400 text-center">
              送信に失敗しました。EmailJSの環境変数が設定されているか確認してください。
            </div>
          )}
        </form>
      </div>
    </section>
  );
};

export default Contact;
