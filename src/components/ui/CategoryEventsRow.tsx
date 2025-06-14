"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { EventCardProps } from './EventCard';
import CategoryEventCard from './CategoryEventCard';

interface CategoryEventsRowProps {
  categoryName: string;
  events: EventCardProps[];
}

const CategoryEventsRow: React.FC<CategoryEventsRowProps> = ({ categoryName, events }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  
  const checkScrollPosition = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft + container.clientWidth < container.scrollWidth - 5 
      );
    }
  };

  useEffect(() => {
    checkScrollPosition();
    window.addEventListener('resize', checkScrollPosition);
    return () => {
      window.removeEventListener('resize', checkScrollPosition);
    };
  }, []);

  const scrollLeft = () => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };
  
  if (events.length === 0) return null;
  
  return (
    <div className="mb-16">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-[#1C1C1C] truncate pr-2">{categoryName}</h2>
        <Link href={`/categories/${categoryName.toLowerCase().replace(/\s+/g, '-')}`} 
              className="text-sm font-medium text-[#0063BF] hover:text-[#0063BF]/[0.8] flex items-center flex-shrink-0">
          See all
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
      
      <div className="relative">
        <button 
          className={`hidden md:flex absolute left-4 top-[110px] -translate-y-1/2 z-10 bg-white hover:bg-gray-100 rounded-full p-2 shadow-sm items-center justify-center transition-opacity ${!canScrollLeft ? 'opacity-30 cursor-default' : 'opacity-100'}`}
          onClick={scrollLeft}
          disabled={!canScrollLeft}
        >
          <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <div 
          ref={scrollContainerRef} 
          className="flex overflow-x-auto pb-5 scrollbar-hide snap-x scroll-pl-6 scroll-pr-6 -mx-4 equal-height-cards-row" 
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          onScroll={checkScrollPosition}
        >
          <style jsx>{`
            ::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          <div className="pl-2"></div>
          
          {events.map((event, index) => (
            <div 
              key={event.id} 
              className="flex-shrink-0 w-[240px] sm:w-[280px] mx-2 snap-start animate-fadeIn h-full" 
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <CategoryEventCard {...event} />
            </div>
          ))}
          
          <div className="pr-4"></div>
        </div>
        
        <button 
          className={`hidden md:flex absolute right-4 top-[110px] -translate-y-1/2 z-10 bg-white hover:bg-gray-100 rounded-full p-2 shadow-sm items-center justify-center transition-opacity ${!canScrollRight ? 'opacity-30 cursor-default' : 'opacity-100'}`}
          onClick={scrollRight}
          disabled={!canScrollRight}
        >
          <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CategoryEventsRow;
