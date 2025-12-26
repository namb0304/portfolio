import { memo } from 'react';
import { siteConfig } from '@/config';

type Item = typeof siteConfig.timeline[0];
type TimelineItemProps = {
  item: Item;
};

const HorizontalTimelineItem = memo(({ item }: TimelineItemProps) => {
  return (
    <div className="flex-shrink-0 w-72 md:w-80 p-4 transition-transform duration-300 hover:-translate-y-2">
      <div className="bg-gray-800 rounded-lg shadow-lg p-6 relative h-full flex flex-col">
        <div className="absolute top-full left-1/2 -translate-x-1/2 w-0.5 h-8 bg-gray-700"></div>
        <div className="absolute top-full left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-cyan-500 rounded-full border-4 border-gray-900"></div>
        
        <h3 className="text-lg font-bold text-white mb-2 whitespace-pre-line">{item.title}</h3>
        <p className="text-sm text-gray-400 mb-4">{item.description}</p>
        <div className="flex flex-wrap gap-2 mt-auto">
          {item.tags.map(tag => (
            <span key={tag} className="bg-gray-700 text-cyan-400 text-xs font-semibold px-2 py-0.5 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
});

HorizontalTimelineItem.displayName = 'HorizontalTimelineItem';

export default HorizontalTimelineItem;