"use client";

import { useState } from 'react';
import Image from 'next/image';
import { siteConfig } from '@/config';
import Modal from './Modal';
import { FaUniversity } from 'react-icons/fa';

const ProfileHeader = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- 学年自動計算ロジック ---
  const today = new Date();
  const entranceYear = siteConfig.university.entranceYear;
  let currentGrade = today.getFullYear() - entranceYear;
  if (today.getMonth() + 1 < 4) {
    currentGrade--;
  }
  const affiliation = `${siteConfig.university.name} ${currentGrade + 1}年`;
  // --- ここまで ---

  return (
    // ↓↓↓ この行に scroll-mt-16 を追加 ↓↓↓
    <section id="profile" className="pt-24 md:pt-16 scroll-mt-16">
      <div className="h-48 md:h-90 bg-gray-700 relative">
        <Image
          src="/images/hero-background.jpg"
          alt="Banner"
          fill
          className="object-cover"
        />
      </div>
      <div className="container mx-auto px-4">
        <div className="relative -mt-16 md:-mt-20">
          <button onClick={() => setIsModalOpen(true)} className="w-32 h-32 md:w-40 md:h-40 relative block hover:opacity-90 transition-opacity">
            <Image
              src="/images/profile-icon.jpg"
              alt={siteConfig.author.name}
              fill
              className="rounded-full border-4 border-gray-900 bg-gray-900 object-cover"
            />
          </button>
          <div className="pt-6 pb-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4">
              <div className="md:col-span-1">
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
              {siteConfig.author.name}
            </h1>
            {/* 英語名を追加 */}
            <p className="mt-2 text-xl font-dancing-script text-gray-300">
                {siteConfig.author.nameEn}
            </p>
            <p className="mt-4 text-md text-gray-400 flex items-center gap-2">
              <FaUniversity />
              {affiliation}
            </p>
          </div>
              <div className="md:col-span-2 md:-translate-y-15">
                {/* 1. キャッチコピーの修正 */}
                <blockquote className="pl-4 border-l-4 border-cyan-400">
                  <p className="text-xl italic text-white leading-relaxed">
                    {`"${siteConfig.author.catchphrase}"`}
                  </p>
                </blockquote>
                {/* 2. 自己紹介文の修正 */}
                <p className="mt-9 max-w-3xl text-lg text-gray-200 leading-relaxed whitespace-pre-line">
                    {siteConfig.author.bio}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-2">
          <Image 
            src="/images/profile-icon.jpg" 
            alt={siteConfig.author.name}
            width={500}
            height={500}
            className="rounded-lg object-contain"
          />
        </div>
      </Modal>
    </section>
  );
};

export default ProfileHeader;