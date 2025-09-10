"use client"; // この行が重要です！

import { useState } from 'react';
import Skills from './Skills'; // 以前作ったスキルコンポーネント

// 仮のコンポーネントを定義（後で中身を作成）
const Projects = () => <div className="py-8">ここに作品一覧が入ります。</div>;
const Career = () => <div className="py-8">ここに経歴や学歴が入ります。</div>;

const TabContainer = () => {
  // 'activeTab' という名前の記憶場所を作成し、初期値を 'skills' に設定
  const [activeTab, setActiveTab] = useState('skills');

  return (
    <div className="container mx-auto px-4 mt-8">
      {/* タブのボタン部分 */}
      <div className="border-b border-gray-700">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('skills')}
            className={`py-4 px-1 font-medium ${activeTab === 'skills' ? 'border-b-2 border-cyan-400 text-cyan-400' : 'text-gray-400 hover:text-white'}`}
          >
            スキル
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`py-4 px-1 font-medium ${activeTab === 'projects' ? 'border-b-2 border-cyan-400 text-cyan-400' : 'text-gray-400 hover:text-white'}`}
          >
            作品
          </button>
          <button
            onClick={() => setActiveTab('career')}
            className={`py-4 px-1 font-medium ${activeTab === 'career' ? 'border-b-2 border-cyan-400 text-cyan-400' : 'text-gray-400 hover:text-white'}`}
          >
            経歴
          </button>
        </nav>
      </div>

      {/* タブのコンテンツ部分 */}
      <div className="mt-4">
        {activeTab === 'skills' && <Skills />}
        {activeTab === 'projects' && <Projects />}
        {activeTab === 'career' && <Career />}
      </div>
    </div>
  );
};

export default TabContainer;