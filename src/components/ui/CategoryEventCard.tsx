"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, StarHalf, StarEmpty, Location, ReserveIconGray, Local } from '../icons/SvgIcons';
import { EventCardProps } from './EventCard';

type CategoryEventCardProps = EventCardProps & {
  rating?: number;
  reviewCount?: number;
  eventDate?: string;
  eventTime?: string;
  isEvent?: boolean;
  navigationCategory?: string; // The category from the current page/section
};

const CategoryEventCard: React.FC<CategoryEventCardProps> = ({
  id,
  title,
  location,
  price,
  image,
  category,
  rating = 3.5,
  reviewCount = 234,
  eventDate = "Fri, May 10th",
  eventTime = "7PM",
  isEvent = false,
  navigationCategory
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
    <Link href={`/${encodeURIComponent(navigationCategory || category)}/${id}/${encodeURIComponent(title.toLowerCase().replace(/\s+/g, '-'))}`} className="group block">
      <div className="bg-[#F4F4F4] p-2 rounded-2xl overflow-hidden transition-all duration-300 w-[256px] h-[342px] md:w-[280px] md:h-[342px] flex flex-col">
        <div className="relative rounded-lg h-[180px] w-full bg-gray-200 overflow-hidden flex-shrink-0">
          <Image
            src={image || '/default.svg'}
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

        <div className="pt-6 pl-1 flex flex-col justify-between">
          <h3 className="text-base font-semibold text-[#1c1c1c] transition-colors leading-tight pb-2 flex items-start">
            <span className="line-clamp-2">{title}</span>
          </h3>

          <div className="flex-1 flex flex-col justify-between space-y-2">
            <div className="space-y-2">
              {isEvent || category?.toLowerCase() === 'event' ? (
                <div className="flex items-center text-xs text-gray-600 space-x-1">
                  <ReserveIconGray className="flex-shrink-0" width={16} height={16} />
                  <span className="text-[#1c1c1c] text-xs font-medium truncate">{eventDate}, {eventTime}</span>
                </div>
              ) : (
                <div className="flex items-center text-xs text-gray-600">
                  <div className="flex items-center text-[#FFA300] space-x-1 mr-2">
                    {renderStars(rating)}
                  </div>
                  <span className="text-gray-700 text-xs font-medium">{rating}</span>
                  <span className="text-gray-500 text-xs ml-1 truncate">({reviewCount} Reviews)</span>
                </div>
              )}

              <div className="flex items-center space-x-1 text-xs text-gray-600">
                <Location className="flex-shrink-0" width={16} height={16} />
                <span className="truncate text-[#1c1c1c]">{location}</span>
              </div>
            </div>

            <div className="flex items-center text-xs text-gray-600">
              {isEvent || category?.toLowerCase() === 'event' ? (
                <div className="flex items-center space-x-1">
                  <Local className="flex-shrink-0" width={16} height={16} />
                  <span className="text-[#1c1c1c] font-medium truncate">{price === 'Free' ? 'Free' : `${price}`}</span>
                </div>
              ) : (
                <span className="text-gray-900 font-medium truncate">{category}<span className="mx-2 text-gray-400">•</span><span className="text-green-600">Open</span><span className="mx-2 text-gray-400">•</span>{price === 'Free' ? 'Free' : `${price}`}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CategoryEventCard;
