"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import EventCard, { EventCardProps } from './EventCard';
import CategoryEventsRow from './CategoryEventsRow';
import {
    getUniqueCategories,
    getCategoryCount,
    filterEvents,
    sortEvents
} from '../../data/events';

interface EventsSectionProps {
    activeCategory?: string;
    onCategoryChange?: (category: string) => void;
}

const EventsSection: React.FC<EventsSectionProps> = ({
    activeCategory: sharedCategory = 'All',
    onCategoryChange: sharedCategoryChange = () => { },
}) => {
    const [loading, setLoading] = useState(false);
    const [displayedEvents, setDisplayedEvents] = useState<EventCardProps[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [activeCategory, setActiveCategory] = useState(sharedCategory);
    const [dateFilter, setDateFilter] = useState('All dates');
    const [sortOrder, setSortOrder] = useState('Most recent');
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    // State for filter values in the modal
    const [tempCategory, setTempCategory] = useState(sharedCategory);
    const [tempNeighborhood, setTempNeighborhood] = useState('All');
    const [tempPrice, setTempPrice] = useState('All');

    // Actual filter values that are applied
    const [neighborhoodFilter, setNeighborhoodFilter] = useState('All');
    const [priceFilter, setPriceFilter] = useState('All');
    const eventsPerPage = 12;
    const filterRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setActiveCategory(sharedCategory);
        setTempCategory(sharedCategory);
    }, [sharedCategory]);

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

    const categories = getUniqueCategories();

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
                setIsFilterOpen(false);
                setTempCategory(activeCategory);
                setTempNeighborhood(neighborhoodFilter);
                setTempPrice(priceFilter);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [activeCategory, neighborhoodFilter, priceFilter]);

    const getFilteredEvents = useCallback(() => {
        const filtered = filterEvents(activeCategory, dateFilter, neighborhoodFilter, priceFilter);
        return sortEvents(filtered, sortOrder);
    }, [activeCategory, dateFilter, neighborhoodFilter, priceFilter, sortOrder]);

    useEffect(() => {
        const filteredEvents = getFilteredEvents();
        setDisplayedEvents(filteredEvents.slice(0, eventsPerPage));
        setCurrentPage(1);
    }, [getFilteredEvents, eventsPerPage]);

    const handleCategoryChange = (category: string, filteredEvents?: EventCardProps[]) => {
        setActiveCategory(category);
        sharedCategoryChange(category);

        if (filteredEvents) {
            const sortedEvents = sortEvents(filteredEvents, sortOrder);
            setDisplayedEvents(sortedEvents.slice(0, eventsPerPage));
            setCurrentPage(1);
        }
    };

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

    const getCategoryEvents = (categoryName: string) => {
        const filtered = filterEvents(categoryName, dateFilter);
        return sortEvents(filtered, sortOrder).slice(0, 8);
    };

    // Get list of main categories (excluding "All")
    const getMainCategories = () => {
        return categories.filter(cat => cat !== 'All');
    };

    // Handler when user clicks "See all" on a category row
    const handleSeeAll = (categoryName: string) => {
        const filtered = filterEvents(categoryName, dateFilter, neighborhoodFilter, priceFilter);
        const sorted = sortEvents(filtered, sortOrder);
        setActiveCategory(categoryName);
        sharedCategoryChange(categoryName);
        setDisplayedEvents(sorted);
        setCurrentPage(1);
    };

    return (
        <section className="pt-6 md:pt-12  bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {activeCategory !== 'All' && (
                    <div className="text-left mb-10">
                        <div className="mt-2 flex items-center justify-between px-4 sm:px-0">
                            <div className="flex items-center space-x-2 overflow-hidden">
                                <h1 className="text-base md:text-2xl font-semibold text-[#1C1C1C] truncate">{activeCategory}</h1>
                            </div>
                            <div className="flex items-center space-x-4 flex-shrink-0">
                                <div ref={filterRef} className="relative inline-block">
                                    <button
                                        onClick={() => {
                                            setTempCategory(activeCategory);
                                            setTempNeighborhood(neighborhoodFilter);
                                            setTempPrice(priceFilter);
                                            setIsFilterOpen(!isFilterOpen);
                                        }}
                                        className="pl-4 py-2 pr-4  flex items-center bg-[#0063BF]/[0.1] hover:bg-[#0063BF]/[.3] text-[#1C1C1C] font-medium rounded-full transition-colors"
                                    >
                                        <span className="text-xs pr-2">Filter</span>
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
                                                    setTempCategory(activeCategory);
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
                                                                // Reset temp values when closing with X button
                                                                setTempCategory(activeCategory);
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
                                                        {/* Categories Dropdown */}
                                                        <div>
                                                            <label className="block text-sm font-medium text-[#939393] mb-2">Categories</label>
                                                            <div className="relative">
                                                                <select
                                                                    value={tempCategory}
                                                                    onChange={(e) => setTempCategory(e.target.value)}
                                                                    className="block w-full rounded-xl border border-[#939393] py-2 sm:py-3 pl-3 sm:pl-4 pr-8 sm:pr-10 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none text-[#939393] placeholder-[#939393]"
                                                                >
                                                                    {categories.map((category) => (
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

                                                        {/* Neighborhood Dropdown */}
                                                        <div>
                                                            <label className="block text-sm font-medium text-[#939393] mb-2">Neighborhood</label>
                                                            <div className="relative">
                                                                <select
                                                                    value={tempNeighborhood}
                                                                    onChange={(e) => setTempNeighborhood(e.target.value)}
                                                                    className="block w-full rounded-xl border border-[#939393] py-2 sm:py-3 pl-3 sm:pl-4 pr-8 sm:pr-10 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none text-[#939393] placeholder-[#939393]"
                                                                >
                                                                    <option value="All">All</option>
                                                                    <option value="Downtown">Downtown</option>
                                                                    <option value="Bodija">Bodija</option>
                                                                    <option value="Mokola">Mokola</option>
                                                                    <option value="Ring Road">Ring Road</option>
                                                                    <option value="Dugbe">Dugbe</option>
                                                                    <option value="Iwo Road">Iwo Road</option>
                                                                </select>
                                                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 sm:px-4 text-gray-700">
                                                                    <svg className="h-4 w-4 sm:h-5 sm:w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                                    </svg>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Price Dropdown */}
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
                                                                // Apply all filter values at once
                                                                setActiveCategory(tempCategory);
                                                                sharedCategoryChange(tempCategory);
                                                                setNeighborhoodFilter(tempNeighborhood);
                                                                setPriceFilter(tempPrice);
                                                                setIsFilterOpen(false);
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
                                    <div className="flex items-center bg-[#0063BF]/[0.1] hover:bg-[#0063BF]/[.3] text-[#1C1C1C] font-medium rounded-full transition-colors">
                                        <span className="pl-4 py-2 text-xs">Sort by:</span>
                                        <select
                                            value={sortOrder}
                                            onChange={(e) => setSortOrder(e.target.value)}
                                            className="appearance-none bg-transparent border-none text-[#1C1C1C] py-2 pl-1 pr-8 focus:outline-none text-xs font-medium cursor-pointer"
                                        >
                                            <option value="Top-rated">Top-rated</option>
                                            <option value="Most recent">Most recent</option>
                                            <option value="Featured">Featured</option>
                                        </select>
                                        <div className="pointer-events-none flex items-center px-2 text-gray-700">
                                            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Show category rows when "All" is selected */}
                {activeCategory === 'All' ? (
                    <div className="md:space-y-4 space-y-0 h-full">
                        {getMainCategories().map((category) => (
                            <CategoryEventsRow
                                key={category}
                                categoryName={category}
                                events={getCategoryEvents(category)}
                                onSeeAll={handleSeeAll}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {displayedEvents.length > 0 ? (
                            displayedEvents.map((event, index) => (
                                <div key={event.id} className="flex justify-center animate-fadeIn h-full" style={{ animationDelay: `${index * 0.05}s` }}>
                                    <EventCard {...event} navigationCategory={activeCategory} />
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
                                    {activeCategory !== 'All' && dateFilter !== 'All dates'
                                        ? `There are no ${activeCategory} events for ${dateFilter.toLowerCase()}.`
                                        : activeCategory !== 'All'
                                            ? `There are no ${activeCategory} events currently available.`
                                            : dateFilter !== 'All dates'
                                                ? `There are no events for ${dateFilter.toLowerCase()}.`
                                                : 'There are no events currently available.'}
                                </p>
                                <button
                                    className="mt-4 inline-flex items-center px-6 py-3 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-[#0063BF] hover:bg-[#0057A8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                                    onClick={() => {
                                        // Reset all filters to default
                                        handleCategoryChange('All');
                                        setDateFilter('All dates');
                                        setNeighborhoodFilter('All');
                                        setPriceFilter('All');

                                        // Also reset temp values
                                        setTempCategory('All');
                                        setTempNeighborhood('All');
                                        setTempPrice('All');
                                    }}
                                >
                                    Reset filters
                                </button>
                            </div>
                        )}
                    </div>
                )}

                <div className=" text-center">
                    {activeCategory !== 'All' && displayedEvents.length < getFilteredEvents().length && (
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
                    {activeCategory !== 'All' && (
                        <div className="mt-4 text-sm text-[#939393]">
                            Showing {displayedEvents.length} of {getFilteredEvents().length} {activeCategory} events
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default EventsSection;
