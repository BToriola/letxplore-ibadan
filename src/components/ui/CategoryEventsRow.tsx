"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { EventCardProps } from './EventCard';
import CategoryEventCard from './CategoryEventCard';
import { SeeAllArrowIcon, CarouselLeftArrowIcon, CarouselRightArrowIcon } from '../icons/SvgIcons';

interface CategoryEventsRowProps {
  categoryName: string;
  events: EventCardProps[];
  onSeeAll?: (categoryName: string) => void;
}

const CategoryEventsRow: React.FC<CategoryEventsRowProps> = ({ categoryName, events, onSeeAll }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const shouldShowSeeAll = () => {
    const threshold = isMobile ? 2 : 4;
    return events.length > threshold;
  };

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
    <div className="mb-0 md:mb-6 -mx-6 md:-mx-4">
      <div className="flex justify-between items-center mb-2 px-6">
        <h2 className="text-base md:text-2xl font-semibold text-[#1C1C1C] truncate ">{categoryName}</h2>
        {shouldShowSeeAll() && (
          <>
            {onSeeAll ? (
              <button onClick={() => onSeeAll(categoryName)}
                className="text-base font-semibold text-[#0063BF] hover:text-[#0063BF]/[0.8] flex items-center flex-shrink-0">
                See all
                <SeeAllArrowIcon />
              </button>
            ) : (
              <Link href={`/categories/${categoryName.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-base font-semibold text-[#0063BF] hover:text-[#0063BF]/[0.8] flex items-center flex-shrink-0">
                See all
                <SeeAllArrowIcon />
              </Link>
            )}
          </>
        )}
      </div>

      <div className="relative">
        <button
          className={`flex absolute left-6 top-[150px] -translate-y-1/2 z-10  rounded-full p-2 shadow-sm items-center justify-center transition-opacity ${!canScrollLeft ? 'opacity-30 cursor-default' : 'opacity-100'}`}
          onClick={scrollLeft}
          disabled={!canScrollLeft}
        >
          <CarouselLeftArrowIcon />
        </button>

        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-5 scrollbar-hide snap-x scroll-pl-6 scroll-pr-6 equal-height-cards-row"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          onScroll={checkScrollPosition}
        >
          <style jsx>{`
            ::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          <div className="pl-2"></div>

          {events.map((event) => (
            <div
              key={event.id}
              className="flex-shrink-0 snap-start h-full"
            >
              <CategoryEventCard {...event} isEvent={categoryName.toLowerCase() === 'events'} navigationCategory={categoryName} />
            </div>
          ))}

          <div className="pr-4"></div>
        </div>

        <button
          className={`flex absolute right-6 top-[150px] -translate-y-1/2 z-10  rounded-full p-2 shadow-sm items-center justify-center transition-opacity ${!canScrollRight ? 'opacity-30 cursor-default' : 'opacity-100'}`}
          onClick={scrollRight}
          disabled={!canScrollRight}
        >
          <CarouselRightArrowIcon />
        </button>
      </div>
    </div>
  );
};

export default CategoryEventsRow;
