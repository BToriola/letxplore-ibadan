"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { EventCardProps } from './EventCard';
import CategoryEventCard from './CategoryEventCard';

interface CategoryEventsRowProps {
  categoryName: string;
  events: EventCardProps[];
  onSeeAll?: (categoryName: string) => void;
}

const CategoryEventsRow: React.FC<CategoryEventsRowProps> = ({ categoryName, events, onSeeAll }) => {
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
        {onSeeAll ? (
          <button onClick={() => onSeeAll(categoryName)}
            className="text-sm font-semibold text-[#0063BF] hover:text-[#0063BF]/[0.8] flex items-center flex-shrink-0">
            See all
            <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <mask id="mask0_199_12740" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="24">
                <rect x="0.875" width="24" height="24" fill="#D9D9D9" />
              </mask>
              <g mask="url(#mask0_199_12740)">
                <path d="M14.875 18L13.475 16.55L17.025 13H4.875V11H17.025L13.475 7.45L14.875 6L20.875 12L14.875 18Z" fill="#0063BF" />
              </g>
            </svg>
          </button>
        ) : (
          <Link href={`/categories/${categoryName.toLowerCase().replace(/\s+/g, '-')}`}
            className="text-sm font-semibold text-[#0063BF] hover:text-[#0063BF]/[0.8] flex items-center flex-shrink-0">
            See all
            <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <mask id="mask0_199_12740" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="24">
                <rect x="0.875" width="24" height="24" fill="#D9D9D9" />
              </mask>
              <g mask="url(#mask0_199_12740)">
                <path d="M14.875 18L13.475 16.55L17.025 13H4.875V11H17.025L13.475 7.45L14.875 6L20.875 12L14.875 18Z" fill="#0063BF" />
              </g>
            </svg>
          </Link>
        )}
      </div>

      <div className="relative">
        <button
          className={`hidden md:flex absolute left-6 top-[150px] -translate-y-1/2 z-10  rounded-full p-2 shadow-sm items-center justify-center transition-opacity ${!canScrollLeft ? 'opacity-30 cursor-default' : 'opacity-100'}`}
          onClick={scrollLeft}
          disabled={!canScrollLeft}
        >
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<mask id="mask0_547_19395" style={{maskType: "alpha"}} maskUnits="userSpaceOnUse" x="0" y="0" width="40" height="40">
<rect width="40" height="40" transform="matrix(-1 0 0 1 40 0)" fill="#D9D9D9"/>
</mask>
<g mask="url(#mask0_547_19395)">
<path d="M18.8748 20L23.9998 25.125L21.6665 27.5L14.1665 20L21.6665 12.5L23.9998 14.875L18.8748 20ZM19.9998 36.6666C22.3054 36.6666 24.4721 36.2291 26.4998 35.3541C28.5276 34.4791 30.2915 33.2916 31.7915 31.7916C33.2915 30.2916 34.479 28.5278 35.354 26.5C36.229 24.4722 36.6665 22.3055 36.6665 20C36.6665 17.6944 36.229 15.5278 35.354 13.5C34.479 11.4722 33.2915 9.70831 31.7915 8.20831C30.2915 6.70831 28.5276 5.52081 26.4998 4.64581C24.4721 3.77081 22.3054 3.33331 19.9998 3.33331C17.6943 3.33331 15.5276 3.77081 13.4998 4.64581C11.4721 5.52081 9.70817 6.70831 8.20817 8.20831C6.70817 9.70831 5.52067 11.4722 4.64567 13.5C3.77067 15.5278 3.33317 17.6944 3.33317 20C3.33317 22.3055 3.77067 24.4722 4.64567 26.5C5.52067 28.5278 6.70817 30.2916 8.20817 31.7916C9.70817 33.2916 11.4721 34.4791 13.4998 35.3541C15.5276 36.2291 17.6943 36.6666 19.9998 36.6666Z" fill="white" fill-opacity="0.5"/>
</g>
</svg>

        </button>

        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-5 scrollbar-hide snap-x scroll-pl-6 scroll-pr-6 -mx-4 equal-height-cards-row"
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
              className="flex-shrink-0 snap-start animate-fadeIn h-full"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <CategoryEventCard {...event} />
            </div>
          ))}

          <div className="pr-4"></div>
        </div>

        <button
          className={`hidden md:flex absolute right-6 top-[150px] -translate-y-1/2 z-10  rounded-full p-2 shadow-sm items-center justify-center transition-opacity ${!canScrollRight ? 'opacity-30 cursor-default' : 'opacity-100'}`}
          onClick={scrollRight}
          disabled={!canScrollRight}
        >
       <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18.1252 17L13.0002 22.125L15.3335 24.5L22.8335 17L15.3335 9.49998L13.0002 11.875L18.1252 17ZM17.0002 33.6666C14.6946 33.6666 12.5279 33.2291 10.5002 32.3541C8.47239 31.4791 6.7085 30.2916 5.2085 28.7916C3.7085 27.2916 2.521 25.5278 1.646 23.5C0.770996 21.4722 0.333496 19.3055 0.333496 17C0.333496 14.6944 0.770996 12.5278 1.646 10.5C2.521 8.4722 3.7085 6.70831 5.2085 5.20831C6.7085 3.70831 8.47239 2.52081 10.5002 1.64581C12.5279 0.770813 14.6946 0.333313 17.0002 0.333313C19.3057 0.333313 21.4724 0.770813 23.5002 1.64581C25.5279 2.52081 27.2918 3.70831 28.7918 5.20831C30.2918 6.70831 31.4793 8.4722 32.3543 10.5C33.2293 12.5278 33.6668 14.6944 33.6668 17C33.6668 19.3055 33.2293 21.4722 32.3543 23.5C31.4793 25.5278 30.2918 27.2916 28.7918 28.7916C27.2918 30.2916 25.5279 31.4791 23.5002 32.3541C21.4724 33.2291 19.3057 33.6666 17.0002 33.6666Z" fill="white"/>
</svg>

        </button>
      </div>
    </div>
  );
};

export default CategoryEventsRow;
