"use client";

import React, { useState, useRef, useEffect } from 'react';
import { apiService, SearchPostResult } from '@/services/api';
import Image from 'next/image';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import AuthModal from '../ui/AuthModal';
import { useLocation } from '../../contexts/LocationContext';
import { useSearch } from '../../contexts/SearchContext';
import { SearchIcon } from '../icons/SvgIcons';
import { useAuth } from '../../contexts/AuthContext';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

const Header = () => {
  const { selectedLocation, setSelectedLocation } = useLocation();
  const { setSearchResults, setIsSearching } = useSearch();
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const { currentUser, isAuthModalOpen, openAuthModal, closeAuthModal } = useAuth();
  const isAuthenticated = !!currentUser;
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<SearchPostResult[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  const slugify = (text: string) => {
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '-')           // Replace spaces with -
      .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
      .replace(/\-\-+/g, '-')         // Replace multiple - with single -
      .replace(/^-+/, '')             // Trim - from start of text
      .replace(/-+$/, '');            // Trim - from end of text
  }

  // Fetch cities from API
  useEffect(() => {
    let mounted = true;
    apiService.getCities()
      .then((res) => {
        if (res.success && res.data && Array.isArray(res.data.cities) && mounted) {
          setCities(res.data.cities);
          // Only set selectedLocation if it is falsy (undefined or empty string)
          if (res.data.cities.length > 0 && (!selectedLocation || selectedLocation === '')) {
            setSelectedLocation(res.data.cities[0]);
          }
        }
      })
      .catch((err) => {
        console.error('Failed to fetch cities:', err);
      });
    return () => { mounted = false; };
  }, [setSelectedLocation, selectedLocation]);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchInput.trim() === '') {
      setSuggestions([]);
      setShowSuggestions(false);
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    const timeoutId = setTimeout(() => {
      apiService
        .searchPostsByNameDesc({
          query: searchInput,
          city: selectedLocation,
          limit: 10,
        })
        .then((results) => {
          // Only update suggestions if the search input hasn't changed
          if (searchInput.trim() !== '') {
            setSuggestions(results);
            setShowSuggestions(results.length > 0);
            // Update search results in context
            setSearchResults(results.map(post => ({
              id: post.id,
              title: post.name,
              description: post.description,
              image: '/default.svg', // Using default image for search results
              date: new Date(post.createdAt).toLocaleDateString(),
              time: new Date(post.createdAt).toLocaleTimeString(),
              location: post.city,
              category: post.category,
              price: 'Free' // Default price for search results
            })));
            setIsSearching(true);
          }
        })
        .catch(() => {
          setSuggestions([]);
          setShowSuggestions(false);
          setSearchResults([]);
          setIsSearching(false);
        });
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchInput, selectedLocation, setIsSearching, setSearchResults]);

  // Handle clicks outside dropdowns and search
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
        if (typeof window !== 'undefined' && window.innerWidth < 768 && isSearchExpanded) {
          setIsSearchExpanded(false);
        }
      }
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSearchExpanded]);

  useEffect(() => {
    if (isSearchExpanded && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchExpanded]);

  return (
    // make header fixed so hero can measure it and sticky elements calculate offsets
    <header className="fixed top-0 left-0 right-0 z-50 hero-header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className={`bg-black/10 backdrop-blur-4xl rounded-full ${isSearchExpanded ? 'px-0' : 'px-4 md:px-2 lg:px-3'}`}>
          <div className="flex items-center h-16 lg:h-20 relative md:justify-between">
            <div
              className={`relative transition-opacity duration-300 ${isSearchExpanded ? 'opacity-0 invisible absolute md:opacity-100 md:visible md:relative' : 'opacity-100 visible'
                }`}
              ref={dropdownRef}
            >
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
              {cities.length > 0 && isDropdownOpen && (
                <div className="absolute left-0 mt-1 w-[180px] py-1 bg-black/25 backdrop-blur-[20px] rounded-lg shadow-lg z-50">
                  {cities.map((location) => (
                    <div
                      key={location}
                      className={`px-4 py-3 text-white cursor-pointer hover:bg-blue-900/50 ${location === selectedLocation ? 'bg-blue-900/30' : ''
                        }`}
                      onClick={() => {
                        setSelectedLocation(location);
                        setIsDropdownOpen(false);
                        // Reset search when location changes
                        setSearchResults([]);
                        setIsSearching(false);
                        setSearchInput('');
                      }}
                    >
                      {location}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Search Bar */}
            <div
              className={`transition-all duration-300 ease-in-out ${isSearchExpanded
                  ? 'absolute left-6 right-6 z-10 w-auto'
                  : 'flex-1 max-w-[110px] xs:max-w-xs sm:max-w-md ml-auto mr-0.5 md:-ml-10 md:mr-3 lg:max-w-[700px] relative md:flex  md:flex-1 md:max-w-md '
                }`}
              ref={searchRef}
            >
              <div className={`relative ${isSearchExpanded ? 'w-full' : 'w-full md:w-[480px]'}`}>
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder={typeof window !== 'undefined' && window.innerWidth < 768 ? "Search" : "Search"}
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onFocus={() => {
                    if (typeof window !== 'undefined' && window.innerWidth < 768) {
                      setIsSearchExpanded(true);
                    }
                  }}
                  onBlur={() => {
                    setTimeout(() => {
                      if (typeof window !== 'undefined' && window.innerWidth < 768) {
                        setIsSearchExpanded(false);
                      }
                    }, 100);
                  }}
                  onClick={() => {
                    if (typeof window !== 'undefined' && window.innerWidth < 768) {
                      setIsSearchExpanded(true);
                    }
                  }}
                  className={`w-full ${isSearchExpanded ? 'py-3' : 'py-0.5 md:py-3'
                    } px-3 lg:px-4 bg-transparent border border-white text-white placeholder-white/75 rounded-full focus:outline-none focus:ring-white/50 shadow-sm text-base placeholder:text-xs lg:placeholder:text-sm  focus:ring-1 focus:ring-white lg:focus:ring-[#0063BF]`}
                  style={{
                    maxWidth: '100%',
                    fontSize: '16px'
                  }}
                />
                <SearchIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-3 h-3 text-white lg:hidden" />

                {showSuggestions && suggestions.length > 0 && (
                  <div className="absolute left-0 right-0 mt-1 py-1 bg-[#1a365d]/95 backdrop-blur-sm rounded-lg shadow-lg z-50 max-h-60 overflow-auto">
                    {suggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        className="px-4 py-3 text-white cursor-pointer hover:bg-blue-900/50 text-sm"
                        onClick={() => {
                          setSearchInput(suggestion.name);
                          setShowSuggestions(false);
                          if (typeof window !== 'undefined' && window.innerWidth < 768) {
                            setIsSearchExpanded(false);
                          }
                          router.push(`/${suggestion.category}/${suggestion.id}/${slugify(suggestion.name)}`);
                        }}
                      >
                        {suggestion.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Auth Section */}
            <div
              className={`flex items-center space-x-2 md:space-x-0 ml-2 transition-opacity duration-300 ${isSearchExpanded ? 'opacity-0 invisible absolute md:opacity-100 md:visible md:relative' : 'opacity-100 visible'
                }`}
            >
              {!isAuthenticated ? (
                <button
                  className="bg-white rounded-full py-1 px-3 md:py-3 md:px-5 cursor-pointer hover:bg-opacity-90 transition-colors flex items-center gap-1 md:gap-2 shadow-sm"
                  onClick={openAuthModal}
                >
                  <span className="text-gray-900 font-medium text-xs md:text-base md:py-0 py-1">Sign up</span>
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
              ) : (
                <div className="relative" ref={profileDropdownRef}>
                  <div
                    className="flex items-center py-1 px-3 cursor-pointer"
                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  >
                    <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center overflow-hidden">
                      <Image
                        src={currentUser.photoURL || "/images/person.png"}
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
                              if (auth) {
                                auth.signOut();
                              }
                            } else if (option === 'Saved') {
                              router.push('/saved');
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

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={closeAuthModal}
        onAuthenticated={closeAuthModal}
      />
    </header>
  );
};

export default Header;