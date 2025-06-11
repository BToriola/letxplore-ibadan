"use client";

import React from 'react';
import Link from 'next/link';
import EventCard, { EventCardProps } from './EventCard';

interface CategoryEventsRowProps {
  categoryName: string;
  events: EventCardProps[];
}

const CategoryEventsRow: React.FC<CategoryEventsRowProps> = ({ categoryName, events }) => {
  if (events.length === 0) return null;
  
  return (
    <div className="mb-16">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-[#1C1C1C]">{categoryName}</h2>
        <Link href={`/categories/${categoryName.toLowerCase().replace(/\s+/g, '-')}`} 
              className="text-sm font-medium text-blue-500 hover:text-blue-700 flex items-center">
          See all
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
      
      {/* Swipeable horizontal scroll */}
      <div className="relative">
        {/* Left scroll button */}
        <button 
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-100 rounded-full p-3 shadow-md flex items-center justify-center"
          onClick={(e) => {
            const container = e.currentTarget.nextElementSibling;
            if (container) {
              (container as HTMLElement).scrollBy({ left: -400, behavior: 'smooth' });
            }
          }}
        >
          <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        {/* Events container */}
        <div className="flex overflow-x-auto pb-5 scrollbar-hide snap-x scroll-pl-6 scroll-pr-6" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <style jsx>{`
            ::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          {/* Add initial padding */}
          <div className="pl-4"></div>
          
          {events.map((event, index) => (
            <div 
              key={event.id} 
              className="flex-shrink-0 w-[384px] mx-2 snap-start animate-fadeIn" 
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <EventCard {...event} />
            </div>
          ))}
          
          {/* Add final padding */}
          <div className="pr-4"></div>
        </div>
        
        {/* Right scroll button */}
        <button 
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-100 rounded-full p-3 shadow-md flex items-center justify-center"
          onClick={(e) => {
            const container = e.currentTarget.previousElementSibling;
            if (container) {
              (container as HTMLElement).scrollBy({ left: 400, behavior: 'smooth' });
            }
          }}
        >
          <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CategoryEventsRow;
