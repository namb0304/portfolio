"use client";

import { useState } from 'react';
import { BsGrid3X3GapFill, BsToggles2 } from 'react-icons/bs'; // 切替用のアイコン
import ProjectsCarousel from './ProjectsCarousel';
import ProjectsGrid from './ProjectsGrid';

const ProjectsSection = () => {
  const [layout, setLayout] = useState<'carousel' | 'grid'>('carousel');

  return (
    <section id="projects" className="container mx-auto p-4 md:p-8 scroll-mt-22" aria-labelledby="projects-title">
      <div className="flex justify-center items-center gap-8 mb-4">
        <h2 id="projects-title" className="text-3xl font-bold text-center mb-4">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
            Projects
          </span>
        </h2>
        {/* === レイアウト切替ボタン === */}
        <div className="flex items-center gap-1 p-1 bg-gray-800 rounded-full" role="group" aria-label="プロジェクト表示レイアウト選択">
          <button
            onClick={() => setLayout('carousel')}
            className={`p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400 ${layout === 'carousel' ? 'bg-cyan-500 text-white' : 'text-gray-400 hover:text-white'}`}
            title="カルーセル表示"
            aria-label="カルーセル表示に切り替え"
            aria-pressed={layout === 'carousel'}
          >
            <BsToggles2 />
          </button>
          <button
            onClick={() => setLayout('grid')}
            className={`p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400 ${layout === 'grid' ? 'bg-cyan-500 text-white' : 'text-gray-400 hover:text-white'}`}
            title="グリッド表示"
            aria-label="グリッド表示に切り替え"
            aria-pressed={layout === 'grid'}
          >
            <BsGrid3X3GapFill />
          </button>
        </div>
      </div>
      <p className="text-center text-gray-400 mb-5">私の今までの個人開発やハッカソンでの制作物です
        <br />右下にGitHubと制作物のリンクがあるので是非ご覧ください！
      </p>
      {/* === レイアウトに応じて表示を切り替え === */}
      <div role="region" aria-live="polite" aria-label="プロジェクト一覧">
        {layout === 'carousel' ? <ProjectsCarousel /> : <ProjectsGrid />}
      </div>
    </section>
  );
};

export default ProjectsSection;