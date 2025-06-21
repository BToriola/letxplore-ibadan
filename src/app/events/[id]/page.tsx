"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { events } from '@/data/events';
import Header from '@/components/layout/Header';
import { FiMapPin, FiStar } from 'react-icons/fi';

export default function EventDetailPage() {
  const params = useParams();
  const eventId = params.id as string;
  const event = events.find(e => e.id === eventId);

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Header />
        <div className="mt-24 text-center p-8">
          <h1 className="text-2xl font-bold mb-4">Event not found</h1>
          <Link href="/" className="text-blue-500 hover:underline">
            Return to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-24">
          <div className="flex flex-col md:flex-row">
            <div className="flex-1">
              <div className="relative rounded-lg overflow-hidden mb-6" style={{ height: '400px' }}>
                <Image
                  src={'/images/frame-details.png'}
                  alt={event.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/default.svg';
                  }}
                />
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-start mb-2">
                <div className="mb-4 sm:mb-0">
                  <h1 className="text-base font-bold text-gray-900">{event.title}</h1>
                </div>

                <div className="flex items-center space-x-4">
                  <button className="text-sm text-[#1c1c1c]/[0.2] flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                  </button>
                  <button className="text-sm text-[#1c1c1c]/[0.2] flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Event details in CategoryEventCard style */}
              <div className=" mb-6">
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="text-gray-900 font-medium">{event.category}<span className="mx-2 text-gray-400">•</span><span className="text-green-600">Open</span><span className="mx-2 text-gray-400">•</span>{event.price === 'Free' ? 'Free' : `${event.price}`}</span> <div className=" mx-2 flex items-center text-sm text-[#1C1C1C]">
                      <FiMapPin className="mr-2 text-gray-500 flex-shrink-0" size={14} />
                      <span className="truncate">{event.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <div className="flex items-center text-yellow-400 mr-2">
                      <FiStar className="fill-current" size={14} />
                      <FiStar className="fill-current" size={14} />
                      <FiStar className="fill-current" size={14} />
                      <FiStar className="fill-current" size={14} />
                      <FiStar className="fill-current text-gray-300" size={14} />
                    </div>
                    <span className="text-gray-700 font-medium">4.5</span>
                    <span className="text-gray-500 ml-1">({234} Reviews)</span>
                  </div>


                </div>
              </div>

              <div className="mb-8">
                <h1 className="text-sm text-[#1c1c1c] font-semibold mb-4">About Us</h1>
                <p className="text-[#1c1c1c] text-xs leading-relaxed">
                  Let's Explore have the best and event location to have fun. And the website is so easy to use. Let's Explore have the best and event location to have fun. And the website is so easy to use. Let's Explore have the best and event location to have fun. And the website is so easy to use Let's Explore...
                </p>
              </div>

              <div className="mb-10">
                <h2 className="text-sm text-[#1c1c1c] font-semibold mb-4">More images</h2>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
                      <Image
                        src={'/default.svg'}
                        alt={`Gallery image ${i}`}
                        fill
                        className="object-cover hover:scale-110 transition-transform cursor-pointer"
                        sizes="(max-width: 640px) 33vw, (max-width: 768px) 25vw, 20vw"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/default.svg';
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-10">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-sm text-[#1c1c1c] font-semibold">Ratings and reviews</h2>
                  <button className="bg-[#f6f9fd] text-blue-600 px-4 py-2 rounded-md text-sm hover:bg-blue-50 transition-colors">
                    Write a review
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Review Card 1 */}
                  <div className="bg-[#f4f4f4] rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                        <Image
                          src={'/default.svg'}
                          alt="Ayobami Israel"
                          width={40}
                          height={40}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-[#1c1c1c]">Ayobami Israel</h3>
                        <p className="text-xs text-gray-500">16 minute ago</p>
                      </div>
                    </div>
                    <div className="flex text-yellow-400 mb-2">
                      <FiStar className="fill-current" size={16} />
                      <FiStar className="fill-current" size={16} />
                      <FiStar className="fill-current" size={16} />
                      <FiStar className="fill-current" size={16} />
                      <FiStar className="fill-current text-gray-300" size={16} />
                    </div>
                    <p className="text-xs text-[#1c1c1c]">
                      Let'sExplore have the best and surest location to have fun. And the website is so easy to use. Let'sExplore...
                    </p>
                  </div>

                  {/* Review Card 2 */}
                  <div className="bg-[#f4f4f4] rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                        <Image
                          src={'/default.svg'}
                          alt="Ayobami Israel"
                          width={40}
                          height={40}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-[#1c1c1c]">Ayobami Israel</h3>
                        <p className="text-xs text-gray-500">16 minute ago</p>
                      </div>
                    </div>
                    <div className="flex text-yellow-400 mb-2">
                      <FiStar className="fill-current" size={16} />
                      <FiStar className="fill-current" size={16} />
                      <FiStar className="fill-current" size={16} />
                      <FiStar className="fill-current" size={16} />
                      <FiStar className="fill-current text-gray-300" size={16} />
                    </div>
                    <p className="text-xs text-[#1c1c1c]">
                      Let'sExplore have the best and surest location to have fun. And the website is so easy to use. Let'sExplore...
                    </p>
                  </div>

                  {/* Review Card 3 */}
                  <div className=" rounded-lg p-4  bg-[#f4f4f4] ">
                    <div className="flex items-center mb-2">
                      <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                        <Image
                          src={'/default.svg'}
                          alt="Ayobami Israel"
                          width={40}
                          height={40}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-[#1c1c1c]">Ayobami Israel</h3>
                        <p className="text-xs text-gray-500">16 minute ago</p>
                      </div>
                    </div>
                    <div className="flex text-yellow-400 mb-2">
                      <FiStar className="fill-current" size={16} />
                      <FiStar className="fill-current" size={16} />
                      <FiStar className="fill-current" size={16} />
                      <FiStar className="fill-current" size={16} />
                      <FiStar className="fill-current text-gray-300" size={16} />
                    </div>
                    <p className="text-xs text-[#1c1c1c]">
                      Let'sExplore have the best and surest location to have fun. And the website is so easy to use. Let'sExplore...
                    </p>
                  </div>
                </div>
              </div>

              {/* Amenities Section */}
              <div className="mb-10">
                <h2 className="text-sm text-[#1c1c1c]  mb-4">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-y-3">
                  <div className="flex items-center">
                    <span className="text-gray-500 mr-2">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 9.5H5c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-8c0-1.1-.9-2-2-2zm0 10H5v-8h14v8zm-7-5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-6.39-9.65l1.42-1.42C7.79 2.67 9.34 2 11 2c1.66 0 3.21.67 4.38 1.85l1.41 1.42 1.41-1.42-1.41-1.42C15.04 .64 13.1 0 11 0 8.9 0 6.96.64 5.21 2.43L3.79 3.85l1.41 1.42z" fill="currentColor"/>
                      </svg>
                    </span>
                    <span className="text-xs text-[#1c1c1c]">Delivery</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-500 mr-2">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 3H6C4.9 3 4 3.9 4 5v14c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H6V5h12v14z" fill="currentColor"/>
                        <path d="M11 7h2v2h-2zm0 4h2v2h-2zm0 4h2v2h-2z" fill="currentColor"/>
                      </svg>
                    </span>
                    <span className="text-xs text-[#1c1c1c]">Dine</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-500 mr-2">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 9H5c-1.1 0-2 .9-2 2v9c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-9c0-1.1-.9-2-2-2zm0 11H5v-9h14v9zm-5-9v-2c0-1.1-.9-2-2-2s-2 .9-2 2v2H5V5c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2v6h-5z" fill="currentColor"/>
                      </svg>
                    </span>
                    <span className="text-xs text-[#1c1c1c]">Outdoor seating</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-500 mr-2">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" fill="currentColor"/>
                      </svg>
                    </span>
                    <span className="text-xs text-[#1c1c1c]">Card payment</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-500 mr-2">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-6h2v2h-2zm0-8h2v6h-2z" fill="currentColor"/>
                      </svg>
                    </span>
                    <span className="text-xs text-[#1c1c1c]">Parking</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-500 mr-2">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22 4H2v16h20V4zm-8 8.5c0 .83-.67 1.5-1.5 1.5h-3v2H8v-6h4.5c.83 0 1.5.67 1.5 1.5v1zm4 3.5h-1.5V8H18v8zm-3-4h-3v-2h3v2z" fill="currentColor"/>
                      </svg>
                    </span>
                    <span className="text-xs text-[#1c1c1c]">Air conditioner</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-500 mr-2">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2m0-2C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 10c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="currentColor"/>
                      </svg>
                    </span>
                    <span className="text-xs text-[#1c1c1c]">Free Wi-Fi</span>
                  </div>
                </div>
              </div>

              {/* Highlights Section */}
              <div className="mb-10">
                <h2 className="text-sm text-[#1c1c1c] mb-4">Highlights</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-y-3">
                  <div className="flex items-center">
                    <span className="text-gray-500 mr-2">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.5 3H6c-1.1 0-2 .9-2 2v5.71c0 3.83 2.95 7.18 6.78 7.29 3.96.12 7.22-3.06 7.22-7v-1h.5c1.93 0 3.5-1.57 3.5-3.5S20.43 3 18.5 3zM16 9v1c0 2.76-2.24 5-5 5s-5-2.24-5-5V5h12.5c.83 0 1.5.67 1.5 1.5S19.33 8 18.5 8H16z" fill="currentColor"/>
                      </svg>
                    </span>
                    <span className="text-xs text-[#1c1c1c]">Coffee</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-500 mr-2">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 5V3H3v2l8 9v5H6v2h12v-2h-5v-5l8-9zM7.43 7L5.66 5h12.69l-1.78 2H7.43z" fill="currentColor"/>
                      </svg>
                    </span>
                    <span className="text-xs text-[#1c1c1c]">Cocktails</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-500 mr-2">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8-1.41-1.42z" fill="currentColor"/>
                      </svg>
                    </span>
                    <span className="text-xs text-[#1c1c1c]">Great ambience</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-500 mr-2">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 9h-1.56c.35-.59.56-1.27.56-2 0-2.21-1.79-4-4-4-.34 0-.66.05-.98.13-.32-.08-.64-.13-.98-.13-2.21 0-4 1.79-4 4 0 .73.21 1.41.56 2H7c-1.1 0-2 .9-2 2v9c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-9c0-1.1-.9-2-2-2zm0 11H7v-7h12v7zm-6-9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" fill="currentColor"/>
                      </svg>
                    </span>
                    <span className="text-xs text-[#1c1c1c]">Karaoke</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-500 mr-2">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22 4h-5v7h3v9l-5-6v-3h-2v3l-5 6v-9h3V4H6v7h1v11h10v-9l5 5v-7h-3V4z" fill="currentColor"/>
                      </svg>
                    </span>
                    <span className="text-xs text-[#1c1c1c]">Salsa</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-500 mr-2">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 2h1.5v3l2-3h1.7l-2 3 2 3h-1.7l-2-3v3H12V5zM7 7.25h2.5V6.5H7V5h4v3.75H8.5v.75H11V11H7V7.25zM19 13l-6 6-4-4-4 4v-2.5l4-4 4 4 6-6V13z" fill="currentColor"/>
                      </svg>
                    </span>
                    <span className="text-xs text-[#1c1c1c]">Minimum spend of ₦50,000</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-500 mr-2">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4.86 8.86l-3 3.87L9 13.14 6 17h12l-3.86-5.14z" fill="currentColor"/>
                      </svg>
                    </span>
                    <span className="text-xs text-[#1c1c1c]">No picture policy</span>
                  </div>
                </div>
              </div>

              {/* Perfect for Section */}
              <div className="mb-10">
                <h2 className="text-sm text-[#1c1c1c] mb-4">Perfect for</h2>
                <ul className="list-disc pl-5 text-xs text-[#1c1c1c] space-y-1">
                  <li>Proposal</li>
                  <li>Small hangout</li>
                  <li>Corporate events</li>
                  <li>Dinners</li>
                </ul>
              </div>

              <div className="mb-10">
                <h2 className="text-sm text-[#1C1C1C] font-semibold mb-4">Similar places you can explore</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {events.slice(0, 3).filter(e => e.id !== eventId).map((similarEvent) => (
                    <Link key={similarEvent.id} href={`/events/${similarEvent.id}`}>
                      <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                        <div className="relative" style={{ height: '150px' }}>
                          <Image
                            src={similarEvent.image || '/default.svg'}
                            alt={similarEvent.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 33vw"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = '/default.svg';
                            }}
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="font-medium text-[#1C1C1C] truncate">{similarEvent.title}</h3>
                          <div className="flex items-center text-xs text-gray-600 mt-1">
                            <span>{similarEvent.date}, {similarEvent.time}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side - Event Details */}
            <div className="w-full md:w-80 md:ml-8 flex-shrink-0">
              <div className=" p-6 rounded-lg mb-6 sticky top-24">
                {/* Action Buttons */}
                <div className="flex justify-between mb-6">
                  <button className="flex flex-col items-center justify-center bg-gray-50 rounded-lg p-3 flex-1 mx-1">
                    <div className="rounded-full bg-gray-100 p-2 mb-1">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-gray-500">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                    </div>
                    <span className="text-xs text-[#1c1c1c]">Direction</span>
                  </button>
                  <button className="flex flex-col items-center justify-center bg-gray-50 rounded-lg p-3 flex-1 mx-1">
                    <div className="rounded-full bg-gray-100 p-2 mb-1">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-gray-500">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className="text-xs text-[#1c1c1c]">Links</span>
                  </button>
                  <button className="flex flex-col items-center justify-center bg-gray-50 rounded-lg p-3 flex-1 mx-1">
                    <div className="rounded-full bg-gray-100 p-2 mb-1">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-gray-500">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <span className="text-xs text-[#1c1c1c]">Contact</span>
                  </button>
                  <button className="flex flex-col items-center justify-center bg-blue-50 rounded-lg p-3 flex-1 mx-1">
                    <div className="rounded-full bg-blue-100 p-2 mb-1">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-blue-600">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <span className="text-xs text-blue-600">Reserve</span>
                  </button>
                  <button className="flex flex-col items-center justify-center bg-gray-50 rounded-lg  flex-1 mx-1">
                    <div className="rounded-full bg-gray-100 p-2 mb-1">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-gray-500">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                      </svg>
                    </div>
                    <span className="text-xs text-[#1c1c1c]">More</span>
                  </button>
                </div>
                <h2 className="text-sm text-[#1C1C1C] mb-4">Details</h2>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Date</h3>
                    <div className="flex items-center">
                      <Image
                        src="/images/calendar_month.png"
                        width={14}
                        height={14}
                        alt="Calendar"
                        className="mr-2"
                      />
                      <p className="text-sm text-[#1C1C1C]">{event.date}, {event.time}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Time</h3>
                    <div className="flex items-center">
                      <svg className="h-4 w-4 mr-2 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-sm text-[#1C1C1C]">7:00PM - 10:00PM</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Address</h3>
                    <div className="flex items-center">
                      <Image
                        src="/images/location_on.png"
                        width={14}
                        height={14}
                        alt="Location"
                        className="mr-2"
                      />
                      <p className="text-sm text-[#1C1C1C]">{event.location}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Contact</h3>
                    <div className="flex items-center">
                      <svg className="h-4 w-4 mr-2 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <p className="text-sm text-[#1C1C1C]">+234 800-555-0000</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Social</h3>
                    <div className="flex space-x-2">
                      <a href="#" className="bg-gray-100 p-1 rounded-full">
                        <Image
                          src="/images/instagram-icon.png"
                          width={20}
                          height={20}
                          alt="Instagram"
                          className="opacity-70 hover:opacity-100 transition-opacity"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/default.svg';
                          }}
                        />
                      </a>
                      <a href="#" className="bg-gray-100 p-1 rounded-full">
                        <Image
                          src="/images/facebook-icon.png"
                          width={20}
                          height={20}
                          alt="Facebook"
                          className="opacity-70 hover:opacity-100 transition-opacity"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/default.svg';
                          }}
                        />
                      </a>
                      <a href="#" className="bg-gray-100 p-1 rounded-full">
                        <Image
                          src="/images/twitter-icon.png"
                          width={20}
                          height={20}
                          alt="Twitter"
                          className="opacity-70 hover:opacity-100 transition-opacity"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/default.svg';
                          }}
                        />
                      </a>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Website</h3>
                    <a href="https://www.letsexplore.com" target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                      www.letsexplore.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
