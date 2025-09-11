import { siteConfig } from '@/config';

type Item = typeof siteConfig.timeline[0];
type TimelineItemProps = {
  item: Item;
};

const TimelineItem = ({ item }: TimelineItemProps) => {
  return (
    <div className="mb-8 flex justify-between md:flex-row-reverse items-start w-full left-timeline">
      <div className="order-1 w-5/12 hidden md:block"></div>
      <div className="z-20 flex items-center order-1 bg-gray-800 shadow-xl w-8 h-8 rounded-full">
        <div className="mx-auto bg-cyan-500 w-3 h-3 rounded-full"></div>
      </div>
      <div className="order-1 bg-gray-800 rounded-lg shadow-xl w-full md:w-5/12 px-6 py-4">
        <p className="text-sm text-gray-400">{item.date}</p>
        <h3 className="mb-3 font-bold text-white text-xl">{item.title}</h3>
        <p className="text-sm leading-snug tracking-wide text-gray-300">
          {item.description}
        </p>
        <div className="flex flex-wrap gap-2 mt-4">
          {item.tags.map(tag => (
            <span key={tag} className="bg-gray-700 text-cyan-400 text-xs font-semibold px-2.5 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimelineItem;