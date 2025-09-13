"use client";

import React, { useState, useMemo } from 'react';
import { siteConfig } from '@/config';
import { FaArrowUp, FaArrowDown, FaChartLine, FaListUl } from 'react-icons/fa';
import HorizontalTimelineItem from './HorizontalTimelineItem';
import TimelineItem from './TimelineItem';

const Timeline: React.FC = () => {
  const { timeline: historyItems } = siteConfig;
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [layout, setLayout] = useState<'horizontal' | 'vertical'>('horizontal');

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
    <section id="timeline" className="container mx-auto p-4 md:p-8 scroll-mt-22">
      <h2 className="text-3xl font-bold text-center mb-4">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
          Activities
        </span>
      </h2>
      <p className="text-center text-gray-400 mb-8">私の成長の軌跡</p>
      
      {/* === コントロールパネル === */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 mb-12">
        <div className="flex flex-wrap justify-center gap-2">
          <button onClick={() => setActiveTag(null)} className={`px-3 py-1 rounded-full text-sm font-semibold transition-colors ${!activeTag ? 'bg-cyan-500 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}>
            すべて
          </button>
          {allTags.map(tag => (
            <button key={tag} onClick={() => setActiveTag(tag)} className={`px-3 py-1 rounded-full text-sm font-semibold transition-colors ${activeTag === tag ? 'bg-cyan-500 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}>
              {tag}
            </button>
          ))}
        </div>
        
        <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 p-1 bg-gray-800 rounded-full">
            <button onClick={() => setLayout('horizontal')} className={`p-2 rounded-full transition-colors ${layout === 'horizontal' ? 'bg-cyan-500 text-white shadow' : 'text-gray-400 hover:text-white'}`} title="横表示">
              <FaChartLine className="text-lg" />
            </button>
            <button onClick={() => setLayout('vertical')} className={`p-2 rounded-full transition-colors ${layout === 'vertical' ? 'bg-cyan-500 text-white shadow' : 'text-gray-400 hover:text-white'}`} title="縦表示">
              <FaListUl className="text-lg" />
            </button>
          </div>
          <div className="flex items-center gap-1 p-1 bg-gray-800 rounded-full whitespace-nowrap">
            <button onClick={() => setSortOrder('asc')} className={`px-3 py-1 flex items-center gap-1.5 rounded-full text-sm transition-colors ${sortOrder === 'asc' ? 'bg-cyan-500 text-white shadow' : 'text-gray-400 hover:text-white'}`}>
              <FaArrowUp /> 古い順
            </button>
            <button onClick={() => setSortOrder('desc')} className={`px-3 py-1 flex items-center gap-1.5 rounded-full text-sm transition-colors ${sortOrder === 'desc' ? 'bg-cyan-500 text-white shadow' : 'text-gray-400 hover:text-white'}`}>
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