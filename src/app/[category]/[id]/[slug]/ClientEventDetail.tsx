"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { usePostDetail, useComments } from "@/hooks/useApi";
import DetailPageHeader from "@/components/layout/DetailPageHeader";
import ReviewsModal from "@/components/ui/ReviewsModal";
import ContactModal from "@/components/ui/ContactModal";
import LinksModal from "@/components/ui/LinksModal";
import {
  InstagramIcon, FacebookIcon, TwitterIcon,
  // Delivery,
  // Dine,
  // Outdoor,
  // Ac,
  // Wifi,
  // Park,
  // Cocktails,
  // Cofee,
  // Karaoke,
  // Ambience,
  // Salsa,
  // Spend,
  // NoPicture,
  DirectionIcon,
  LinksIcon,
  ContactIcon,
  ReserveIcon,
  MoreIcon,
  Share,
  Bookmark,
  Location,
  Star,
  StarHalf,
  StarEmpty,
  Review,
  Menu,
  Save,
  Report,
  Time,
  LocalBlue,
  FastFood,
} from "@/components/icons/SvgIcons";
import { useAuth } from "@/contexts/AuthContext";
import { apiService, Post } from "@/services/api";

interface ReviewComment {
  id: string;
  username: string;
  createdAt: string;
  rate?: number;
  content: string;
  userAvatar?: string;
}

const ReviewCard = ({ comment }: { comment: ReviewComment }) => (
  <div className="bg-[#f4f4f4] rounded-2xl p-4">
    <div className="flex items-center mb-2">
      <Image
        src={comment.userAvatar || "/default.svg"}
        alt={comment.username}
        width={40}
        height={40}
        className="rounded-full object-cover mr-3"
      />
      <div>
        <h3 className="text-xs font-medium text-[#1c1c1c]">{comment.username}</h3>
        <p className="text-xs text-[#1c1c1c]">
          {new Date(comment.createdAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </p>
      </div>
    </div>
    {comment.rate && (
      <div className="flex text-[#FFA300] mb-2 space-x-1">
        {Array.from({ length: Math.floor(comment.rate) }).map((_, i) => (
          <Star key={i} width={16} height={16} />
        ))}
        {comment.rate % 1 !== 0 && <StarHalf width={16} height={16} />}
        {Array.from({ length: 5 - Math.ceil(comment.rate) }).map((_, i) => (
          <StarEmpty key={i} width={16} height={16} />
        ))}
      </div>
    )}
    <p className="text-xs text-[#1c1c1c]">
      {comment.content}
    </p>
  </div>
);

const renderStars = (rating: number, size: number = 14) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  for (let i = 0; i < fullStars; i++) {
    stars.push(<Star key={`full-${i}`} width={size} height={size} />);
  }

  if (hasHalfStar) {
    stars.push(<StarHalf key="half" width={size} height={size} />);
  }

  for (let i = 0; i < emptyStars; i++) {
    stars.push(<StarEmpty key={`empty-${i}`} width={size} height={size} />);
  }

  return stars;
};

const ActionButton = ({ label, isActive, onClick, icon, isDynamicButton = false }: { label: string; isActive: boolean; onClick: () => void; icon: React.ReactNode; isDynamicButton?: boolean }) => (
  <div
    className={`
      flex flex-col items-center justify-center 
      ${isActive ? "bg-white border border-[#0063BF]" : isDynamicButton ? "bg-[#007AFF]/[0.15]" : "bg-[#f4f4f4]"} rounded-xl p-2
      w-[65.2px] h-[48px] 
      md:w-full md:h-[48px]
      cursor-pointer relative transition-all duration-200 hover:shadow-sm
    `}
    onClick={onClick}
  >
    <div className={`rounded-full mb-1 flex items-center justify-center`}>
      {icon}
    </div>
    <span className={`text-[8px] ${isDynamicButton ? "text-[#0063BF]" : "text-[#1c1c1c]"} text-center`}>{label}</span>
  </div>
);

interface MoreDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onWriteReview: () => void;
}

