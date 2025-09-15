"use client";

import { useState } from 'react';
import Link from 'next/link';
import { FaBars, FaTimes } from 'react-icons/fa';

const GlobalHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    setIsMenuOpen(false); // モバイルメニューのリンクをクリックしたらメニューを閉じる
    
    const href = e.currentTarget.getAttribute('href');
    if (!href) return;
    const targetId = href.substring(1);
    
    const elem = document.getElementById(targetId);
    if (elem) {
      const header = document.querySelector('header');
      const headerHeight = header ? header.offsetHeight : 0;
      const targetPosition = elem.offsetTop - headerHeight;
      window.scrollTo({ top: targetPosition, behavior: "smooth" });
    }
  };

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
            {navLinks.map(link => (
              <a key={link.href} href={link.href} onClick={handleScroll} className="text-gray-300 hover:text-white transition-colors">
                {link.label}
              </a>
            ))}
          </nav>

          {/* スマホ用のハンバーガーボタン (画面がmd未満で表示) */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* スマホ用のドロップダウンメニュー */}
      {isMenuOpen && (
        <nav className="md:hidden bg-gray-900 px-4 pt-2 pb-4 border-b border-gray-700">
          <ul className="flex flex-col items-center space-y-4">
            {navLinks.map(link => (
              <li key={link.href}>
                <a href={link.href} onClick={handleScroll} className="text-gray-300 hover:text-white transition-colors">
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