"use client";

import React, { useState, useMemo } from 'react';
import { siteConfig } from '@/config';
import { FaArrowUp, FaArrowDown, FaChartLine, FaListUl } from 'react-icons/fa';
import HorizontalTimelineItem from './HorizontalTimelineItem';
import TimelineItem from './TimelineItem';
import FilterButton from './FilterButton';

const Timeline: React.FC = () => {
  const { timeline: historyItems } = siteConfig;
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [layout, setLayout] = useState<'horizontal' | 'vertical'>('vertical');

  const allTags = [...new Set(historyItems.flatMap(item => item.tags))];

  const sortedAndFilteredItems = useMemo(() => {
    const filtered = activeTag
      ? historyItems.filter(item => item.tags.includes(activeTag))
      : historyItems;
    return [...filtered].sort((a, b) => {
      const dateA = new Date(a.date.replace('年', '-').replace('月', ''));
      const dateB = new Date(b.date.replace('年', '-').replace('月', ''));
      return sortOrder === 'desc' ? dateB.getTime() - dateA.getTime() : dateA.getTime() - dateB.getTime();
    });
  }, [activeTag, sortOrder, historyItems]);

  return (
    <section id="timeline" className="container mx-auto p-4 md:p-8 scroll-mt-22" aria-labelledby="timeline-title">
      <h2 id="timeline-title" className="text-3xl font-bold text-center mb-4">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
          Activities
        </span>
      </h2>
      <p className="text-center text-gray-400 mb-8">大学から歩んできた学びや経験を時系列でまとめた記録です</p>
      
      {/* === コントロールパネル === */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 mb-12">
        <div className="flex flex-wrap justify-center gap-2">
          <FilterButton
            label="すべて"
            isActive={!activeTag}
            onClick={() => setActiveTag(null)}
          />
          {allTags.map(tag => (
            <FilterButton
              key={tag}
              label={tag}
              isActive={activeTag === tag}
              onClick={() => setActiveTag(tag)}
            />
          ))}
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 p-1 bg-gray-800 rounded-full" role="group" aria-label="タイムライン表示レイアウト選択">
            <button
              onClick={() => setLayout('vertical')}
              className={`p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400 ${layout === 'vertical' ? 'bg-cyan-500 text-white shadow' : 'text-gray-400 hover:text-white'}`}
              title="縦表示"
              aria-label="縦表示に切り替え"
              aria-pressed={layout === 'vertical'}
            >
              <FaListUl className="text-lg" />
            </button>
            <button
              onClick={() => setLayout('horizontal')}
              className={`p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400 ${layout === 'horizontal' ? 'bg-cyan-500 text-white shadow' : 'text-gray-400 hover:text-white'}`}
              title="横表示"
              aria-label="横表示に切り替え"
              aria-pressed={layout === 'horizontal'}
            >
              <FaChartLine className="text-lg" />
            </button>
          </div>
          <div className="flex items-center gap-1 p-1 bg-gray-800 rounded-full whitespace-nowrap" role="group" aria-label="並び順選択">
            <button
              onClick={() => setSortOrder('asc')}
              className={`px-3 py-1 flex items-center gap-1.5 rounded-full text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400 ${sortOrder === 'asc' ? 'bg-cyan-500 text-white shadow' : 'text-gray-400 hover:text-white'}`}
              aria-label="古い順に並び替え"
              aria-pressed={sortOrder === 'asc'}
            >
              <FaArrowUp /> 古い順
            </button>
            <button
              onClick={() => setSortOrder('desc')}
              className={`px-3 py-1 flex items-center gap-1.5 rounded-full text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400 ${sortOrder === 'desc' ? 'bg-cyan-500 text-white shadow' : 'text-gray-400 hover:text-white'}`}
              aria-label="新しい順に並び替え"
              aria-pressed={sortOrder === 'desc'}
            >
              <FaArrowDown /> 新しい順
            </button>
          </div>
        </div>
      </div>
      
      {/* === レイアウト表示エリア === */}
      {layout === 'horizontal' ? (
        <div className="w-full overflow-x-auto pb-8 scrollbar-thin scrollbar-thumb-cyan-500/50 scrollbar-track-gray-800">
          <div className="relative inline-flex items-end min-h-[24rem] px-4 pt-1 pb-16">
            <div className="absolute bottom-10 left-0 right-0 h-0.5 bg-gray-700 z-0"></div>
            {sortedAndFilteredItems.map((item, index) => {
              const slopeValue = sortOrder === 'asc'
                ? index * 2
                : (sortedAndFilteredItems.length - 1 - index) * 2;
              
              return (
                <div key={index} className="relative z-10" style={{ marginBottom: `${slopeValue}rem` }}>
                    <div className="absolute top-full text-center w-full mt-5 text-base font-mono text-gray-400">
                      {item.date}
                    </div>
                  <HorizontalTimelineItem item={item} />
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="h-[70vh] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-cyan-500/50 scrollbar-track-gray-800">
          <div className="relative max-w-4xl mx-auto">
            <div className="border-l-2 border-gray-700 absolute h-full top-0 left-4 md:left-1/2 md:-translate-x-1/2"></div>
            {sortedAndFilteredItems.map((item, index) => (
              <TimelineItem key={index} item={item} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default Timeline;