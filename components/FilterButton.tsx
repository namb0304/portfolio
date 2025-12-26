import React, { memo } from 'react';

interface FilterButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const FilterButton = memo<FilterButtonProps>(({ label, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded-full text-sm font-semibold transition-colors ${
        isActive
          ? 'bg-cyan-500 text-white'
          : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
      }`}
    >
      {label}
    </button>
  );
});

FilterButton.displayName = 'FilterButton';

export default FilterButton;
