"use client";

import React from 'react';

interface FilterOption {
  value: string;
  label: string;
}

interface FilterBarProps {
  dateOptions: FilterOption[];
  priceOptions: FilterOption[];
  sortOptions: FilterOption[];
  onDateFilterChange?: (value: string) => void;
  onPriceFilterChange?: (value: string) => void;
  onSortChange?: (value: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  dateOptions,
  priceOptions,
  sortOptions,
  onDateFilterChange = () => {},
  onPriceFilterChange = () => {},
  onSortChange = () => {},
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-3 justify-center">
      {/* Date Filter */}
      <div className="relative">
        <select 
          className="bg-white/10 text-white rounded-lg px-4 py-2 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-white/30 w-full"
          onChange={(e) => onDateFilterChange(e.target.value)}
        >
          <option value="">Filter by date</option>
          {dateOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      
      {/* Price Filter */}
      <div className="relative">
        <select 
          className="bg-white/10 text-white rounded-lg px-4 py-2 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-white/30 w-full"
          onChange={(e) => onPriceFilterChange(e.target.value)}
        >
          <option value="">Filter by price</option>
          {priceOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      
      {/* Sort By */}
      <div className="relative">
        <select 
          className="bg-white/10 text-white rounded-lg px-4 py-2 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-white/30 w-full"
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="">Sort by</option>
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
