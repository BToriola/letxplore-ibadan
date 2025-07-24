"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiMapPin, FiStar } from 'react-icons/fi';
import { EventCardProps } from './EventCard';

type CategoryEventCardProps = EventCardProps;

const CategoryEventCard: React.FC<CategoryEventCardProps> = ({
  id,
  title,
  location,
  price,
  category
}) => {
  return (
    <Link href={`/events/${id}`} className="group h-full">
      <div className="bg-[#F4F4F4] p-2 rounded-lg overflow-hidden transition-all duration-300 w-[240px] h-[330px] lg:w-[320px] lg:h-[342px] equal-height-cards flex flex-col">
        <div className="relative rounded-lg h-[180px] w-full bg-gray-200 overflow-hidden flex-shrink-0">
          <Image
            src={'/default.svg'}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 280px"
            style={{ objectFit: 'cover' }}
            className="group-hover:scale-110 transition-transform duration-500"
            priority
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/default.svg';
            }}
          />
        </div>
        
        <div className="py-4 pl-1 flex-grow flex flex-col">
          <h3 className="text-base font-semibold text-[#1c1c1c]  transition-colors mb-2 truncate">
            {title}
          </h3>
          
          <div className="space-y-2 mt-auto">
            <div className="flex items-center text-sm text-gray-600">
              <div className="flex items-center text-[#FFA300] space-x-1 mr-2">
                <FiStar className="fill-current" size={14} />
                <FiStar className="fill-current" size={14} />
                <FiStar className="fill-current" size={14} />
                <FiStar className="fill-current" size={14} />
                <FiStar className="fill-current text-gray-300" size={14} />
              </div>
              <span className="text-gray-700 text-xs font-medium">4.5</span>
              <span className="text-gray-500 text-xs ml-1">({234} Reviews)</span>
            </div>
            
            <div className="flex items-center text-xs text-gray-600">
              <FiMapPin className="mr-2 text-gray-500 flex-shrink-0" size={14} />
              <span className="truncate">{location}</span>
            </div>
            
            <div className="flex items-center text-xs text-gray-600">
              <span className="text-gray-900 font-medium">{category}<span className="mx-2 text-gray-400">•</span><span className="text-green-600">Open</span><span className="mx-2 text-gray-400">•</span>{price === 'Free' ? 'Free' : `${price}`}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CategoryEventCard;
