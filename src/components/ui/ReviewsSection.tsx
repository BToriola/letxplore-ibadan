"use client";

import React from 'react';
import Image from 'next/image';
import { Star } from '../icons/SvgIcons';

interface Review {
  id: string;
  userName: string;
  timeAgo: string;
  rating: number;
  title: string;
  description: string;
  image: string;
  userAvatar: string;
}

interface ReviewsSectionProps {
  reviews?: Review[];
}

const defaultReviews: Review[] = [
  {
    id: '1',
    userName: 'Ayobami',
    timeAgo: '16 minutes ago',
    rating: 5,
    title: 'Cafe Chrysalis Restaurant',
    description: "Let'sExplore have the best and surest location to have fun. And the website is so easy to use. Let'sExplore...",
    image: '/images/default/review1.jpg',
    userAvatar: '/images/user.png'
  },
  {
    id: '2',
    userName: 'Ayobami',
    timeAgo: '16 minutes ago',
    rating: 5,
    title: 'Cafe Chrysalis Restaurant',
    description: "Let'sExplore have the best and surest location to have fun. And the website is so easy to use. Let'sExplore...",
    image: '/images/default/review2.jpg',
    userAvatar: '/images/user.png'
  },
  {
    id: '3',
    userName: 'Ayobami',
    timeAgo: '16 minutes ago',
    rating: 5,
    title: 'Cafe Chrysalis Restaurant',
    description: "Let'sExplore have the best and surest location to have fun. And the website is so easy to use. Let'sExplore...",
    image: '/images/default/review3.jpg',
    userAvatar: '/images/user.png'
  },
  {
    id: '4',
    userName: 'Ayobami',
    timeAgo: '16 minutes ago',
    rating: 5,
    title: 'Cafe Chrysalis Restaurant',
    description: "Let'sExplore have the best and surest location to have fun. And the website is so easy to use. Let'sExplore...",
    image: '/images/default/review4.jpg',
    userAvatar: '/images/user.png'
  },
  {
    id: '5',
    userName: 'Ayobami',
    timeAgo: '16 minutes ago',
    rating: 5,
    title: 'Cafe Chrysalis Restaurant',
    description: "Let'sExplore have the best and surest location to have fun. And the website is so easy to use. Let'sExplore...",
    image: '/images/default/review5.jpg',
    userAvatar: '/images/user.png'
  },
  {
    id: '6',
    userName: 'Ayobami',
    timeAgo: '16 minutes ago',
    rating: 5,
    title: 'Cafe Chrysalis Restaurant',
    description: "Let'sExplore have the best and surest location to have fun. And the website is so easy to use. Let'sExplore...",
    image: '/images/default/review6.jpg',
    userAvatar: '/images/user.png'
  }
];

const ReviewsSection: React.FC<ReviewsSectionProps> = ({ reviews = defaultReviews }) => {
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star 
          key={i} 
          width={14} 
          height={14} 
          className={i < rating ? 'text-[#FFA300]' : 'text-gray-300'} 
        />
      );
    }
    return <div className="flex items-center space-x-1">{stars}</div>;
  };

  return (
    <div className="bg-[#F4F4F4] -px-2 md:px-6 pb-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 pt-10">
          <h2 className="text-2xl font-semibold text-[#1C1C1C] mb-2" style={{ fontFamily: 'PrimeraTrial-Medium, sans-serif' }}>Reviews</h2>
          <p className="text-[#1c1c1c] text-base">Hear from our community</p>
        </div>

        {/* Reviews Grid - Desktop grid, Mobile horizontal scroll */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white rounded-2xl p-4 backdrop-blur-[20px]">
              <div className="flex items-center mb-4">
                <div className="relative w-10 h-10 mr-3">
                  <Image
                    src={review.userAvatar}
                    alt={review.userName}
                    fill
                    className="rounded-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/images/user.png';
                    }}
                  />
                </div>
                <div>
                  <p className="font-medium text-[#1C1C1C] text-xs">{review.userName} wrote a review</p>
                  <p className="text-[#1C1C1C] text-xs">{review.timeAgo}</p>
                </div>
              </div>

              {/* Review Image */}
              <div className="relative w-full h-36 mb-4 rounded-lg overflow-hidden">
                <Image
                  src={'/default.svg'}
                  alt={review.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 280px"
                  style={{ objectFit: 'cover' }}
                  className="hover:scale-110 transition-transform duration-500"
                  priority
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/default.svg';
                  }}
                />
              </div>

              {/* Rating */}
              <div className="flex items-center mb-2">
                {renderStars(review.rating)}
              </div>

              {/* Review Content */}
              <h3 className="font-semibold text-[#1C1C1C] text-base mb-2">{review.title}</h3>
              <p className="text-[#1C1C1C] text-xs mb-3 line-clamp-2">{review.description}</p>
              
              {/* Read More Link */}
              <button className="text-[#0063BF] text-xs font-semibold hover:underline">
                Read more
              </button>
            </div>
          ))}
        </div>

        {/* Mobile Horizontal Scroll */}
        <div className="md:hidden">
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x scroll-pl-6 scroll-pr-6">
            <style jsx>{`
              ::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            <div className="pl-2"></div>
            {reviews.map((review) => (
              <div key={review.id} className="bg-white rounded-2xl p-4 backdrop-blur-[20px] flex-shrink-0 w-[280px] snap-start">
                <div className="flex items-center mb-4">
                  <div className="relative w-8 h-8 mr-3">
                    <Image
                      src={review.userAvatar}
                      alt={review.userName}
                      fill
                      className="rounded-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/images/user.png';
                      }}
                    />
                  </div>
                  <div>
                    <p className="font-medium text-[#1C1C1C] text-xs">{review.userName} wrote a review</p>
                    <p className="text-[#1C1C1C] text-xs">{review.timeAgo}</p>
                  </div>
                </div>

                {/* Review Image */}
                <div className="relative w-full h-32 mb-3 rounded-lg overflow-hidden">
                  <Image
                    src={'/default.svg'}
                    alt={review.title}
                    fill
                    sizes="280px"
                    style={{ objectFit: 'cover' }}
                    className="hover:scale-110 transition-transform duration-500"
                    priority
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/default.svg';
                    }}
                  />
                </div>

                {/* Rating */}
                <div className="flex items-center mb-2">
                  {renderStars(review.rating)}
                </div>

                {/* Review Content */}
                <h3 className="font-semibold text-[#1C1C1C] text-sm mb-2">{review.title}</h3>
                <p className="text-[#1C1C1C] text-xs mb-3 line-clamp-2">{review.description}</p>
                
                {/* Read More Link */}
                <button className="text-[#0063BF] text-xs font-semibold hover:underline">
                  Read more
                </button>
              </div>
            ))}
            <div className="pr-2"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsSection;
