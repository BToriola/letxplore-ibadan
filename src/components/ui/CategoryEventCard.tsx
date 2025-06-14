"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiMapPin, FiDollarSign, FiStar } from 'react-icons/fi';
import { EventCardProps } from './EventCard';

const CategoryEventCard: React.FC<EventCardProps> = ({
  id,
  title,
  date,
  time,
  location,
  price,
  image,
  category
}) => {
  return (
    <Link href={`/events/${id}`} className="group h-full">
      <div className="bg-[#F4F4F4] rounded-lg overflow-hidden transition-all duration-300 w-full transform hover:-translate-y-1 equal-height-cards">
        {/* Image at the top */}
        <div className="relative h-[180px] w-full bg-gray-200 overflow-hidden flex-shrink-0">
          <Image
            src={'/default.svg'}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 280px"
            style={{ objectFit: 'cover' }}
            className="group-hover:scale-110 transition-transform duration-500"
            priority
          />
        </div>
        
        {/* Content below the image */}
        <div className="p-4 flex-grow flex flex-col">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2 truncate">
            {title}
          </h3>
          
          <div className="space-y-2 mt-auto">
            <div className="flex items-center text-sm text-gray-600">
              <div className="flex items-center text-yellow-400 mr-2">
                <FiStar className="fill-current" size={14} />
                <FiStar className="fill-current" size={14} />
                <FiStar className="fill-current" size={14} />
                <FiStar className="fill-current" size={14} />
                <FiStar className="fill-current text-gray-300" size={14} />
              </div>
              <span className="text-gray-700 font-medium">4.5</span>
              <span className="text-gray-500 ml-1">({234} Reviews)</span>
            </div>
            
            <div className="flex items-center text-sm text-gray-600">
              <FiMapPin className="mr-2 text-gray-500 flex-shrink-0" size={14} />
              <span className="truncate">{location}</span>
            </div>
            
            <div className="flex items-center text-sm text-gray-600">
              <span className="text-gray-900 font-medium">{category}<span className="mx-2 text-gray-400">•</span><span className="text-green-600">Open</span><span className="mx-2 text-gray-400">•</span>{price === 'Free' ? 'Free' : `${price}`}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CategoryEventCard;
