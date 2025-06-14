"use client";

import React, { useState, useEffect, useRef } from 'react';
import EventCard, { EventCardProps } from './EventCard';
import CategoryNavigation from './CategoryNavigation';
import CategoryEventsRow from './CategoryEventsRow';
import {
    events,
    getUniqueCategories,
    getCategoryCount,
    getDateOptions,
    filterEvents,
    sortEvents
} from '../../data/events';

interface EventsSectionProps {
    activeCategory?: string;
    onCategoryChange?: (category: string) => void;
}

const EventsSection: React.FC<EventsSectionProps> = ({
    activeCategory: sharedCategory = 'All',
    onCategoryChange: sharedCategoryChange = () => {},
}) => {
    const [loading, setLoading] = useState(false);
    const [displayedEvents, setDisplayedEvents] = useState<EventCardProps[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [activeCategory, setActiveCategory] = useState(sharedCategory);
    const [dateFilter, setDateFilter] = useState('All dates');
    const [sortOrder, setSortOrder] = useState('Most recent');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const eventsPerPage = 12;
    const filterRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setActiveCategory(sharedCategory);
    }, [sharedCategory]);

    const categories = getUniqueCategories();
    const dateOptions = getDateOptions();
    
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
                setIsFilterOpen(false);
            }
        }
        
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const getFilteredEvents = () => {
        const filtered = filterEvents(activeCategory, dateFilter);
        return sortEvents(filtered, sortOrder);
    };

    useEffect(() => {
        const filteredEvents = getFilteredEvents();
        setDisplayedEvents(filteredEvents.slice(0, eventsPerPage));
        setCurrentPage(1);
    }, [activeCategory, dateFilter, sortOrder]);

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

    // Get events for each category when in "All" view
    const getCategoryEvents = (categoryName: string) => {
        // Get up to 4 events for each category for the carousel
        const filtered = filterEvents(categoryName, dateFilter);
        return sortEvents(filtered, sortOrder).slice(0, 8);
    };

    // Get list of main categories (excluding "All")
    const getMainCategories = () => {
        return categories.filter(cat => cat !== 'All');
    };
    
    // Simple return statement to test if syntax is correct
    return (
        <section className="py-6 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {activeCategory !== 'All' && (
                    <div className="text-left mb-10">
                        <div className="mt-2 flex items-center justify-between px-4 sm:px-0">
                            <div className="flex items-center space-x-2 overflow-hidden">
                                <h1 className="text-2xl font-semibold text-[#1C1C1C] truncate">{activeCategory}</h1>
                            </div>
                            <div className="flex items-center space-x-4 flex-shrink-0">       
                                <div ref={filterRef} className="relative inline-block">
                                    <button 
                                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                                        className="flex items-center bg-[#0063BF]/[0.1] hover:bg-[#0063BF]/[.5] text-[#1C1C1C] font-medium py-2 px-4 rounded-full transition-colors"
                                    >
                                        <span className="pr-2 text-xs">Filter</span>
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
                                        <div className="absolute left-0 mt-2 w-64 rounded-xl bg-white shadow-lg z-10 overflow-hidden border border-gray-200">
                                            <div className="p-4">
                                                <h3 className="text-sm font-medium text-gray-900 mb-3">Filter by Date</h3>
                                                <div className="space-y-2">
                                                    {dateOptions.map((option) => (
                                                        <div key={option} className="flex items-center">
                                                            <input
                                                                id={`date-${option}`}
                                                                name="date-filter"
                                                                type="radio"
                                                                checked={dateFilter === option}
                                                                onChange={() => setDateFilter(option)}
                                                                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                                            />
                                                            <label htmlFor={`date-${option}`} className="ml-2 text-sm text-gray-700">
                                                                {option}
                                                            </label>
                                                        </div>
                                                    ))}
                                                </div>
                                                
                                                <div className="border-t border-gray-200 my-4"></div>
                                                
                                                <h3 className="text-sm font-medium text-gray-900 mb-3">Filter by Category</h3>
                                                <div className="space-y-2">
                                                    {categories.map((category) => (
                                                        <div key={category} className="flex items-center">
                                                            <input
                                                                id={`category-${category}`}
                                                                name="category-filter"
                                                                type="radio"
                                                                checked={activeCategory === category}
                                                                onChange={() => handleCategoryChange(category)}
                                                                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                                            />
                                                            <label htmlFor={`category-${category}`} className="ml-2 text-sm text-gray-700">
                                                                {category} {category !== 'All' && `(${getCategoryCount(category)})`}
                                                            </label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            
                                            <div className="bg-gray-50 px-4 py-3 flex justify-end">
                                                <button 
                                                    onClick={() => {
                                                        handleCategoryChange('All');
                                                        setDateFilter('All dates');
                                                        setIsFilterOpen(false);
                                                    }}
                                                    className="text-xs text-gray-600 hover:text-gray-900 mr-4"
                                                >
                                                    Reset filters
                                                </button>
                                                <button
                                                    onClick={() => setIsFilterOpen(false)}
                                                    className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium py-1 px-3 rounded-full"
                                                >
                                                    Apply
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="relative inline-block">
                                    <div className="flex items-center bg-[#0063BF]/[0.1] hover:bg-[#0063BF]/[.5] text-[#1C1C1C] font-medium rounded-full">
                                        <span className="pl-4 py-2 text-xs">Sort by:</span>
                                        <select
                                            value={sortOrder}
                                            onChange={(e) => setSortOrder(e.target.value)}
                                            className="appearance-none bg-transparent border-none text-[#1C1C1C] py-2 pl-1 pr-8 focus:outline-none text-xs font-medium cursor-pointer"
                                        >
                                            <option value="Most recent">Most recent</option>
                                            <option value="Price: Low to high">Price: Low to high</option>
                                            <option value="Price: High to low">Price: High to low</option>
                                            <option value="Alphabetical">Alphabetical</option>
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
                        <div className="space-y-8 h-full">
                            {getMainCategories().map((category) => (
                                <CategoryEventsRow 
                                    key={category}
                                    categoryName={category} 
                                    events={getCategoryEvents(category)}
                                />
                            ))}
                        </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {displayedEvents.length > 0 ? (
                            displayedEvents.map((event, index) => (
                                <div key={event.id} className="flex justify-center animate-fadeIn h-full" style={{ animationDelay: `${index * 0.05}s` }}>
                                    <EventCard {...event} />
                                </div>
                            ))
                        ) : (
                            <div className="col-span-1 md:col-span-2 lg:col-span-3 py-20 text-center">
                                <div className="inline-block p-4 rounded-full bg-blue-100 mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-medium text-gray-900">No events found</h3>
                                <p className="mt-2 text-gray-600">
                                    {activeCategory !== 'All' && dateFilter !== 'All dates'
                                        ? `There are no ${activeCategory} events for ${dateFilter.toLowerCase()}.`
                                        : activeCategory !== 'All'
                                            ? `There are no ${activeCategory} events currently available.`
                                            : dateFilter !== 'All dates'
                                                ? `There are no events for ${dateFilter.toLowerCase()}.`
                                                : 'There are no events currently available.'}
                                </p>
                                <button
                                    className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    onClick={() => {
                                        handleCategoryChange('All');
                                        setDateFilter('All dates');
                                    }}
                                >
                                    Reset filters
                                </button>
                            </div>
                        )}
                    </div>
                )}

                <div className="mt-10 text-center">
                    {activeCategory !== 'All' && displayedEvents.length < getFilteredEvents().length && (
                        <button
                            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-full transition-colors flex items-center justify-center mx-auto"
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
                        <div className="mt-4 text-sm text-gray-600">
                            Showing {displayedEvents.length} of {getFilteredEvents().length} {activeCategory} events
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default EventsSection;
