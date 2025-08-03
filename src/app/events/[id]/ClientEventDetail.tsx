"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { events } from "@/data/events";
import { EventCardProps } from "@/components/ui/EventCard";
import DetailPageHeader from "@/components/layout/DetailPageHeader";
import {
  InstagramIcon, FacebookIcon, TwitterIcon,
  Delivery,
  Dine,
  Outdoor,
  Card,
  Ac,
  Wifi,
  Park,
  Cocktails,
  Cofee,
  Karaoke,
  Ambience,
  Salsa,
  Spend,
  NoPicture,
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
} from "@/components/icons/SvgIcons";

const ReviewCard = () => (
  <div className="bg-[#f4f4f4] rounded-2xl p-4">
    <div className="flex items-center mb-2">
      <Image
        src="/default.svg"
        alt="Ayobami Israel"
        width={40}
        height={40}
        className="rounded-full object-cover mr-3"
      />
      <div>
        <h3 className="text-xs font-medium text-[#1c1c1c]">Ayobami Israel</h3>
        <p className="text-xs text-[#1c1c1c]">16 minute ago</p>
      </div>
    </div>
    <div className="flex text-[#FFA300] mb-2 space-x-1">
      {Array.from({ length: 4 }).map((_, i) => <Star key={i} width={16} height={16} />)}
      <StarEmpty width={16} height={16} />
    </div>
    <p className="text-xs text-[#1c1c1c]">
      Let&apos;sExplore have the best and surest location to have fun. And the website is so easy to use. Let&apos;sExplore...
    </p>
  </div>
);

// Function to render stars based on rating
const renderStars = (rating: number, size: number = 14) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  // Add full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push(<Star key={`full-${i}`} width={size} height={size} />);
  }

  // Add half star if needed
  if (hasHalfStar) {
    stars.push(<StarHalf key="half" width={size} height={size} />);
  }

  // Add empty stars
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<StarEmpty key={`empty-${i}`} width={size} height={size} />);
  }

  return stars;
};

const ActionButton = ({ icon, label, color = "#1c1c1c" }: { icon: React.ReactNode; label: string; color?: string }) => (
  <div
    className={`
      flex flex-col items-center justify-center 
      bg-gray-100 rounded-xl p-2
      w-[65.2px] h-[48px] 
      md:w-[83.7px] md:h-[48px]
    `}
  >
    <div className={`rounded-full ${color === "#0063BF" ? "bg-blue-100" : "bg-gray-100"} mb-1 flex items-center justify-center`}>
      {icon}
    </div>
    <span className={`text-[8px] ${color === "#0063BF" ? "text-[#0063BF]" : "text-[#1c1c1c]"} text-center`}>{label}</span>
  </div>
);

