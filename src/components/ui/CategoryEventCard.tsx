"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, StarHalf, StarEmpty, Location, ReserveIcon } from '../icons/SvgIcons';
import { EventCardProps } from './EventCard';

type CategoryEventCardProps = EventCardProps & {
  rating?: number;
  reviewCount?: number;
  eventDate?: string;
  eventTime?: string;
  isEvent?: boolean;
};

const CategoryEventCard: React.FC<CategoryEventCardProps> = ({
  id,
  title,
  location,
  price,
  category,
  rating = 3.5,
  reviewCount = 234,
  eventDate = "Fri, May 10th",
  eventTime = "7PM",
  isEvent = false
}) => {
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} width={14} height={14} />);
    }

    if (hasHalfStar) {
      stars.push(<StarHalf key="half" width={14} height={14} />);
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(<StarEmpty key={`empty-${i}`} width={14} height={14} />);
    }

    return stars;
  };
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
          <h3 className="text-base font-semibold text-[#1c1c1c]  transition-colors  truncate pb-2">
            {title}
          </h3>
          
          <div className="space-y-3 ">
            {isEvent || category?.toLowerCase() === 'event' ? (
              <div className="flex items-center text-xs text-gray-600">
                <ReserveIcon className="mr-2 text-[#0063BF] flex-shrink-0" width={14} height={14} />
                <span className="text-gray-700 text-xs font-medium">{eventDate}, {eventTime}</span>
              </div>
            ) : (
              <div className="flex items-center text-xs text-gray-600">
                <div className="flex items-center text-[#FFA300] space-x-1 mr-2">
                  {renderStars(rating)}
                </div>
                <span className="text-gray-700 text-xs font-medium">{rating}</span>
                <span className="text-gray-500 text-xs ml-1">({reviewCount} Reviews)</span>
              </div>
            )}
            
            <div className="flex items-center text-xs text-gray-600">
              <Location className="mr-2 text-gray-500 flex-shrink-0" width={14} height={14} />
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
