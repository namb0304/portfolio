"use client";

import React, { useState, useMemo } from 'react';
import { siteConfig } from '@/config';
import { FaArrowUp, FaArrowDown, FaStream, FaGripLines } from 'react-icons/fa';
import HorizontalTimelineItem from './HorizontalTimelineItem';
import TimelineItem from './TimelineItem';

const Timeline: React.FC = () => {
  const { timeline: historyItems } = siteConfig;
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
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

  const horizontalItems = useMemo(() => {
    return [...sortedAndFilteredItems].sort((a, b) => {
      const dateA = new Date(a.date.replace('年', '-').replace('月', ''));
      const dateB = new Date(b.date.replace('年', '-').replace('月', ''));
      return dateA.getTime() - dateB.getTime();
    });
  }, [sortedAndFilteredItems]);

  return (
    <section id="timeline" className="py-20 bg-gray-900 overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-6">Activities</h2>
        <p className="text-center text-gray-400 mb-12">私の成長の軌跡</p>
        
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
              <button onClick={() => setSortOrder('desc')} disabled={layout === 'horizontal'} className={`px-3 py-1 flex items-center gap-1.5 rounded-full text-sm transition-colors ${sortOrder === 'desc' && layout === 'vertical' ? 'bg-cyan-500 text-white shadow' : 'text-gray-400'} ${layout === 'horizontal' ? 'opacity-50 cursor-not-allowed' : ''}`}>
                <FaArrowDown /> 新しい順
              </button>
              <button onClick={() => setSortOrder('asc')} disabled={layout === 'horizontal'} className={`px-3 py-1 flex items-center gap-1.5 rounded-full text-sm transition-colors ${sortOrder === 'asc' && layout === 'vertical' ? 'bg-cyan-500 text-white shadow' : 'text-gray-400'} ${layout === 'horizontal' ? 'opacity-50 cursor-not-allowed' : ''}`}>
                <FaArrowUp /> 古い順
              </button>
            </div>
            <div className="flex items-center gap-1 p-1 bg-gray-800 rounded-full">
              <button onClick={() => setLayout('horizontal')} className={`p-2 rounded-full transition-colors ${layout === 'horizontal' ? 'bg-cyan-500 text-white' : 'text-gray-400 hover:text-white'}`}>
                <FaGripLines />
              </button>
              <button onClick={() => setLayout('vertical')} className={`p-2 rounded-full transition-colors ${layout === 'vertical' ? 'bg-cyan-500 text-white' : 'text-gray-400 hover:text-white'}`}>
                <FaStream />
              </button>
            </div>
          </div>
        </div>
        
        {layout === 'horizontal' ? (
          <div className="w-full overflow-x-auto pb-8 scrollbar-thin scrollbar-thumb-cyan-500/50 scrollbar-track-gray-800">
            <div className="relative flex items-end h-96 px-4">
              <div className="absolute bottom-10 left-0 w-full h-0.5 bg-gray-700"></div>
              {horizontalItems.map((item, index) => (
                <div key={index} className="relative" style={{ marginBottom: `${index * 2}rem` }}>
                  <div className="absolute top-full text-center w-full mt-10 text-sm text-gray-400">{item.date}</div>
                  <HorizontalTimelineItem item={item} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="relative max-w-4xl mx-auto">
            <div className="border-l-2 border-gray-700 absolute h-full top-0 left-4 md:left-1/2 md:-translate-x-1/2"></div>
            {sortedAndFilteredItems.map((item, index) => (
              <TimelineItem key={index} item={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Timeline;