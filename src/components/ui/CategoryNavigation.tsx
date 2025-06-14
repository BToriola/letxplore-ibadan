"use client";

import React, { useState } from 'react';

interface CategoryNavigationProps {
  categories: string[];
  activeCategory?: string;
  onCategoryChange?: (category: string) => void;
  variant?: string;
}

const CategoryNavigation: React.FC<CategoryNavigationProps> = ({
  categories,
  activeCategory = "All",
  onCategoryChange = () => {},
}) => {
  const [active, setActive] = useState(activeCategory);
  
  const handleCategoryClick = (category: string) => {
    setActive(category);
    onCategoryChange(category);
  };
  
  return (
    <div className="bg-black/10 backdrop-blur-sm rounded-full p-4 flex overflow-x-auto whitespace-nowrap hide-scrollbar">
      {categories.map((category, index) => (
        <button
          key={index}
          className={`px-4 py-2 text-sm font-medium transition-all flex-shrink-0 ${
            category === active
              ? "text-white border-b-2 border-[#FFA300]" 
              : "text-white hover:bg-white/10 rounded-lg"
          }`}
          onClick={() => handleCategoryClick(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryNavigation;
