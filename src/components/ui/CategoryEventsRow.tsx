"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { EventCardProps } from './EventCard';
import CategoryEventCard from './CategoryEventCard';
import { SeeAllArrowIcon, CarouselLeftArrowIcon, CarouselRightArrowIcon } from '../icons/SvgIcons';
import { useSearch } from '../../contexts/SearchContext';

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
  const router = useRouter();

  const { searchResults, isSearching } = useSearch();

  console.log('CategoryEventsRow mounted with category:', categoryName);
  console.log('Events for this category:', events);

  // If we're searching and this is the default category, show search results instead
  const displayEvents = isSearching && categoryName === 'Events' ? searchResults : events;

  const handleSeeAllClick = () => {
    const slug = categoryName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    router.push(`/categories/${slug}`, { scroll: false });
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const shouldShowSeeAll = () => {
    // Don't show "See all" when displaying search results
    if (isSearching && categoryName === 'Events') return false;
    const threshold = isMobile ? 2 : 4;
    return displayEvents.length > threshold;
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

  if (displayEvents.length === 0) return null;

  return (
    <div className="px-3 mb-0 md:px-6">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-base md:text-2xl font-semibold text-[#1C1C1C] truncate ">{categoryName}</h2>
        {shouldShowSeeAll() && (
          <>
            {onSeeAll ? (
              <button onClick={handleSeeAllClick}
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
        {displayEvents.length > 1 && (
          <button
            className={`flex absolute left-0 top-[150px] -translate-y-1/2 z-10  rounded-full p-2 shadow-sm items-center justify-center transition-opacity ${!canScrollLeft ? 'opacity-30 cursor-default' : 'opacity-100'}`}
            onClick={scrollLeft}
            disabled={!canScrollLeft}
          >
            <CarouselLeftArrowIcon />
          </button>
        )}

        <div
          ref={scrollContainerRef}
          className={`flex ${displayEvents.length === 1 ? 'justify-start' : 'gap-6'} ${displayEvents.length > 1 ? 'gap-6' : ''} overflow-x-auto pb-5 scrollbar-hide snap-x`}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          onScroll={checkScrollPosition}
        >
          <style jsx>{`
            ::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          {displayEvents.map((event) => (
            <div
              key={event.id}
              className="flex-shrink-0 snap-start"
            >
              <CategoryEventCard {...event} isEvent={categoryName.toLowerCase() === 'events'} navigationCategory={categoryName} />
            </div>
          ))}
        </div>

        {displayEvents.length > 1 && (
          <button
            className={`flex absolute right-0 top-[150px] -translate-y-1/2 z-10  rounded-full p-2 shadow-sm items-center justify-center transition-opacity ${!canScrollRight ? 'opacity-30 cursor-default' : 'opacity-100'}`}
            onClick={scrollRight}
            disabled={!canScrollRight}
          >
            <CarouselRightArrowIcon />
          </button>
        )}
      </div>
    </div>
  );
};

export default CategoryEventsRow;
