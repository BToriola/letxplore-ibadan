"use client";

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { FiSearch, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import Link from 'next/link';

// Mock suggestions data
const mockSuggestions = [
  "Art exhibitions in Ibadan",
  "Music festivals",
  "Coffee shops in Bodija",
  "Weekend events",
  "Restaurants in Ibadan",
  "Tech meetups",
  "Cultural festivals",
  "Outdoor activities"
];

const Header = () => {
  const [selectedLocation, setSelectedLocation] = useState('Ibadan');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  
  // Filter suggestions based on search input
  useEffect(() => {
    if (searchInput.trim() === '') {
      setSuggestions([]);
    } else {
      const filtered = mockSuggestions.filter(suggestion => 
        suggestion.toLowerCase().includes(searchInput.toLowerCase())
      );
      setSuggestions(filtered);
    }
  }, [searchInput]);
  
  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
       <div className="bg-black/10 backdrop-blur-4xl rounded-full px-4 sm:px-6 lg:px-8  ">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2 md:space-x-3 flex-1">
              <div className="relative" ref={dropdownRef}>
                <div 
                  className="flex items-center py-1 sm:py-2 px-1 sm:px-4 text-white shadow-sm cursor-pointer"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center mr-1 sm:mr-2">
                    <Image 
                      src="/images/locationIcon.png" 
                      alt="Location"
                      width={40}
                      height={40}
                      className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full object-cover"
                      draggable="false"
                    />
                  </div>
                  <span className="font-bold text-xs sm:text-sm md:text-base">{selectedLocation}</span>
                  {isDropdownOpen ? (
                    <FiChevronUp className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                  ) : (
                    <FiChevronDown className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                  )}
                </div>
                
                {isDropdownOpen && (
                  <div className="absolute left-0 mt-1 w-[180px] py-1 bg-[#1a365d]/95 backdrop-blur-sm rounded-lg shadow-lg z-50">
                    {['Ibadan', 'Lagos', 'Abeokuta'].map((location) => (
                      <div
                        key={location}
                        className={`px-4 py-3 text-white cursor-pointer hover:bg-blue-900/50 ${
                          location === selectedLocation ? 'bg-blue-900/30' : ''
                        }`}
                        onClick={() => {
                          setSelectedLocation(location);
                          setIsDropdownOpen(false);
                        }}
                      >
                        {location}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex flex-1 max-w-[130px] xs:max-w-xs sm:max-w-md" ref={searchRef}>
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchInput}
                    onChange={(e) => {
                      setSearchInput(e.target.value);
                      setShowSuggestions(true);
                    }}
                    onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                    className="w-full py-1 sm:py-2 pl-3 sm:pl-4 pr-8 sm:pr-10 bg-transparent border border-white text-white placeholder-white/75 rounded-full focus:outline-none focus:ring-2 focus:ring-white/50 shadow-sm text-xs sm:text-sm md:text-base"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <FiSearch className="h-4 w-4 md:h-5 md:w-5 text-white/75" />
                  </div>
                  
                  {/* Search Suggestions Dropdown */}
                  {showSuggestions && suggestions.length > 0 && (
                    <div className="absolute left-0 right-0 mt-1 py-1 bg-[#1a365d]/95 backdrop-blur-sm rounded-lg shadow-lg z-50 max-h-60 overflow-auto">
                      {suggestions.map((suggestion, index) => (
                        <div
                          key={index}
                          className="px-4 py-3 text-white cursor-pointer hover:bg-blue-900/50 text-xs sm:text-sm"
                          onClick={() => {
                            setSearchInput(suggestion);
                            setShowSuggestions(false);
                          }}
                        >
                          {suggestion}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div> 
           
            <div className="flex items-center">
              <Link href="/signup" passHref>
                <button className="bg-white rounded-full py-1 px-3 md:py-3 md:px-5 cursor-pointer hover:bg-opacity-90 transition-colors flex items-center gap-1 md:gap-2 shadow-sm ml-2">
                  <span className="text-gray-900 font-medium text-xs md:text-base">Sign up</span>
                  <div className="flex items-center justify-center">
                    <Image 
                      src="/images/person.png" 
                      alt="User" 
                      width={20} 
                      height={20}
                      className="h-4 w-4 md:h-5 md:w-5 object-contain" 
                    />
                  </div>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
