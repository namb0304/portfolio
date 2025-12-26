"use client";

import { siteConfig } from '@/config';
import { FaEnvelope, FaGithub, FaCopy, FaCheck } from 'react-icons/fa';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';

const Contact = () => {
  const { isCopied, copyToClipboard } = useCopyToClipboard();

  const handleCopyEmail = () => {
    copyToClipboard(siteConfig.author.email);
  };

  return (
    <section id="contact" className="container mx-auto p-4 md:p-8 scroll-mt-16">
      <div className="text-center">
        <h2 className="text-3xl font-bold">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
            Contact
          </span>
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto mb-12">
          <br />
          お仕事のご相談やご依頼など、お気軽にご連絡ください。
        </p>
      </div>

      {/* === 連絡先ボタン === */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
        {/* GitHubボタン (変更なし) */}
        <a 
          href={siteConfig.author.github} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex items-center justify-center gap-3 w-60 px-6 py-4 bg-gray-800 rounded-lg font-semibold text-white transition-all duration-300 hover:bg-gray-700 hover:scale-105"
        >
          <FaGithub size={24} />
          <span>GitHub</span>
        </a>

        {/* ↓↓↓ Emailボタンのグループを修正 ↓↓↓ */}
        <div className="flex items-stretch gap-2">
          {/* Emailメーラー起動ボタン */}
          <a 
            href={`mailto:${siteConfig.author.email}`}
            className="flex items-center justify-center gap-3 flex-grow px-6 py-4 bg-gray-800 rounded-lg font-semibold text-white transition-all duration-300 hover:bg-gray-700 hover:scale-105"
          >
            <FaEnvelope size={24} />
            <span>Email</span>
          </a>
          {/* Emailコピーボタン */}
          <button
            onClick={handleCopyEmail}
            className="flex items-center justify-center px-4 py-4 bg-gray-700 rounded-lg font-semibold text-white transition-all duration-300 hover:bg-cyan-600 hover:scale-105"
            title="メールアドレスをコピー"
          >
            {isCopied ? (
              <FaCheck className="text-green-400" />
            ) : (
              <FaCopy />
            )}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Contact;