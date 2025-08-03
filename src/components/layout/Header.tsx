
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
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);
  
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
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
        setIsSearchExpanded(false);
      }
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  useEffect(() => {
    if (isSearchExpanded && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchExpanded]);

  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="bg-black/10 backdrop-blur-4xl rounded-full px-4 md:px-2 lg:px-3">
          <div className="flex items-center h-16 lg:h-20 relative md:justify-between">
            <div className="flex items-center flex-1 md:flex-none">
              {/* Mobile: Location dropdown on the left */}
              <div className={`relative transition-opacity duration-300 ${
                isSearchExpanded ? 'opacity-0 invisible absolute md:opacity-100 md:visible md:relative' : 'opacity-100 visible'
              }`} ref={dropdownRef}>
                <div 
                  className="flex items-center py-1 sm:py-2 px-1 sm:px-4 text-white shadow-sm cursor-pointer"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center mr-1 sm:mr-2">
                    <Image 
                      src="/images/locationIcon.png" 
                      alt="Location"
                      width={48}
                      height={48}
                      className="rounded-full object-cover"
                      draggable="false"
                    />
                  </div>
                  <span className="font-bold text-base sm:text-base md:text-2xl">{selectedLocation}</span>
                  {isDropdownOpen ? (
                    <FiChevronUp className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                  ) : (
                    <FiChevronDown className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                  )}
                </div>
                
                {isDropdownOpen && (
                  <div className="absolute left-0 mt-1 w-[180px] py-1 bg-black/25 backdrop-blur-[20px] rounded-lg shadow-lg z-50">
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

              {/* Mobile: Search moved to the right with auth */}
              <div 
                className={`transition-all duration-300 ease-in-out flex-1 max-w-[130px] xs:max-w-xs sm:max-w-md md:mx-4 lg:max-w-[700px] ${
                  isSearchExpanded 
                    ? 'absolute left-4 right-4 z-10' 
                    : 'hidden md:flex md:mx-4 md:flex-1 md:max-w-md lg:max-w-[700px] relative'
                }`} 
                ref={searchRef}
              >
                <div className="relative w-[312px] md:w-[480px]">
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder={typeof window !== 'undefined' && window.innerWidth < 768 ? "Search" : "Search for where to explore"}
                    value={searchInput}
                    onChange={(e) => {
                      setSearchInput(e.target.value);
                      setShowSuggestions(true);
                    }}
                    onFocus={() => {
                      if (typeof window !== 'undefined' && window.innerWidth < 768) {
                        setIsSearchExpanded(true);
                      }
                      if (suggestions.length > 0) {
                        setShowSuggestions(true);
                      }
                    }}
                    className={`w-full ${isSearchExpanded ? 'py-3' : 'py-1'} lg:py-2.5 px-3 lg:px-4  bg-transparent border border-white text-white placeholder-white/75 rounded-full focus:outline-none focus:ring-2 focus:ring-white/50 shadow-sm text-xs sm:text-sm md:text-base`}
                    style={{ maxWidth: '100%', fontSize: typeof window !== 'undefined' && window.innerWidth < 768 ? '16px' : undefined }}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    {!isSearchExpanded && (
                      <FiSearch className="h-4 w-4 md:h-5 md:w-5 text-white/75" />
                    )}
                  </div>
                  
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
           
            {/* Mobile: Search and Auth section grouped on the right */}
            <div className={`flex items-center space-x-2 md:space-x-0 transition-opacity duration-300 ${
              isSearchExpanded ? 'opacity-0 invisible absolute md:opacity-100 md:visible md:relative' : 'opacity-100 visible'
            }`}>
              {/* Mobile: Search visible only on mobile */}
              <div 
                className={`transition-all duration-300 ease-in-out max-w-[130px] xs:max-w-xs sm:max-w-md md:hidden ${
                  isSearchExpanded 
                    ? 'absolute left-4 right-4 z-10' 
                    : 'relative flex-1'
                }`} 
                ref={searchRef}
              >
                <div className="relative w-full">
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search"
                    value={searchInput}
                    onChange={(e) => {
                      setSearchInput(e.target.value);
                      setShowSuggestions(true);
                    }}
                    onFocus={() => {
                      setIsSearchExpanded(true);
                      if (suggestions.length > 0) {
                        setShowSuggestions(true);
                      }
                    }}
                    className={`w-full ${isSearchExpanded ? 'py-3' : 'py-1'} px-3 bg-transparent border border-white text-white placeholder-white/75 rounded-full focus:outline-none focus:ring-2 focus:ring-white/50 shadow-sm text-xs sm:text-sm`}
                    style={{ maxWidth: '100%', fontSize: '16px' }}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    {!isSearchExpanded && (
                      <FiSearch className="h-4 w-4 text-white/75" />
                    )}
                  </div>
                  
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

              {/* Auth section */}
              <div>
                {!isAuthenticated ? (
                  <Link href="/signup" passHref>
                    <button 
                      className="bg-white rounded-full py-1 px-3 md:py-3 md:px-5 cursor-pointer hover:bg-opacity-90 transition-colors flex items-center gap-1 md:gap-2 shadow-sm"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsAuthenticated(true);
                      }}
                    >
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
                ) : (
                  <div className="relative" ref={profileDropdownRef}>
                    <div 
                      className="flex items-center py-1 px-3 cursor-pointer"
                      onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                    >
                      <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center overflow-hidden">
                        <Image 
                          src="/images/person.png" 
                          alt="User Profile" 
                          width={24} 
                          height={24}
                          className="h-5 w-5 object-contain" 
                        />
                      </div>
                      {isProfileDropdownOpen ? (
                        <FiChevronUp className="ml-1 text-white h-4 w-4" />
                      ) : (
                        <FiChevronDown className="ml-1 text-white h-4 w-4" />
                      )}
                    </div>
                    
                    {isProfileDropdownOpen && (
                      <div className="absolute right-0 mt-1 w-[180px] py-1 bg-[#1a365d]/95 backdrop-blur-sm rounded-lg shadow-lg z-50">
                        {['Profile', 'Saved', 'Logout'].map((option) => (
                          <div
                            key={option}
                            className="px-4 py-3 text-white cursor-pointer hover:bg-blue-900/50"
                            onClick={() => {
                              setIsProfileDropdownOpen(false);
                              if (option === 'Logout') {
                                setIsAuthenticated(false);
                              }
                            }}
                          >
                            {option}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;