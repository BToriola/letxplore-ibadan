"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiCalendar, FiMapPin } from 'react-icons/fi';
import PlaceholderImage from './PlaceholderImage';

export interface EventCardProps {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  price: string | number;
  image: string;
  category: string;
}

const EventCard: React.FC<EventCardProps> = ({
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
    <Link href={`/events/${id}`} className="group">
      <div className="bg-gray-100 rounded-lg overflow-hidden  transition-all duration-300 flex flex-row h-[126px] w-[384px] mx-auto transform hover:-translate-y-1">
        <div className="relative h-full w-[126px] flex-shrink-0 bg-gray-200 overflow-hidden">
          <Image
            src={'/default.svg'}
            alt={title}
            fill
            sizes="126px"
            style={{ objectFit: 'cover' }}
            className="group-hover:scale-110 transition-transform duration-500"
            priority
          />
        </div>
        
        <div className="p-3 flex-1 flex flex-col justify-between overflow-hidden">
          <h3 className="text-xs font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
            {title}
          </h3>
          
          <div className="flex items-center text-xs text-gray-600 mt-1">
            <FiCalendar className="mr-1 text-[#1C1C1C] flex-shrink-0" size={12} />
            <span className="text-xs text-[#1C1C1C]">{date}, {time}</span>
          </div>
          
          <div className="flex items-center text-xs text-gray-600 mt-1">
            <FiMapPin className="mr-1 text-[#1C1C1C] flex-shrink-0" size={12} />
            <span className="text-xs text-[#1C1C1C]">{location}</span>
          </div>
          
          <div className="">
            <span className="text-xs text-[#1C1C1C]">
              {price === 'Free' ? 'Free' : price}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