const MoreDropdown = ({ isOpen, onClose, onWriteReview }: MoreDropdownProps) => {
  const [isSaved, setIsSaved] = React.useState(false);
  if (!isOpen) return null;

  return (
    <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-lg shadow-lg z-50 more-dropdown">
      <div className="">
        <button 
          className="w-full px-4 py-2 text-left hover:bg-[#0063BF1A]/[0.1] hover:rounded-lg flex items-center gap-3"
          onClick={() => {
            onWriteReview();
            onClose();
          }}
        >
          <div className="w-6 h-6 rounded flex items-center justify-center">
            <Review width={16} height={16} />
          </div>
          <span className="text-xs text-[#1c1c1c]">Write review</span>
        </button>
        <button className="w-full px-4 py-2 text-left hover:bg-[#0063BF1A]/[0.1] hover:rounded-lg flex items-center gap-3">
          <div className="w-6 h-6 rounded flex items-center justify-center">
            <Menu width={16} height={16} />
          </div>
          <span className="text-xs text-[#1c1c1c]">Menu</span>
        </button>
        <button 
          className="w-full px-4 py-2 text-left hover:bg-[#0063BF1A]/[0.1] hover:rounded-lg flex items-center gap-3"
          onClick={() => setIsSaved((prev) => !prev)}
        >
          <div className="w-6 h-6 rounded flex items-center justify-center">
            <Save width={16} height={16} className={isSaved ? 'text-[#0063BF]' : 'text-[#1c1c1c]/[0.2]'} />
          </div>
          <span className="text-xs text-[#1c1c1c]">Save</span>
        </button>
        <button className="w-full px-4 py-2 text-left hover:bg-[#0063BF1A]/[0.1] hover:rounded-lg flex items-center gap-3">
          <div className="w-6 h-6 rounded flex items-center justify-center">
            <Report width={16} height={16} />
          </div>
          <span className="text-xs text-[#1c1c1c]">Report issue</span>
        </button>
      </div>
    </div>
  );
};

