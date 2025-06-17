"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { events } from '@/data/events';
import Header from '@/components/layout/Header';

export default function EventDetailPage() {
  const params = useParams();
  const eventId = params.id as string;
  
  // Find the event with the matching ID
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
      
      {/* Main Content */}
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-24">
          
          {/* Event Header Section */}
          <div className="flex flex-col md:flex-row">
            {/* Left Side - Event Image & Details */}
            <div className="flex-1">
              <div className="relative rounded-lg overflow-hidden mb-6" style={{ height: '400px' }}>
                <Image
                  src={ '/images/frame-details.png'}
                  alt={event.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <button className="mr-4 text-sm text-gray-700 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    Share
                  </button>
                  <button className="text-sm text-gray-700 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                    Save
                  </button>
                </div>
              </div>
              
              <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-[#1C1C1C] mb-4">{event.title}</h1>
                <p className="text-gray-700 leading-relaxed">
                  Let's Explore have the best and event location to have fun. And the website is so easy to use. Let's Explore have the best and event location to have fun. And the website is so easy to use. Let's Explore have the best and event location to have fun. And the website is so easy to use Let's Explore...
                </p>
              </div>
              
              <div className="mb-10">
                <h2 className="text-lg font-semibold mb-4">More images</h2>
                <div className="grid grid-cols-5 gap-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="aspect-w-1 aspect-h-1 relative rounded-lg overflow-hidden">
                      <Image
                        src={'/default.svg'}
                        alt={`${event.title} - image ${i}`}
                        fill
                        className="object-cover hover:scale-110 transition-transform cursor-pointer"
                        sizes="(max-width: 768px) 20vw, 10vw"
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mb-10">
                <h2 className="text-lg text-[#1C1C1C] font-semibold mb-4">Similar places you can explore</h2>   
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {events.slice(0, 3).filter(e => e.id !== eventId).map((similarEvent) => (
                    <Link key={similarEvent.id} href={`/events/${similarEvent.id}`}>
                      <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                        <div className="relative" style={{ height: '150px' }}>
                          <Image
                            src={'/default.svg'}
                            alt={similarEvent.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 33vw"
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
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-6 sticky top-24">
                <h2 className="text-base font-semibold text-[#1C1C1C] mb-4">Details</h2>
                
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
