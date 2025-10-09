"use client";

import React from 'react';
import Image from 'next/image';
import { Star } from '../icons/SvgIcons';
import { Comment } from '@/services/api';
import { Post } from '@/services/api';

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
  groupedPosts?: Record<string, Post[]>;
  postId?: string;
}

// Extended comment shape when we attach post metadata during fetch
type ApiComment = Comment & {
  postId?: string;
  postTitle?: string;
  postImage?: string;
};

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

const ReviewsSection: React.FC<ReviewsSectionProps> = ({ reviews, groupedPosts = {}, postId }) => {
  const [apiComments, setApiComments] = React.useState<ApiComment[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [hasInitialized, setHasInitialized] = React.useState(false);

  const getPostIds = React.useCallback(() => {
    if (postId) {
      return [postId];
    }
    
    const allPosts: Post[] = [];
    Object.values(groupedPosts).forEach(categoryPosts => {
      allPosts.push(...categoryPosts);
    });
    
    if (allPosts.length > 0) {
      const dynamicIds = allPosts.slice(0, 6).map(post => post.id);
      console.log('Using dynamic post IDs from API:', dynamicIds);
      return dynamicIds;
    } else {
      const fallbackIds = ['-OT8-GL2izod96I5gI8x', '-OUqHJR5qKONacoOlCwE'];
      console.log('No API posts available, using fallback IDs:', fallbackIds);
      return fallbackIds;
    }
  }, [groupedPosts, postId]);

  React.useEffect(() => {
    if (hasInitialized) {
      return;
    }
        
    const fetchAllComments = async () => {      
      try {
        const postIds = getPostIds();
        const allComments: Comment[] = [];


        const postsById: Record<string, Post> = {};
        Object.values(groupedPosts).forEach(categoryPosts => {
          categoryPosts.forEach(p => { postsById[p.id] = p; });
        });
        
        for (const postId of postIds) {          
          const response = await fetch(`https://stagging-letsxplore-b957bddd5479.herokuapp.com/posts/${postId}/comments`);
          
          if (response.ok) {
            const commentsData = await response.json();

                if (Array.isArray(commentsData)) {
                  const post = postsById[postId];
                  const postImage = post?.featuredImageUrl || (post?.images && post.images[0]) || '/default.svg';
                  const postTitle = post?.name || 'Featured Location';

                  const commentsWithPostInfo = commentsData.map((comment: unknown) => ({
                    ...(comment as ApiComment),
                    postId,
                    postTitle,
                    postImage,
                  } as ApiComment));
                  allComments.push(...commentsWithPostInfo);
                }
          } else {
            console.warn(`Failed to fetch comments for ${postId}:`, response.status);
          }
        }
        
        setApiComments(allComments);
        setHasInitialized(true);
      } catch (err) {
        console.error('Failed to load reviews:', err);
        setError('Failed to load reviews');
        setHasInitialized(true);
      } finally {
        setLoading(false);
      }
    };

    fetchAllComments();
  }, [hasInitialized, getPostIds, groupedPosts]); 

  const apiReviews = React.useMemo(() => {
    
  return apiComments.map((comment): Review => {
      const createdDate = new Date(comment.createdAt);
      const now = new Date();
      const diffInMinutes = Math.floor((now.getTime() - createdDate.getTime()) / (1000 * 60));
      
      let timeAgo: string;
      if (diffInMinutes < 60) {
        timeAgo = `${diffInMinutes} minutes ago`;
      } else if (diffInMinutes < 1440) {
        timeAgo = `${Math.floor(diffInMinutes / 60)} hours ago`;
      } else {
        timeAgo = `${Math.floor(diffInMinutes / 1440)} days ago`;
      }

      const postTitle = (typeof comment === 'object' && comment !== null && 'postTitle' in comment) ? (comment as { postTitle?: string }).postTitle : undefined;
      return {
        id: comment.id,
        userName: comment.username,
        timeAgo,
        rating: comment.rate || 5,
        title: postTitle || 'Featured Location',
        description: comment.content,
        image: (comment as ApiComment).postImage || '/default.svg',
        userAvatar: comment.userAvatar || '/images/user.png'
      };
    }).slice(0, 6); // Limit to 6 reviews
  }, [apiComments]);

  // Prefer `reviews` prop when provided, otherwise use API reviews, otherwise fall back to defaultReviews
  const displayReviews = (reviews && reviews.length > 0) ? reviews : (apiReviews.length > 0 ? apiReviews : defaultReviews);

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
    <div className="bg-gray-50 pt-0">
      <div className="max-w-7xl mx-auto px-2 md:px-6 pb-16">
        {/* Header */}
        <div className="text-center mb-6 pt-10">
          <h2 className="text-2xl font-semibold text-[#1C1C1C] mb-2" style={{ fontFamily: 'PrimeraTrial-Medium, sans-serif' }}>Reviews</h2>
          <p className="text-[#1c1c1c] text-base">Hear from our community</p>
          {loading && (
            <p className="text-sm text-gray-500 mt-2">Loading latest reviews...</p>
          )}
          {error && (
            <p className="text-sm text-red-500 mt-2">Unable to load latest reviews</p>
          )}
        </div>

        {/* Reviews Grid - Desktop grid, Mobile horizontal scroll */}
        {loading && displayReviews.length === 0 ? (
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-2xl p-4 backdrop-blur-[20px] animate-pulse">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                  <div>
                    <div className="h-3 bg-gray-300 rounded w-24 mb-1"></div>
                    <div className="h-3 bg-gray-300 rounded w-16"></div>
                  </div>
                </div>
                <div className="w-full h-36 bg-gray-300 rounded-lg mb-4"></div>
                <div className="flex items-center mb-2">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-3 h-3 bg-gray-300 rounded"></div>
                    ))}
                  </div>
                </div>
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-300 rounded w-full mb-1"></div>
                <div className="h-3 bg-gray-300 rounded w-2/3 mb-3"></div>
                <div className="h-3 bg-gray-300 rounded w-16"></div>
              </div>
            ))}
          </div>
        ) : displayReviews.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">💬</div>
            <h3 className="text-xl font-semibold text-[#1C1C1C] mb-2">No Reviews Yet</h3>
            <p className="text-[#1C1C1C] text-base">Be the first to share your experience!</p>
          </div>
        ) : (
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
            {displayReviews.map((review) => (
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
                  src={review.image || '/default.svg'}
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
        )}

        {/* Mobile Horizontal Scroll */}
        <div className="md:hidden">
          {displayReviews.length === 0 && !loading ? (
            // No Reviews Available - Mobile
            <div className="text-center py-16">
              <div className="text-6xl mb-4">💬</div>
              <h3 className="text-xl font-semibold text-[#1C1C1C] mb-2">No Reviews Yet</h3>
              <p className="text-[#1C1C1C] text-base">Be the first to share your experience!</p>
            </div>
          ) : (
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x scroll-pl-6 scroll-pr-6">
              <style jsx>{`
                ::-webkit-scrollbar {
                  display: none;
                }
              `}</style>
              <div className="pl-2"></div>
              {displayReviews.map((review) => (
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
                    src={review.image || '/default.svg'}
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
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewsSection;