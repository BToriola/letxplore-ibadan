"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
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