export default function ClientEventDetail() {
  const params = useParams();
  const eventId = params.id as string;
  const category = params.category as string;
  const { currentUser } = useAuth();


  console.log("Current User:", currentUser);

  

  // Use the usePostDetail hook to fetch event data
  const { loading, error, post: event } = usePostDetail(eventId);

  const {
    loading: commentsLoading,
    error: commentsError,
    comments,
    refetch: refetchComments
  } = useComments(eventId);
  

  console.log("Comments:", comments);
  

  // Memoize the filters object to prevent unnecessary API calls
  // const similarEventsFilters = useMemo(() => ({
  //   category: category,
  //   limit: 6 
  // }), [category]);

  // Use usePosts hook to fetch similar events (posts in the same category)
  // const amenities = [
  //   { icon: <Delivery className="text-gray-500 pr-4" />, label: "Delivery" },
  //   { icon: <Dine className="text-gray-500 pr-4" />, label: "Dine" },
  //   { icon: <Outdoor className="text-gray-500 mr-2" />, label: "Outdoor seating" },
  //   { icon: <Card className="text-gray-500 mr-2" />, label: "Card payment" },
  //   { icon: <Park className="text-gray-500 mr-2" />, label: "Parking" },
  //   { icon: <Ac className="text-gray-500 mr-2" />, label: "Air conditioner" },
  //   { icon: <Wifi className="text-gray-500 mr-2" />, label: "Free Wi-Fi" },
  // ];

  // For now, we'll use empty array for similar events until we get the data structure
  const similarEvents: Array<{ id: string; name: string; featuredImageUrl?: string; images?: string[]; address?: string; category?: string; price?: string }> = [];

  const [showDesktopArrows, setShowDesktopArrows] = React.useState(false);
  const [showMobileArrows, setShowMobileArrows] = React.useState(false);
  const [isOpenHourExpanded, setIsOpenHourExpanded] = React.useState(false);
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = React.useState(false);
  const [isReviewsModalOpen, setIsReviewsModalOpen] = React.useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = React.useState(false);
  const [isLinksModalOpen, setIsLinksModalOpen] = React.useState(false);
  const [activeActionButton, setActiveActionButton] = React.useState<string | null>('direction');
  const [isBookmarked, setIsBookmarked] = React.useState(false);
  const [isShared, setIsShared] = React.useState(false);
  const desktopContainerRef = React.useRef<HTMLDivElement>(null);
  const mobileContainerRef = React.useRef<HTMLDivElement>(null);

  const handleSavePost = async () => {
    if (!currentUser) {
      alert("Please log in to save posts.");
      return;
    }
    try {
      await apiService.savePost(currentUser.uid, eventId);
      alert("Post saved!");
    } catch (error) {
      console.error("Error saving post:", error);
      alert("Failed to save post.");
    }
  };


  const getDynamicButtonConfig = (ctaType: string | undefined, isMobile: boolean = false) => {
    switch (ctaType) {
      case 'getTicket':
        return {
          label: 'Get Ticket',
          icon: isMobile ? <LocalBlue width={16} height={16} /> : <LocalBlue />,
          action: 'ticket',
        };
      case 'getOrders':
        return {
          label: 'Order',
          icon: isMobile ? <FastFood width={16} height={16} /> : <FastFood />,
          action: 'order',
        };
      case 'getReserve':
        return {
          label: 'Reserve',
          icon: isMobile ? <ReserveIcon width={16} height={16} /> : <ReserveIcon />,
          action: 'reserve',
        };
      default:
        return {
          label: 'Get Ticket',
          icon: isMobile ? <LocalBlue width={16} height={16} /> : <LocalBlue />,
          action: 'ticket',
        };
    }
  };

  // Use event?.ctaType from API response for button config
  const mobileDynamicButtonConfig = getDynamicButtonConfig(event?.ctaType, true);
  const desktopDynamicButtonConfig = getDynamicButtonConfig(event?.ctaType, false);

  // Check if arrows should be shown based on content width
  React.useEffect(() => {
    const checkArrowVisibility = () => {
      if (desktopContainerRef.current) {
        const container = desktopContainerRef.current;
        const containerWidth = container.clientWidth;
        const scrollWidth = container.scrollWidth;
        setShowDesktopArrows(scrollWidth > containerWidth);
      }

      if (mobileContainerRef.current) {
        const container = mobileContainerRef.current;
        const containerWidth = container.clientWidth;
        const scrollWidth = container.scrollWidth;
        setShowMobileArrows(scrollWidth > containerWidth);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.open-hour-dropdown')) {
        setIsOpenHourExpanded(false);
      }
      if (!target.closest('.more-dropdown')) {
        setIsMoreDropdownOpen(false);
        if (activeActionButton === 'more') {
          setActiveActionButton(null);
        }
      }
      if (!target.closest('.contact-modal')) {
        setIsContactModalOpen(false);
        if (activeActionButton === 'contact') {
          setActiveActionButton(null);
        }
      }
      if (!target.closest('.links-modal')) {
        setIsLinksModalOpen(false);
        if (activeActionButton === 'links') {
          setActiveActionButton(null);
        }
      }
      if (!target.closest('.reviews-modal')) {
        // Don't close modal on outside click for better UX
      }
    };

    checkArrowVisibility();
    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('resize', checkArrowVisibility);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('resize', checkArrowVisibility);
    };
  }, [eventId, activeActionButton]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <DetailPageHeader />
        <div className="pt-20 flex flex-col items-center justify-center min-h-[60vh]">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-[#0063BF]"></div>
            <div className="animate-ping absolute inset-0 rounded-full h-16 w-16 border-4 border-[#0063BF] opacity-25"></div>
          </div>
          <p className="mt-6 text-gray-600 text-sm font-medium">Loading event details...</p>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <DetailPageHeader />
        <div className="mt-24 text-center p-8">
          <h1 className="text-2xl font-bold mb-4">Event not found</h1>
          <p className="text-gray-600 mb-4">{error || 'The event you are looking for does not exist.'}</p>
          <Link href="/" className="text-blue-500 hover:underline">
            Return to home
          </Link>
        </div>
      </div>
    );
  }

  // const highlights = [
  //   { icon: <Cofee className="text-gray-500 mr-2" />, label: "Coffee" },
  //   { icon: <Cocktails className="text-gray-500 mr-2" />, label: "Cocktails" },
  //   { icon: <Ambience className="text-gray-500 mr-2" />, label: "Great ambience" },
  //   { icon: <Karaoke className="text-gray-500 mr-2" />, label: "Karaoke" },
  //   { icon: <Salsa className="text-gray-500 mr-2" />, label: "Salsa" },
  //   { icon: <Spend className="text-gray-500 mr-2" />, label: "Minimum spend of ₦50,000" },
  //   { icon: <NoPicture className="text-gray-500 mr-2" />, label: "No picture policy" },
  // ];

  return (
    <div className="min-h-screen bg-gray-50 md:pr-44">
      <DetailPageHeader />
      <main className="pt-0 md:pt-4 pb-16">
        <div className="max-w-7xl mx-auto md:px-4 sm:md:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row">
            <div className="flex-1 md:mr-8">
              <div className="relative md:rounded-lg overflow-hidden mb-6" style={{ height: "400px" }}>
                <Image
                  src={event.featuredImageUrl || event.images?.[0] || "/images/frame-details.png"}
                  alt={event.name}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/default.svg";
                  }}
                />
              </div>

              <div className="px-4 md:px-0">
                <div className="flex justify-between items-start mb-2">
                  <div className="mb-4 sm:mb-0">
                    <h1 className="text-base font-semibold text-gray-900">{event.name}</h1>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button
                      className="text-sm flex items-center"
                      onClick={() => setIsShared((prev) => !prev)}
                      aria-label="Share"
                    >
                      <Share className={`h-5 w-5 mr-1 ${isShared ? 'text-[#0063BF]' : 'text-[#1c1c1c]/[0.2]'}`} />
                    </button>
                    <button
                      onClick={() => {
                        setIsBookmarked((prev) => !prev);
                        handleSavePost();
                      }}
                      className="text-sm flex items-center"
                      aria-label="Bookmark"
                    >
                      <Bookmark className={`h-5 w-5 mr-1 ${isBookmarked ? 'text-[#0063BF]' : 'text-[#1c1c1c]/[0.2]'}`} />
                    </button>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="text-gray-900 font-medium text-xs">
                        {event.category}<span className="mx-2 text-gray-400">•</span><span className="text-[#169200]">Open</span><span className="mx-2 text-gray-400">•</span>{event.price || "Free"}
                      </span>
                      <div className="mx-2 flex items-center text-[#1C1C1C] text-xs">
                        <Location className="mr-2 text-gray-500 flex-shrink-0" width={14} height={14} />
                        <span className="truncate">{event.address}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 text-xs">
                      <div className="flex text-[#FFA300] text-xs space-x-1">
                        {renderStars(4.5, 14)}
                      </div>
                      <span className="text-xs text-[#1C1C1C]">4.5</span>
                      <span
                        className="text-xs text-[#0063BF] underline cursor-pointer"
                        onClick={() => setIsReviewsModalOpen(true)}
                      >
                        {comments.length} Review{comments.length !== 1 ? 's' : ''}
                      </span>
                    </div>

                    {/* Action buttons for mobile - shown only on mobile */}
                    <div className="md:hidden mt-6">
                      <div className="grid grid-cols-5 gap-1 mb-6">
                        <ActionButton
                          icon={<DirectionIcon width={16} height={16} />}
                          label="Direction"
                          isActive={activeActionButton === 'direction'}
                          onClick={() => setActiveActionButton(activeActionButton === 'direction' ? null : 'direction')}
                        />
                        <div className="relative">
                          <ActionButton
                            icon={<LinksIcon width={16} height={16} />}
                            label="Links"
                            isActive={activeActionButton === 'links'}
                            onClick={() => {
                              setActiveActionButton(activeActionButton === 'links' ? null : 'links');
                              setIsLinksModalOpen(!isLinksModalOpen);
                            }}
                          />
                          <LinksModal
                            isOpen={isLinksModalOpen}
                            onClose={() => {
                              setIsLinksModalOpen(false);
                              setActiveActionButton(null);
                            }}
                            event={event}
                          />
                        </div>
                        <div className="relative">
                          <ActionButton
                            icon={<ContactIcon width={16} height={16} />}
                            label="Contact"
                            isActive={activeActionButton === 'contact'}
                            onClick={() => {
                              setActiveActionButton(activeActionButton === 'contact' ? null : 'contact');
                              setIsContactModalOpen(!isContactModalOpen);
                            }}
                          />
                          <ContactModal
                            isOpen={isContactModalOpen}
                            onClose={() => {
                              setIsContactModalOpen(false);
                              setActiveActionButton(null);
                            }}
                            event={event}
                          />
                        </div>
                        <ActionButton
                          icon={mobileDynamicButtonConfig.icon}
                          label={mobileDynamicButtonConfig.label}
                          isActive={activeActionButton === mobileDynamicButtonConfig.action}
                          onClick={() => setActiveActionButton(activeActionButton === mobileDynamicButtonConfig.action ? null : mobileDynamicButtonConfig.action)}
                          isDynamicButton={true}
                        />
                        <div className="relative">
                          <ActionButton
                            icon={<MoreIcon width={16} height={16} />}
                            label="More"
                            isActive={activeActionButton === 'more'}
                            onClick={() => {
                              setActiveActionButton(activeActionButton === 'more' ? null : 'more');
                              setIsMoreDropdownOpen(!isMoreDropdownOpen);
                            }}
                          />
                          <MoreDropdown
                            isOpen={isMoreDropdownOpen}
                            onClose={() => {
                              setIsMoreDropdownOpen(false);
                              setActiveActionButton(null);
                            }}
                            onWriteReview={() => setIsReviewsModalOpen(true)}
                          />
                        </div>
                      </div>
                    </div>

                    {event.about && (
                      <div className="mt-4 text-sm text-[#1c1c1c]">
                        <p>{event.about}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Container with flex ordering for mobile vs desktop */}
                <div className="flex flex-col">
                  {/* About section - first on desktop (order-1), second on mobile (order-2) */}
                  <div className="mb-8 order-2 md:order-1">
                    <h1 className="text-xs text-[#1c1c1c] font-semibold mb-3">About</h1>
                    <p className="text-[#1c1c1c] text-xs leading-relaxed">
                      {event.about || "Let's Explore have the best and event location to have fun. And the website is so easy to use..."}
                    </p>
                  </div>

                  {/* More Images section - first on mobile (order-1), second on desktop (order-2) */}
                  <div className="mb-10 order-1 md:order-2">
                    <h2 className="text-xs text-[#1c1c1c] font-semibold mb-4">More Images</h2>
                    <div className="relative">
                      <div className="max-w-[802px] overflow-x-auto pb-2">
                        <div className="flex gap-2">
                          {(event.galleryImageUrls && event.galleryImageUrls.length > 0
                            ? event.galleryImageUrls
                            : Array(8).fill("/default.svg")
                          ).map((imgUrl: string, i: number) => (
                            <div
                              key={i}
                              className="relative w-[160px] h-[184px] flex-shrink-0 rounded-lg overflow-hidden bg-gray-100"
                            >
                              <Image
                                src={imgUrl}
                                alt={`Gallery image ${i}`}
                                fill
                                className="object-cover hover:scale-110 transition-transform cursor-pointer"
                                sizes="(max-width: 768px) 160px, 160px"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src = "/default.svg";
                                }}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mb-10">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xs text-[#1c1c1c] font-semibold">Ratings and Reviews</h2>
                    <button
                      className="bg-[#0063BF1A]/[0.1] text-[#0063BF] px-4 py-2 rounded-2xl text-xs hover:bg-blue-50 transition-colors"
                      onClick={() => setIsReviewsModalOpen(true)}
                    >
                      Write a Review
                    </button>
                  </div>
                  {commentsLoading ? (
                    <div className="flex justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                    </div>
                  ) : comments.length > 0 ? (
                    <div className="flex gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:pb-0">
                      {[...comments].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 3).map((comment) => (
                        <div key={comment.id} className="w-72 flex-shrink-0 md:w-auto md:flex-shrink">
                          <ReviewCard comment={comment} />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500 text-sm">
                      No reviews yet. Be the first to write a review!
                    </div>
                  )}
                  {commentsError && (
                    <div className="text-red-500 text-sm mt-2">
                      Error loading reviews: {commentsError}
                    </div>
                  )}
                </div>

                {/* <div className="mb-10">
                  <h2 className="text-xs text-[#1c1c1c] mb-4 font-semibold">Amenities</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-y-3">
                    {amenities.map(({ icon, label }, i) => (
                      <div key={i} className="flex items-center">
                        {icon}
                        <span className="text-xs text-[#1c1c1c] px-2">{label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-10">
                  <h2 className="text-xs text-[#1c1c1c] mb-4 font-semibold">Highlights</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-y-3">
                    {highlights.map(({ icon, label }, i) => (
                      <div key={i} className="flex items-center">
                        {icon}
                        <span className="text-xs text-[#1c1c1c] px-2">{label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-10">
                  <h2 className="text-xs text-[#1c1c1c] mb-4 font-semibold">Perfect for</h2>
                  <ul className="list-disc pl-5 text-xs text-[#1c1c1c] space-y-1">
                    {["Proposal", "Small hangout", "Corporate events", "Dinners"].map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div> */}

                {/* Similar places section for desktop - hidden on mobile */}
                <div className="mb-10 hidden md:block">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-base text-[#1C1C1C] font-semibold">Similar places you can explore</h2>
                  </div>
                  <div className="relative">
                    {showDesktopArrows && (
                      <>
                        <button
                          onClick={() => {
                            if (desktopContainerRef.current) {
                              desktopContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
                            }
                          }}
                          className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full bg-white/90 hover:bg-white shadow-lg transition-colors"
                        >
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-gray-600">
                            <path d="M12.5 5L7.5 10L12.5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                        <button
                          onClick={() => {
                            if (desktopContainerRef.current) {
                              desktopContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
                            }
                          }}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full bg-white/90 hover:bg-white shadow-lg transition-colors"
                        >
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-gray-600">
                            <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                      </>
                    )}
                    <div
                      ref={desktopContainerRef}
                      className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 max-w-4xl"
                      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                      <style jsx>{`
                      .scrollbar-hide::-webkit-scrollbar {
                        display: none;
                      }
                    `}</style>
                      {similarEvents
                        .slice(0, 6)
                        .map((similarEvent) => (
                          <Link key={similarEvent.id} href={`/${category}/${similarEvent.id}/${similarEvent.name.toLowerCase().replace(/\s+/g, '-')}`}>
                            <div className="bg-[#f4f4f4] rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow p-2 w-[280px] flex-shrink-0">
                              <div className="relative rounded-lg overflow-hidden" style={{ height: "200px" }}>
                                <Image
                                  src={similarEvent.featuredImageUrl || similarEvent.images?.[0] || "/default.svg"}
                                  alt={similarEvent.name}
                                  fill
                                  className="object-cover"
                                  sizes="(max-width: 768px) 100vw, 33vw"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = "/default.svg";
                                  }}
                                />
                              </div>
                              <div className="py-4">
                                <h3 className="text-base text-left font-semibold text-[#1C1C1C] mb-2">{similarEvent.name}</h3>

                                <div className="flex items-center space-x-2 mb-2">
                                  <div className="flex text-[#FFA300] space-x-1">
                                    {renderStars(4.5, 12)}
                                  </div>
                                  <span className="text-xs text-[#1C1C1C]">4.5</span>
                                  <span className="text-xs text-gray-500">(234 Reviews)</span>
                                </div>

                                <div className="flex items-center text-xs text-gray-600 mb-2">
                                  <Location className="mr-1 text-gray-500 flex-shrink-0" width={14} height={14} />
                                  <span className="truncate">{similarEvent.address}</span>
                                </div>

                                <div className="flex items-center text-xs">
                                  <span className="text-[#1C1C1C] font-medium">{similarEvent.category}</span>
                                  <span className="mx-2 text-gray-400">•</span>
                                  <span className="text-[#169200]">Open</span>
                                  <span className="mx-2 text-gray-400">•</span>
                                  <span className="text-[#1C1C1C]">{similarEvent.price || "₦₦₦₦"}</span>
                                </div>
                              </div>
                            </div>
                          </Link>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full md:w-96 flex-shrink-0 px-4 pt-4 md:px-0 md:pt-0">
              <div className="rounded-lg mb-6 sticky top-24">
                {/* Action buttons for desktop - hidden on mobile */}
                <div className="hidden md:grid md:grid-cols-5 md:gap-2 mb-6">
                  <ActionButton
                    icon={<DirectionIcon />}
                    label="Direction"
                    isActive={activeActionButton === 'direction'}
                    onClick={() => setActiveActionButton(activeActionButton === 'direction' ? null : 'direction')}
                  />
                  <div className="relative">
                    <ActionButton
                      icon={<LinksIcon />}
                      label="Links"
                      isActive={activeActionButton === 'links'}
                      onClick={() => {
                        setActiveActionButton(activeActionButton === 'links' ? null : 'links');
                        setIsLinksModalOpen(!isLinksModalOpen);
                      }}
                    />
                    <LinksModal
                      isOpen={isLinksModalOpen}
                      onClose={() => {
                        setIsLinksModalOpen(false);
                        setActiveActionButton(null);
                      }}
                      event={event}
                    />
                  </div>
                  <div className="relative">
                    <ActionButton
                      icon={<ContactIcon />}
                      label="Contact"
                      isActive={activeActionButton === 'contact'}
                      onClick={() => {
                        setActiveActionButton(activeActionButton === 'contact' ? null : 'contact');
                        setIsContactModalOpen(!isContactModalOpen);
                      }}
                    />
                    <ContactModal
                      isOpen={isContactModalOpen}
                      onClose={() => {
                        setIsContactModalOpen(false);
                        setActiveActionButton(null);
                      }}
                      event={event}
                    />
                  </div>
                  <ActionButton
                    icon={desktopDynamicButtonConfig.icon}
                    label={desktopDynamicButtonConfig.label}
                    isActive={activeActionButton === desktopDynamicButtonConfig.action}
                    onClick={() => setActiveActionButton(activeActionButton === desktopDynamicButtonConfig.action ? null : desktopDynamicButtonConfig.action)}
                    isDynamicButton={true}
                  />
                  <div className="relative">
                    <ActionButton
                      icon={<MoreIcon />}
                      label="More"
                      isActive={activeActionButton === 'more'}
                      onClick={() => {
                        setActiveActionButton(activeActionButton === 'more' ? null : 'more');
                        setIsMoreDropdownOpen(!isMoreDropdownOpen);
                      }}
                    />
                    <MoreDropdown
                      isOpen={isMoreDropdownOpen}
                      onClose={() => {
                        setIsMoreDropdownOpen(false);
                        setActiveActionButton(null);
                      }}
                      onWriteReview={() => setIsReviewsModalOpen(true)}
                    />
                  </div>
                </div>
                <h2 className="text-xs text-[#1C1C1C] mb-4">Details</h2>
                <div className="space-y-4 ml-4">
                  {/* Always show these details for all categories */}
                  <div>
                    <h3 className="text-xs font-medium text-[#1C1C1C] mb-1">Date</h3>
                    <div className="flex items-center">
                      <Image
                        src="/images/calendar_month.png"
                        alt="Calendar"
                        width={16}
                        height={16}
                        className="mr-2 text-gray-500 flex-shrink-0"
                      />
                      <p className="text-xs text-[#1C1C1C]">{event.date || "TBD"}</p>
                    </div>
                  </div>
                  <hr className="border-t border-[#f4f4f4] my-4 w-full -ml-4" />
                  <div>
                    <h3 className="text-xs font-medium text-[#1C1C1C] mb-1">Time</h3>
                    <div className="flex items-center">
                      <Time className="w-4 h-4 mr-4 text-gray-500" width={16} height={16} />
                      <p className="pl-2 text-xs text-[#1C1C1C]">{event.time || "TBD"}</p>
                    </div>
                  </div>
                  <hr className="border-t border-[#f4f4f4] my-4 w-full -ml-4" />
                  <div>
                    <h3 className="text-xs font-medium text-[#1C1C1C] mb-1">Address</h3>
                    <div className="flex items-center">
                      <Location className="w-4 h-4 mr-2 text-gray-500" width={16} height={16} />
                      <p className="pl-2 text-xs text-[#1C1C1C]">{event.address}</p>
                    </div>
                  </div>
                  <hr className="border-t border-[#f4f4f4] my-4 w-full -ml-4" />
                  <div>
                    <h3 className="text-xs font-medium text-[#1C1C1C] mb-1">Phone number</h3>
                    <p className="text-xs text-[#0063BF]">{event.phone || "+234 900 455 9889"}</p>
                  </div>
                  <hr className="border-t border-[#f4f4f4] my-4 w-full -ml-4" />
                  {/* Open hour always shown, now using event.openingHours if available */}
                  <div>
                    <h3 className="text-xs font-medium text-[#1C1C1C] mb-1">Open hour</h3>
                    <div className="relative open-hour-dropdown">
                      {(() => {
                        const todayIdx = new Date().getDay();
                        const daysOfWeek = [
                          'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
                        ];
                        let mainDay: string | null = null;
                        let mainValue: unknown = null;
                        const openingHours = event.openingHours ?? {};
                        const entries = Object.entries(openingHours);
                        function formatTime(time: string) {
                          if (!time) return '';
                          const [h, m] = time.split(':');
                          let hour = parseInt(h, 10);
                          const minute = m || '00';
                          const ampm = hour >= 12 ? 'PM' : 'AM';
                          if (hour === 0) hour = 12;
                          else if (hour > 12) hour = hour - 12;
                          return `${hour}:${minute.padStart(2, '0')} ${ampm}`;
                        }
                        if (entries.length > 0) {
                          const openEntry = entries.find(([, v]) => (v as { status: string }).status === 'open');
                          if (openEntry) {
                            [mainDay, mainValue] = openEntry;
                          } else {
                            [mainDay, mainValue] = entries[todayIdx % entries.length] || [null, null];
                          }
                        }
                        return (
                          <>
                            <div className="flex items-center justify-between w-full cursor-pointer" onClick={() => setIsOpenHourExpanded(!isOpenHourExpanded)}>
                              <span className="text-xs text-[#1C1C1C] font-normal">
                                {entries.length > 0 && mainDay && mainValue
                                  ? ((mainValue as { status: string }).status === 'open'
                                    ? `${formatTime((mainValue as { openingTime: string }).openingTime)} - ${formatTime((mainValue as { closingTime: string }).closingTime)}`
                                    : 'Closed')
                                  : 'No opening hours info'}
                              </span>
                              <svg
                                className={`w-4 h-4 text-[#0063BF] transition-transform ${isOpenHourExpanded ? 'rotate-180' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </div>
                            {isOpenHourExpanded && (
                              <div className="mt-3">
                                <div className="space-y-2">
                                  {entries.length > 0
                                    ? daysOfWeek.map((day, idx) => {
                                      const v = openingHours[day] as { openingTime: string; closingTime: string; status: string } | undefined;
                                      return (
                                        <div className="flex items-center" key={day}>
                                          <span className={`text-xs w-28 ${idx === todayIdx ? 'font-bold text-[#0063BF]' : 'text-[#1C1C1C]'}`}>{day}</span>
                                          <span className={`text-xs ${idx === todayIdx ? 'font-bold text-[#0063BF]' : 'text-[#1C1C1C]'}`}>
                                            {v
                                              ? (v.status === 'open'
                                                ? `${formatTime(v.openingTime)} - ${formatTime(v.closingTime)}`
                                                : 'Closed')
                                              : '—'}
                                          </span>
                                        </div>
                                      );
                                    })
                                    : (
                                      <div className="flex items-center">
                                        <span className="text-xs text-[#1C1C1C]">No opening hours info</span>
                                      </div>
                                    )}
                                </div>
                              </div>
                            )}
                          </>
                        );
                      })()}
                    </div>
                  </div>
                  <hr className="border-t border-[#f4f4f4] my-4 w-full -ml-4" />
                  <div>
                    <h3 className="text-xs font-medium text-[#1c1c1c] mb-1">Website</h3>
                    <a href={event.website || "https://www.letxplore.com"} target="_blank" rel="noopener noreferrer" className="text-xs text-[#0063BF] hover:underline">
                      {event.website || "www.letxplore.com"}
                    </a>
                  </div>
                  <hr className="border-t border-[#f4f4f4] my-4 w-full -ml-4" />
                  <div>
                    <h3 className="text-xs text-[#1c1c1c] mb-1">Socials</h3>
                    <div className="flex md:justify-between items-stretch gap-2">
                      <a
                        href={
                          (event as Post).social_ig || (event as Post).socialMedia?.instagram || '#'
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-[#007AFF]/[0.15] hover:bg-blue-100 transition-colors duration-200 p-2 rounded-lg flex-1 justify-center md:justify-start"
                      >
                        <InstagramIcon className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                        <span className="text-[#1C1C1C] font-medium text-xs md:text-sm">Instagram</span>
                      </a>
                      <a
                        href={
                          (event as Post).social_fb || (event as Post).socialMedia?.facebook || '#'
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-[#007AFF]/[0.15] hover:bg-blue-100 transition-colors duration-200 p-2 rounded-lg flex-1 justify-center md:justify-start"
                      >
                        <FacebookIcon className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                        <span className="text-[#1C1C1C] font-medium text-xs md:text-sm">Facebook</span>
                      </a>
                      <a
                        href={
                          (event as Post).socialMedia?.twitter || '#'
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-[#007AFF]/[0.15] hover:bg-blue-100 transition-colors duration-200 p-2 rounded-lg flex-1 justify-center md:justify-start"
                      >
                        <TwitterIcon className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                        <span className="text-[#1C1C1C] font-medium text-xs md:text-sm">X(Twitter)</span>
                      </a>
                    </div>
                  </div>
                  <hr className="border-t border-[#f4f4f4] my-4 w-full -ml-4" />
                </div>
              </div>
            </div>
          </div>

          {/* Similar places section for mobile - shown only on mobile at the bottom */}
          <div className="mb-10 md:hidden px-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm text-[#1C1C1C] font-semibold">Similar places you can explore</h2>
            </div>
            <div className="relative">
              {showMobileArrows && (
                <>
                  <button
                    onClick={() => {
                      if (mobileContainerRef.current) {
                        mobileContainerRef.current.scrollBy({ left: -250, behavior: 'smooth' });
                      }
                    }}
                    className="absolute left-1 top-1/2 transform -translate-y-1/2 z-10 p-1.5 rounded-full bg-white/90 hover:bg-white shadow-lg transition-colors"
                  >
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" className="text-gray-600">
                      <path d="M12.5 5L7.5 10L12.5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <button
                    onClick={() => {
                      if (mobileContainerRef.current) {
                        mobileContainerRef.current.scrollBy({ left: 250, behavior: 'smooth' });
                      }
                    }}
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 z-10 p-1.5 rounded-full bg-white/90 hover:bg-white shadow-lg transition-colors"
                  >
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" className="text-gray-600">
                      <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </>
              )}
              <div
                ref={mobileContainerRef}
                className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 max-w-lg"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {similarEvents
                  .slice(0, 6)
                  .map((similarEvent) => (
                    <Link
                      key={similarEvent.id}
                      href={`/${category}/${similarEvent.id}/${similarEvent.name.toLowerCase().replace(/\s+/g, '-')}`}
                      onClick={() => {
                        setTimeout(() => {
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }, 100);
                      }}
                    >
                      <div className="bg-[#f4f4f4] rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow p-2 w-full flex-shrink-0">
                        <div className="relative rounded-lg overflow-hidden" style={{ height: "200px", width: "280px" }}>
                          <Image
                            src={similarEvent.featuredImageUrl || similarEvent.images?.[0] || "/default.svg"}
                            alt={similarEvent.name}
                            fill
                            className="object-cover"
                            sizes="100vw"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = "/default.svg";
                            }}
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="text-base font-semibold text-[#1C1C1C] mb-2">{similarEvent.name}</h3>

                          <div className="flex items-center space-x-2 mb-2">
                            <div className="flex text-[#FFA300] space-x-1">
                              {renderStars(4.5, 12)}
                            </div>
                            <span className="text-xs text-[#1C1C1C]">4.5</span>
                            <span className="text-xs text-gray-500">(234 Reviews)</span>
                          </div>

                          <div className="flex items-center text-xs text-gray-600 mb-2">
                            <Location className="mr-1 text-gray-500 flex-shrink-0" width={14} height={14} />
                            <span className="truncate">{similarEvent.address}</span>
                          </div>

                          <div className="flex items-center text-xs">
                            <span className="text-[#1C1C1C] font-medium">{similarEvent.category}</span>
                            <span className="mx-2 text-gray-400">•</span>
                            <span className="text-[#169200]">Open</span>
                            <span className="mx-2 text-gray-400">•</span>
                            <span className="text-[#1C1C1C]">{similarEvent.price || "₦₦₦₦"}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Reviews Modal */}
      <ReviewsModal
        isOpen={isReviewsModalOpen}
        onClose={() => setIsReviewsModalOpen(false)}
        eventId={eventId}
        comments={comments}
        loading={commentsLoading}
        error={commentsError}
        onCommentAdded={refetchComments}
      />
    </div>
  );
}