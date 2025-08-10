"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Location, Calendar, Local } from '@/components/icons/SvgIcons';

export interface EventCardProps {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  price: string | number;
  image: string;
  category: string;
  description?: string; // Optional description field for event details
}

interface EventCardComponentProps extends EventCardProps {
  navigationCategory?: string; // The category from the current page/section
}

const EventCard: React.FC<EventCardComponentProps> = ({
  id,
  title,
  date,
  time,
  location,
  price,
  category,
  navigationCategory,
}) => {
  return (
    <Link href={`/events/${id}?category=${encodeURIComponent(navigationCategory || category)}`} className="group block w-full">
      <div className="bg-[#F4F4F4] rounded-2xl overflow-hidden transition-all duration-300 flex flex-row h-[126px] w-full transform hover:-translate-y-1 p-2">
        <div className="relative h-full w-[122px] flex-shrink-0 bg-[#F4F4F4] overflow-hidden rounded-lg">
          <Image
            src={'/default.svg'}
            alt={title}
            fill
            sizes="122px"
            style={{ objectFit: 'cover' }}
            className="group-hover:scale-110 transition-transform duration-500"
            priority
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/default.svg';
            }}
          />
        </div>
        
        <div className="px-2 ml-2 flex-1 flex flex-col justify-between overflow-hidden py-1">
          <h3 className="text-base font-semibold text-[#1c1c1c] truncate">
            {title}
          </h3>
          
          <div className="flex items-center text-xs text-gray-600">
            <Calendar width={12} height={12} className="text-gray-500 flex-shrink-0" />
            <span className="text-xs text-[#1C1C1C] ml-2">{date}, {time}</span>
          </div>
          
          <div className="flex items-center text-xs text-gray-600">
            <Location width={12} height={12} className="text-gray-500 flex-shrink-0" />
            <span className="text-xs text-[#1C1C1C] ml-2">{location}</span>
          </div>
          
          <div className="flex items-center">
            <Local width={12} height={12} className="text-gray-500 flex-shrink-0" />
            <span className="text-xs text-[#1C1C1C] ml-2">
              {price === 'Free' ? 'Free' : price}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
