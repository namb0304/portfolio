"use client";

import { useState } from 'react';
import Link from 'next/link';
import { FaBars, FaTimes } from 'react-icons/fa';

const GlobalHeader = () => {
  // モバイルメニューが開いているかどうかの状態を管理
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // リンクのリスト（管理しやすくするために配列化）
  const navLinks = [
    { href: '#profile', label: 'Profile' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#timeline', label: 'Activities' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-gray-900/80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 border-b border-gray-700">
          <Link href="/" className="text-xl font-bold">
            My Portfolio
          </Link>

          {/* PC用のナビゲーション (画面がmd以上で表示) */}
          <nav className="hidden md:flex space-x-6 text-sm">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-gray-300 hover:text-white transition-colors">
                {link.label}
              </a>
            ))}
          </nav>

          {/* スマホ用のハンバーガーボタン (画面がmd未満で表示) */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="z-50 text-white">
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* スマホ用のドロップダウンメニュー (isMenuOpenがtrueのときだけ表示) */}
      {isMenuOpen && (
        <nav className="absolute top-0 left-0 w-full bg-gray-900 pt-16 border-b border-gray-700 md:hidden">
          <ul className="flex flex-col items-center space-y-6 py-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a 
                  href={link.href} 
                  onClick={() => setIsMenuOpen(false)} // リンククリックでメニューを閉じる
                  className="text-lg text-gray-300 hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default GlobalHeader;