"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

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
  variant = "default",
}) => {
  const [active, setActive] = useState(activeCategory);
  const router = useRouter();
  
  // Sync internal state with prop changes
  useEffect(() => {
    setActive(activeCategory);
  }, [activeCategory]);
  
  const handleCategoryClick = (category: string) => {
    setActive(category);
    onCategoryChange(category);
    
    // Navigate to category route if not "All"
    if (category === "All") {
      router.push('/');
    } else {
      const slug = category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      router.push(`/categories/${slug}`);
    }
  };
  
  return (
    <div className={`backdrop-blur-sm rounded-full flex md:space-x-8 space-x-4 overflow-x-auto whitespace-nowrap hide-scrollbar ${
      variant === "collapsed" ? "bg-black/40 p-4 md:p-5" : 
      variant === "hero" ? "bg-black/40 p-3 md:p-4" : 
      "bg-black/10 p-3 md:p-4"
    }`}>
      {categories.map((category, index) => (
        <button
          key={index}
          className={`px-4 py-2 text-sm font-medium transition-all flex-shrink-0 relative z-10 ${
            category === active
              ? "text-white border-b-2 border-[#FFA300]" 
              : "text-white hover:bg-white/20 rounded-lg"
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
