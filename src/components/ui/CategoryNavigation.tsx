"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface CategoryNavigationProps {
  categories: string[];
  activeCategory?: string;
  onCategoryChange?: (category: string) => void;
  variant?: string;
  enableNavigation?: boolean;
}

const CategoryNavigation: React.FC<CategoryNavigationProps> = ({
  categories,
  activeCategory = "All",
  onCategoryChange = () => {},
  variant = "default",
  enableNavigation = false,
}) => {
  const [active, setActive] = useState(activeCategory);
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  // Sync internal state with prop changes and normalize strings
  useEffect(() => {
    const normalizedActiveCategory = activeCategory.trim().toLowerCase();
    setActive(normalizedActiveCategory);
    console.log('useEffect - activeCategory:', activeCategory, 'active:', normalizedActiveCategory);

    // Center the active category on mount or when activeCategory changes
    if (containerRef.current && buttonRefs.current.has(normalizedActiveCategory)) {
      const button = buttonRefs.current.get(normalizedActiveCategory);
      if (button) {
        const container = containerRef.current;
        const buttonRect = button.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        const scrollLeft = button.offsetLeft - (containerRect.width - buttonRect.width) / 2;
        container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
      }
    }
  }, [activeCategory]);

  const handleCategoryClick = (category: string) => {
    // Normalize category for consistent comparison
    const normalizedCategory = category.trim().toLowerCase();

    // Update state immediately
    setActive(normalizedCategory);
    onCategoryChange(category);

    // Log for debugging
    console.log('handleCategoryClick - clicked:', category, 'active:', normalizedCategory);

    // Center the clicked category
    if (containerRef.current && buttonRefs.current.has(normalizedCategory)) {
      const button = buttonRefs.current.get(normalizedCategory);
      if (button) {
        const container = containerRef.current;
        const buttonRect = button.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        const scrollLeft = button.offsetLeft - (containerRect.width - buttonRect.width) / 2;
        container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
      }
    }

    // Perform navigation asynchronously if enabled
    if (enableNavigation) {
      const navigate = () => {
        if (normalizedCategory === "all") {
          router.push('/');
        } else {
          const slug = category
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
          router.push(`/categories/${slug}`, { scroll: false }); // Prevent page scroll reset
        }
      };
      setTimeout(navigate, 0);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`backdrop-blur-sm rounded-full flex md:space-x-8 space-x-4 overflow-x-auto whitespace-nowrap hide-scrollbar ${
        variant === "collapsed"
          ? "bg-black/40 p-4 md:p-5"
          : variant === "hero"
          ? "bg-black/40 p-3 md:p-4"
          : "bg-black/10 p-3 md:p-4"
      }`}
      // Ensure this container doesn't affect sibling layouts
      style={{ display: 'block', width: '100%' }}
    >
      {categories.map((category, index) => {
        const normalizedCategory = category.trim().toLowerCase();
        return (
          <button
            key={index}
            ref={(el) => {
              if (el) {
                buttonRefs.current.set(normalizedCategory, el);
              } else {
                buttonRefs.current.delete(normalizedCategory);
              }
            }}
            className={`px-4 py-2 text-sm font-medium transition-all flex-shrink-0 relative z-10 ${
              normalizedCategory === active
                ? "text-white border-b-2 border-[#FFA300]"
                : "text-white hover:bg-white/20 rounded-lg"
            }`}
            onClick={() => handleCategoryClick(category)}
          >
              {category} 
            </button>
        );
      })}
    </div>
  );
};

export default CategoryNavigation;