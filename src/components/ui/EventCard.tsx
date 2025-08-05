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
    <Link href={`/events/${id}?category=${encodeURIComponent(navigationCategory || category)}`} className="group ">
      <div className="bg-[#F4F4F4] rounded-2xl overflow-hidden transition-all duration-300 flex flex-row h-[126px] w-[394px] mx-auto transform hover:-translate-y-1 p-2">
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
            <Image
              src="/images/calendar_month.png"
              alt="Calendar"
              width={12}
              height={12}
              className="mr-1 text-[#1C1C1C] flex-shrink-0"
            />
            <span className="text-xs text-[#1C1C1C]">{date}, {time}</span>
          </div>
          
          <div className="flex items-center text-xs text-gray-600">
            <Image
              src="/images/location_on.png"
              alt="Location"
              width={12}
              height={12}
              className="mr-2 text-[#1C1C1C] flex-shrink-0"
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
