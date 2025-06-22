"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

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

const EventCard: React.FC<EventCardProps> = ({
  id,
  title,
  date,
  time,
  location,
  price,
}) => {
  return (
    <Link href={`/events/${id}`} className="group ">
      <div className="bg-gray-100 rounded-lg overflow-hidden transition-all duration-300 flex flex-row h-[126px] w-[384px] mx-auto transform hover:-translate-y-1 p-2">
        <div className="relative h-full w-[122px] flex-shrink-0 bg-gray-200 overflow-hidden rounded-lg">
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
        
        <div className="p-3 ml-2 flex-1 flex flex-col justify-between overflow-hidden">
          <h3 className="text-base font-semibold text-[#1c1c1c] truncate">
            {title}
          </h3>
          
          <div className="flex items-center text-xs text-gray-600 mt-1">
            <Image
              src="/images/calendar_month.png"
              alt="Calendar"
              width={12}
              height={12}
              className="mr-1 text-[#1C1C1C] flex-shrink-0"
            />
            <span className="text-xs text-[#1C1C1C]">{date}, {time}</span>
          </div>
          
          <div className="flex items-center text-xs text-gray-600 mt-1">
            <Image
              src="/images/location_on.png"
              alt="Location"
              width={12}
              height={12}
              className="mr-1 text-[#1C1C1C] flex-shrink-0"
            />
            <span className="text-xs text-[#1C1C1C]">{location}</span>
          </div>
          
          <div className="flex items-center">
            <Image
              src="/images/local_activity.png"
              alt="Price"
              width={12}
              height={12}
              className="mr-1 text-[#1C1C1C] flex-shrink-0"
            />
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