export default function ClientEventDetail({ eventData }: { eventData?: EventCardProps }) {
  const params = useParams();
  const eventId = eventData?.id || params.id;
  const eventItem = eventData || events.find((e) => e.id === eventId);
  const [showDesktopArrows, setShowDesktopArrows] = React.useState(false);
  const [showMobileArrows, setShowMobileArrows] = React.useState(false);
  const desktopContainerRef = React.useRef<HTMLDivElement>(null);
  const mobileContainerRef = React.useRef<HTMLDivElement>(null);

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

    checkArrowVisibility();
    window.addEventListener('resize', checkArrowVisibility);

    return () => {
      window.removeEventListener('resize', checkArrowVisibility);
    };
  }, [eventId]);

  if (!eventItem) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <DetailPageHeader />
        <div className="mt-24 text-center p-8">
          <h1 className="text-2xl font-bold mb-4">Event not found</h1>
          <Link href="/" className="text-blue-500 hover:underline">
            Return to home
          </Link>
        </div>
      </div>
    );
  }

  const amenities = [
    { icon: <Delivery className="text-gray-500 pr-4" />, label: "Delivery" },
    { icon: <Dine className="text-gray-500 pr-4" />, label: "Dine" },
    { icon: <Outdoor className="text-gray-500 mr-2" />, label: "Outdoor seating" },
    { icon: <Card className="text-gray-500 mr-2" />, label: "Card payment" },
    { icon: <Park className="text-gray-500 mr-2" />, label: "Parking" },
    { icon: <Ac className="text-gray-500 mr-2" />, label: "Air conditioner" },
    { icon: <Wifi className="text-gray-500 mr-2" />, label: "Free Wi-Fi" },
  ];

  const highlights = [
    { icon: <Cofee className="text-gray-500 mr-2" />, label: "Coffee" },
    { icon: <Cocktails className="text-gray-500 mr-2" />, label: "Cocktails" },
    { icon: <Ambience className="text-gray-500 mr-2" />, label: "Great ambience" },
    { icon: <Karaoke className="text-gray-500 mr-2" />, label: "Karaoke" },
    { icon: <Salsa className="text-gray-500 mr-2" />, label: "Salsa" },
    { icon: <Spend className="text-gray-500 mr-2" />, label: "Minimum spend of ₦50,000" },
    { icon: <NoPicture className="text-gray-500 mr-2" />, label: "No picture policy" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 md:pr-44">
      <DetailPageHeader />
      <main className="pt-0 md:pt-4 pb-16">
        <div className="max-w-7xl mx-auto md:px-4 sm:md:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row">
            <div className="flex-1 md:mr-8">
              <div className="relative md:rounded-lg overflow-hidden mb-6" style={{ height: "400px" }}>
                <Image
                  src="/images/frame-details.png"
                  alt={eventItem.title}
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
                    <h1 className="text-base font-semibold text-gray-900">{eventItem.title}</h1>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button className="text-sm text-[#1c1c1c]/[0.2] flex items-center">
                      <Share className="h-5 w-5 mr-1" />
                    </button>
                    <button className="text-sm text-[#1c1c1c]/[0.2] flex items-center">
                      <Bookmark className="h-5 w-5 mr-1" />
                    </button>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="text-gray-900 font-medium text-xs">
                        {eventItem.category}<span className="mx-2 text-gray-400">•</span><span className="text-[#169200]">Open</span><span className="mx-2 text-gray-400">•</span>{eventItem.price === "Free" ? "Free" : eventItem.price}
                      </span>
                      <div className="mx-2 flex items-center text-[#1C1C1C] text-xs">
                        <Location className="mr-2 text-gray-500 flex-shrink-0" width={14} height={14} />
                        <span className="truncate">{eventItem.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 text-xs">
                      <div className="flex text-[#FFA300] text-xs space-x-1">
                        {renderStars(4.5, 14)}
                      </div>
                      <span className="text-xs text-[#1C1C1C]">4.5</span>
                      <span className="text-xs text-[#0063BF] underline cursor-pointer">234 Reviews</span>
                    </div>

                    {/* Action buttons for mobile - shown only on mobile */}
                    <div className="md:hidden mt-6">
                      <div className="grid grid-cols-5 gap-1 mb-6">
                        <ActionButton icon={<DirectionIcon width={16} height={16} />} label="Direction" />
                        <ActionButton icon={<LinksIcon width={16} height={16} />} label="Links" />
                        <ActionButton icon={<ContactIcon width={16} height={16} />} label="Contact" />
                        <ActionButton icon={<ReserveIcon width={16} height={16} />} label="Reserve" color="#0063BF" />
                        <ActionButton icon={<MoreIcon width={16} height={16} />} label="More" />
                      </div>
                    </div>

                    {eventItem.description && (
                      <div className="mt-4 text-sm text-[#1c1c1c]">
                        <p>{eventItem.description}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mb-8">
                  <h1 className="text-xs text-[#1c1c1c] font-semibold mb-3">About</h1>
                  <p className="text-[#1c1c1c] text-xs leading-relaxed">
                    Let&apos;s Explore have the best and event location to have fun. And the website is so easy to use...
                  </p>
                </div>

                <div className="mb-10">
                  <h2 className="text-xs text-[#1c1c1c] font-semibold mb-4">More Images</h2>
                  <div className="relative">
                    <div className="max-w-[802px] overflow-x-auto pb-2">
                      <div className="flex gap-2">
                        {[...Array(8)].map((_, i) => (
                          <div
                            key={i}
                            className="relative w-[160px] h-[184px] flex-shrink-0 rounded-lg overflow-hidden bg-gray-100"
                          >
                            <Image
                              src="/default.svg"
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
                <div className="mb-10">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xs text-[#1c1c1c] font-semibold">Ratings and Reviews</h2>
                    <button className="bg-[#0063BF1A]/[0.1] text-[#0063BF] px-4 py-2 rounded-2xl text-xs hover:bg-blue-50 transition-colors">
                      Write a Review
                    </button>
                  </div>
                  <div className="flex gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:pb-0">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="w-72 flex-shrink-0 md:w-auto md:flex-shrink">
                        <ReviewCard />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-10">
                  <h2 className="text-xs text-[#1c1c1c] mb-4">Amenities</h2>
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
                  <h2 className="text-xs text-[#1c1c1c] mb-4">Highlights</h2>
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
                  <h2 className="text-xs text-[#1c1c1c] mb-4">Perfect for</h2>
                  <ul className="list-disc pl-5 text-xs text-[#1c1c1c] space-y-1">
                    {["Proposal", "Small hangout", "Corporate events", "Dinners"].map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>

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
                      {events
                        .filter((e) => e.id !== eventId)
                        .slice(0, 6)
                        .map((similarEvent) => (
                          <Link key={similarEvent.id} href={`/events/${similarEvent.id}`}>
                            <div className="bg-[#f4f4f4] rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow p-2 w-[280px] flex-shrink-0">
                              <div className="relative rounded-lg overflow-hidden" style={{ height: "200px" }}>
                                <Image
                                  src={similarEvent.image || "/default.svg"}
                                  alt={similarEvent.title}
                                  fill
                                  className="object-cover"
                                  sizes="(max-width: 768px) 100vw, 33vw"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = "/default.svg";
                                  }}
                                />
                              </div>
                              <div className="p-4">
                                <h3 className="text-base text-left font-semibold text-[#1C1C1C] mb-2">{similarEvent.title}</h3>

                                <div className="flex items-center space-x-2 mb-2">
                                  <div className="flex text-[#FFA300] space-x-1">
                                    {renderStars(4.5, 12)}
                                  </div>
                                  <span className="text-xs text-[#1C1C1C]">4.5</span>
                                  <span className="text-xs text-gray-500">(234 Reviews)</span>
                                </div>

                                <div className="flex items-center text-xs text-gray-600 mb-2">
                                  <Location className="mr-1 text-gray-500 flex-shrink-0" width={14} height={14} />
                                  <span className="truncate">{similarEvent.location}</span>
                                </div>

                                <div className="flex items-center text-xs">
                                  <span className="text-[#1C1C1C] font-medium">{similarEvent.category}</span>
                                  <span className="mx-2 text-gray-400">•</span>
                                  <span className="text-[#169200]">Open</span>
                                  <span className="mx-2 text-gray-400">•</span>
                                  <span className="text-[#1C1C1C]">{similarEvent.price === "Free" ? "₦₦₦₦" : "₦₦₦₦"}</span>
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
                <div className="hidden md:flex md:justify-between md:space-x-2 mb-6">
                  <ActionButton icon={<DirectionIcon />} label="Direction" />
                  <ActionButton icon={<LinksIcon />} label="Links" />
                  <ActionButton icon={<ContactIcon />} label="Contact" />
                  <ActionButton icon={<ReserveIcon />} label="Reserve" color="#0063BF" />
                  <ActionButton icon={<MoreIcon />} label="More" />
                </div>
                <h2 className="text-xs text-[#1C1C1C] mb-4">Details</h2>
                <div className="space-y-4 ml-4">
                  <div>
                    <h3 className="text-xs font-medium text-[#1C1C1C] mb-1">Phone number</h3>
                    <div className="flex items-center">
                      <p className="text-xs text-[#0063BF]">+234 900 455 9889</p>
                    </div>
                  </div>
                  <hr className="border-t border-[#f4f4f4] my-4 w-full -ml-4" />
                  <div>
                    <h3 className="text-xs text-[#1c1c1c] mb-1">Address</h3>
                    <p className="text-xs text-[#1C1C1C]">{eventItem.location}</p>
                  </div>
                  <hr className="border-t border-[#f4f4f4] my-4 w-full -ml-4" />
                  <div>
                    <h3 className="text-xs font-medium text-[#1C1C1C] mb-1">Open hour</h3>
                    <div className="flex items-center">
                      <p className="text-xs text-[#1C1C1C]">7:00am - 10:00am</p>
                    </div>
                  </div>
                  <hr className="border-t border-[#f4f4f4] my-4 w-full -ml-4" />
                  <div>
                    <h3 className="text-xs font-medium text-[#1c1c1c] mb-1">Website</h3>
                    <a href="https://www.letxplore.com" target="_blank" rel="noopener noreferrer" className="text-xs text-[#0063BF] hover:underline">
                      www.letxplore.com
                    </a>
                  </div>
                  <hr className="border-t border-[#f4f4f4] my-4 w-full -ml-4" />
                  <div>
                    <h3 className="text-xs text-[#1c1c1c] mb-1">Socials</h3>
                    <div className="flex md:justify-between items-stretch gap-2">
                      <a href="#" className="flex items-center gap-2 bg-[#007AFF]/[0.15] hover:bg-blue-100 transition-colors duration-200 p-2 rounded-lg flex-1 justify-center md:justify-start">
                        <InstagramIcon className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                        <span className="text-[#1C1C1C] font-medium text-xs md:text-sm">Instagram</span>
                      </a>
                      <a href="#" className="flex items-center gap-2 bg-[#007AFF]/[0.15] hover:bg-blue-100 transition-colors duration-200 p-2 rounded-lg flex-1 justify-center md:justify-start">
                        <FacebookIcon className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                        <span className="text-[#1C1C1C] font-medium text-xs md:text-sm">Facebook</span>
                      </a>
                      <a href="#" className="flex items-center gap-2 bg-[#007AFF]/[0.15] hover:bg-blue-100 transition-colors duration-200 p-2 rounded-lg flex-1 justify-center md:justify-start">
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
                {events
                  .filter((e) => e.id !== eventId)
                  .slice(0, 6)
                  .map((similarEvent) => (
                    <Link key={similarEvent.id} href={`/events/${similarEvent.id}`}>
                      <div className="bg-[#f4f4f4] rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow p-2 w-[250px] flex-shrink-0">
                        <div className="relative rounded-lg overflow-hidden" style={{ height: "200px" }}>
                          <Image
                            src={similarEvent.image || "/default.svg"}
                            alt={similarEvent.title}
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
                          <h3 className="text-base font-semibold text-[#1C1C1C] mb-2">{similarEvent.title}</h3>

                          <div className="flex items-center space-x-2 mb-2">
                            <div className="flex text-[#FFA300] space-x-1">
                              {renderStars(4.5, 12)}
                            </div>
                            <span className="text-xs text-[#1C1C1C]">4.5</span>
                            <span className="text-xs text-gray-500">(234 Reviews)</span>
                          </div>

                          <div className="flex items-center text-xs text-gray-600 mb-2">
                            <Location className="mr-1 text-gray-500 flex-shrink-0" width={14} height={14} />
                            <span className="truncate">{similarEvent.location}</span>
                          </div>

                          <div className="flex items-center text-xs">
                            <span className="text-[#1C1C1C] font-medium">{similarEvent.category}</span>
                            <span className="mx-2 text-gray-400">•</span>
                            <span className="text-[#169200]">Open</span>
                            <span className="mx-2 text-gray-400">•</span>
                            <span className="text-[#1C1C1C]">{similarEvent.price === "Free" ? "₦₦₦₦" : "₦₦₦₦"}</span>
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
    </div>
  );
}