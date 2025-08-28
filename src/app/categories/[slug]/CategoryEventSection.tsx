"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import EventCard, { EventCardProps } from '@/components/ui/EventCard';
import { Post } from '../../../services/api';

interface CategoryEventSectionProps {
    categoryName: string;
    groupedPosts?: Record<string, Post[]>;
}

const CategoryEventSection: React.FC<CategoryEventSectionProps> = ({ 
    categoryName, 
    groupedPosts = {} 
}) => {
    const [loading, setLoading] = useState(false);
    const [displayedEvents, setDisplayedEvents] = useState<EventCardProps[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [dateFilter, _setDateFilter] = useState('All dates');
    const [sortOrder, setSortOrder] = useState('Most recent');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isSortOpen, setIsSortOpen] = useState(false);

    // State for filter values in the modal
    const [tempCategory, setTempCategory] = useState(categoryName);
    const [tempNeighborhood, setTempNeighborhood] = useState('All');
    const [tempPrice, setTempPrice] = useState('All');

    // Actual filter values that are applied
    const [neighborhoodFilter, setNeighborhoodFilter] = useState('All');
    const [priceFilter, setPriceFilter] = useState('All');
    const eventsPerPage = 12;
    const filterRef = useRef<HTMLDivElement>(null);

    // Transform API Post data to EventCardProps format
    const transformPostToEventCard = (post: Post): EventCardProps => {
        return {
            id: post.id,
            title: post.name || 'Untitled Event',
            date: post.date ? new Date(post.date).toLocaleDateString() : 'TBA',
            time: post.time || 'TBA',
            location: `${post.neighborhood || ''}, ${post.city || 'Ibadan'}`.replace(/^, /, ''),
            price: post.price || post.priceRange || 'Free',
            image: post.featuredImageUrl || post.galleryImageUrls?.[0] || post.images?.[0] || '/images/default/event-placeholder.jpg',
            category: post.category || 'Event',
            description: post.about || ''
        };
    };

    // Get categories from API data
    const getApiCategories = (): string[] => {
        const apiCategories = Object.keys(groupedPosts).filter(category => 
            groupedPosts[category] && groupedPosts[category].length > 0
        );
        return ['All', ...apiCategories];
    };

    // Get category count for API data
    const getCategoryCount = (category: string): number => {
        if (category === 'All') {
            return Object.values(groupedPosts).reduce((total, posts) => total + posts.length, 0);
        }
        return groupedPosts[category]?.length || 0;
    };

    // Get unique neighborhoods from API data
    const getUniqueNeighborhoods = (): string[] => {
        const neighborhoods = new Set<string>();
        Object.values(groupedPosts).forEach(posts => {
            posts.forEach(post => {
                if (post.neighborhood) {
                    neighborhoods.add(post.neighborhood);
                }
            });
        });
        return ['All', ...Array.from(neighborhoods).sort()];
    };

    // Get events for the current category
    const getCategoryEvents = useCallback((): EventCardProps[] => {
        if (categoryName === 'All') {
            // Return all events from all categories
            const allEvents: EventCardProps[] = [];
            Object.values(groupedPosts).forEach(posts => {
                posts.forEach(post => {
                    allEvents.push(transformPostToEventCard(post));
                });
            });
            return allEvents;
        } else {
            // Return events for specific category
            const posts = groupedPosts[categoryName] || [];
            return posts.map(transformPostToEventCard);
        }
    }, [categoryName, groupedPosts]);

    // Filter events based on criteria
    const filterEvents = useCallback((events: EventCardProps[]): EventCardProps[] => {
        let filtered = events;

        // Filter by neighborhood
        if (neighborhoodFilter !== 'All') {
            filtered = filtered.filter(event => 
                event.location.includes(neighborhoodFilter)
            );
        }

        // Filter by price
        if (priceFilter !== 'All') {
            filtered = filtered.filter(event => {
                if (priceFilter === 'Free') {
                    return event.price === 'Free' || event.price === '0';
                } else if (priceFilter === 'Low') {
                    return event.price === 'Low';
                } else if (priceFilter === 'Medium') {
                    return event.price === 'Medium';
                } else if (priceFilter === 'High') {
                    return event.price === 'High';
                }
                return true;
            });
        }

        return filtered;
    }, [neighborhoodFilter, priceFilter]);

    // Sort events
    const sortEvents = useCallback((events: EventCardProps[]): EventCardProps[] => {
        const sorted = [...events];
        
        switch (sortOrder) {
            case 'Most recent':
                return sorted.reverse(); // Assuming newer items are at the end
            case 'Oldest first':
                return sorted;
            case 'Price: Low to High':
                return sorted.sort((a, b) => {
                    const priceA = a.price === 'Free' ? 0 : (a.price === 'Low' ? 1 : a.price === 'Medium' ? 2 : 3);
                    const priceB = b.price === 'Free' ? 0 : (b.price === 'Low' ? 1 : b.price === 'Medium' ? 2 : 3);
                    return priceA - priceB;
                });
            case 'Price: High to Low':
                return sorted.sort((a, b) => {
                    const priceA = a.price === 'Free' ? 0 : (a.price === 'Low' ? 1 : a.price === 'Medium' ? 2 : 3);
                    const priceB = b.price === 'Free' ? 0 : (b.price === 'Low' ? 1 : b.price === 'Medium' ? 2 : 3);
                    return priceB - priceA;
                });
            case 'Featured':
            default:
                return sorted;
        }
    }, [sortOrder]);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isFilterOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isFilterOpen]);

    const categories = getApiCategories();

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
                setIsFilterOpen(false);
                setTempCategory(categoryName);
                setTempNeighborhood(neighborhoodFilter);
                setTempPrice(priceFilter);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [categoryName, neighborhoodFilter, priceFilter]);

    const getFilteredEvents = useCallback(() => {
        const categoryEvents = getCategoryEvents();
        const filtered = filterEvents(categoryEvents);
        const sorted = sortEvents(filtered);
        return sorted;
    }, [filterEvents, getCategoryEvents, sortEvents]);

    useEffect(() => {
        const filteredEvents = getFilteredEvents();
        setDisplayedEvents(filteredEvents.slice(0, eventsPerPage));
        setCurrentPage(1);
    }, [getFilteredEvents, eventsPerPage]);

    const loadMoreEvents = () => {
        setLoading(true);

        setTimeout(() => {
            const filteredEvents = getFilteredEvents();
            const nextPage = currentPage + 1;
            const startIndex = (nextPage - 1) * eventsPerPage;
            const endIndex = nextPage * eventsPerPage;

            setDisplayedEvents([...displayedEvents, ...filteredEvents.slice(startIndex, endIndex)]);
            setCurrentPage(nextPage);
            setLoading(false);
        }, 800);
    };

    return (
        <section className="py-6 md:py-6 bg-gray-50">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="text-left mb-6 md:mb-5">
                    <div className="mt-0 md:mt-2 flex items-center justify-between px-2 sm:px-0">
                        <div className="flex items-center space-x-2 overflow-hidden">
                            <h1 className="text-base  text-[#1C1C1C] truncate">{categoryName}</h1>
                        </div>
                        <div className="flex items-center space-x-2 flex-shrink-0">
                            <div ref={filterRef} className="relative inline-block">
                                <button
                                    onClick={() => {
                                        setTempCategory(categoryName);
                                        setTempNeighborhood(neighborhoodFilter);
                                        setTempPrice(priceFilter);
                                        setIsFilterOpen(!isFilterOpen);
                                    }}
                                    className="py-1.5 px-2  flex items-center bg-[#0063BF]/[0.1] hover:bg-[#0063BF]/[.3] text-[#1C1C1C] font-medium rounded-full transition-colors"
                                >
                                    <span className="text-xs pr-1">Filter</span>
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <mask id="mask0_547_33587" maskUnits="userSpaceOnUse" x="0" y="0" width="12" height="12">
                                            <rect width="12" height="12" fill="#D9D9D9" />
                                        </mask>
                                        <g mask="url(#mask0_547_33587)">
                                            <path d="M5 9V8H7V9H5ZM3 6.5V5.5H9V6.5H3ZM1.5 4V3H10.5V4H1.5Z" fill="#1C1B1F" />
                                        </g>
                                    </svg>
                                </button>

                                {isFilterOpen && (
                                    <>
                                        {/* Dark overlay */}
                                        <div
                                            className="fixed inset-0 bg-black bg-opacity-50 z-40 overscroll-none"
                                            onClick={() => {
                                                setIsFilterOpen(false);
                                                setTempCategory(categoryName);
                                                setTempNeighborhood(neighborhoodFilter);
                                                setTempPrice(priceFilter);
                                            }}
                                        ></div>

                                        {/* Filter modal */}
                                        <div className="fixed top-16 md:top-40 left-1/2 transform -translate-x-1/2 w-[95%] md:w-11/12 max-w-4xl bg-white shadow-lg z-50 rounded-xl overflow-hidden max-h-[85vh]">
                                            <div className="px-4 py-6 md:px-6 md:py-6 overflow-y-auto max-h-[85vh]">
                                                <div className="flex justify-between items-center mb-6">
                                                    <h3 className="text-base font-semibold text-[#1C1C1C]">Filter</h3>
                                                    <button
                                                        onClick={() => {
                                                            setIsFilterOpen(false);
                                                            setTempCategory(categoryName);
                                                            setTempNeighborhood(neighborhoodFilter);
                                                            setTempPrice(priceFilter);
                                                        }}
                                                        className="text-[#1C1C1C] hover:text-gray-700"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                    </button>
                                                </div>

                                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                                                    <div>
                                                        <label className="block text-sm font-medium text-[#939393] mb-2">Categories</label>
                                                        <div className="relative">
                                                            <select
                                                                value={tempCategory}
                                                                onChange={(e) => setTempCategory(e.target.value)}
                                                                className="block w-full rounded-xl border border-[#939393] py-2 sm:py-3 pl-3 sm:pl-4 pr-8 sm:pr-10 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none text-[#939393] placeholder-[#939393]"
                                                            >
                                                                {categories.map((category: string) => (
                                                                    <option key={category} value={category}>
                                                                        {category} {category !== 'All' && `(${getCategoryCount(category)})`}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 sm:px-4 text-gray-700">
                                                                <svg className="h-4 w-4 sm:h-5 sm:w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <label className="block text-sm font-medium text-[#939393] mb-2">Neighborhood</label>
                                                        <div className="relative">
                                                            <select
                                                                value={tempNeighborhood}
                                                                onChange={(e) => setTempNeighborhood(e.target.value)}
                                                                className="block w-full rounded-xl border border-[#939393] py-2 sm:py-3 pl-3 sm:pl-4 pr-8 sm:pr-10 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none text-[#939393] placeholder-[#939393]"
                                                            >
                                                                {getUniqueNeighborhoods().map((neighborhood: string) => (
                                                                    <option key={neighborhood} value={neighborhood}>
                                                                        {neighborhood}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 sm:px-4 text-gray-700">
                                                                <svg className="h-4 w-4 sm:h-5 sm:w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <label className="block text-sm font-medium text-[#939393] mb-2">Price</label>
                                                        <div className="relative">
                                                            <select
                                                                value={tempPrice}
                                                                onChange={(e) => setTempPrice(e.target.value)}
                                                                className="block w-full rounded-xl border border-[#939393] py-2 sm:py-3 pl-3 sm:pl-4 pr-8 sm:pr-10 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none text-[#939393] placeholder-[#939393]"
                                                            >
                                                                <option value="All">All</option>
                                                                <option value="Free">Free</option>
                                                                <option value="Under $10">Under $10</option>
                                                                <option value="$10 - $25">$10 - $25</option>
                                                                <option value="$25 - $50">$25 - $50</option>
                                                                <option value="$50+">$50+</option>
                                                            </select>
                                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 sm:px-4 text-gray-700">
                                                                <svg className="h-4 w-4 sm:h-5 sm:w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex justify-center mt-6 sm:mt-8 pb-4 sm:pb-4">
                                                    <button
                                                        onClick={() => {
                                                            setNeighborhoodFilter(tempNeighborhood);
                                                            setPriceFilter(tempPrice);
                                                            setIsFilterOpen(false);

                                                            if (tempCategory !== categoryName) {
                                                                if (tempCategory === 'All') {
                                                                    window.location.href = '/';
                                                                } else {
                                                                    const slug = tempCategory.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                                                                    window.location.href = `/categories/${slug}`;
                                                                }
                                                            }
                                                        }}
                                                        className="bg-[#0063BF] text-white font-medium py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl w-full max-w-4xl hover:bg-[#0057A8] transition-colors"
                                                    >
                                                        Apply filter
                                                    </button>
                                                </div>

                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>

                            <div className="relative inline-block">
                                <button
                                    onClick={() => setIsSortOpen(!isSortOpen)}
                                    className={`flex items-center font-medium rounded-full transition-colors px-2 py-1.5 ${isSortOpen
                                            ? 'bg-[#0063BF] text-white'
                                            : 'bg-[#0063BF]/[0.1] hover:bg-[#0063BF]/[.3] text-[#1C1C1C]'
                                        }`}
                                >
                                    <span className="text-xs mr-2">Sort by:</span>
                                    <span className="text-xs mr-2">{sortOrder}</span>
                                    <svg className={`h-4 w-4 transition-transform ${isSortOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>

                                {isSortOpen && (
                                    <>
                                        <div
                                            className="fixed inset-0 z-10"
                                            onClick={() => setIsSortOpen(false)}
                                        ></div>

                                        <div className="absolute right-0 mt-2 w-60 bg-white rounded-lg shadow-lg z-20 ">
                                            <div
                                                className={`px-4 py-3 cursor-pointer hover:bg-gray-50 flex items-center ${sortOrder === 'Top-rated' ? 'bg-[#0063BF1A]/[.1] rounded-lg' : ''}`}
                                                onClick={() => {
                                                    setSortOrder('Top-rated');
                                                    setIsSortOpen(false);
                                                }}
                                            >
                                                <span className="text-[#1c1c1c] text-base ">Top-rated</span>
                                            </div>
                                            <div
                                                className={`px-4 py-3 cursor-pointer hover:bg-gray-50 flex items-center ${sortOrder === 'Most recent' ? 'bg-[#0063BF1A]/[.1] rounded-lg' : ''}`}
                                                onClick={() => {
                                                    setSortOrder('Most recent');
                                                    setIsSortOpen(false);
                                                }}
                                            >
                                                <span className="text-[#1c1c1c] text-base ">Most recent</span>
                                            </div>
                                            <div
                                                className={`px-4 py-3 cursor-pointer hover:bg-gray-50 flex items-center ${sortOrder === 'Featured' ? 'bg-[#0063BF1A]/[.1] rounded-lg' : ''}`}
                                                onClick={() => {
                                                    setSortOrder('Featured');
                                                    setIsSortOpen(false);
                                                }}
                                            >
                                                <span className="text-[#1c1c1c] text-base">Featured</span>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 px-2 md:px-0">
                    {displayedEvents.length > 0 ? (
                        displayedEvents.map((event, index) => (
                            <div key={event.id} className="w-full animate-fadeIn" style={{ animationDelay: `${index * 0.05}s` }}>
                                <EventCard {...event} navigationCategory={categoryName} />
                            </div>
                        ))
                    ) : (
                        <div className="col-span-1 md:col-span-2 lg:col-span-3 py-20 text-center">
                            <div className="inline-block p-4 rounded-full bg-blue-100 mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-medium text-[#1C1C1C]">No events found</h3>
                            <p className="mt-2 text-[#939393]">
                                There are no {categoryName} events currently available.
                            </p>
                        </div>
                    )}
                </div>

                <div className="mt-10 text-center">
                    {displayedEvents.length < getFilteredEvents().length && (
                        <button
                            className="bg-[#0063BF] hover:bg-[#0057A8] text-white font-medium py-3 px-6 rounded-xl transition-colors flex items-center justify-center mx-auto"
                            onClick={loadMoreEvents}
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Loading...
                                </>
                            ) : (
                                'Load More Events'
                            )}
                        </button>
                    )}
                    {displayedEvents.length > 0 && (
                        <div className="mt-4 text-sm text-[#939393]">
                            Showing {displayedEvents.length} of {getFilteredEvents().length} {categoryName} events
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default CategoryEventSection;
