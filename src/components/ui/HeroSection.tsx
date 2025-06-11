"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import CategoryNavigation from './CategoryNavigation';
import FilterBar from './FilterBar';
import '../../styles/hero.css';

interface HeroSectionProps {
  activeCategory?: string;
  onCategoryChange?: (category: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  activeCategory: sharedCategory = "All",
  onCategoryChange: sharedCategoryChange = () => {},
}) => {
  // Local state that stays in sync with shared state
  const [activeCategory, setActiveCategory] = useState(sharedCategory);

  // Keep local state in sync with shared state
  useEffect(() => {
    setActiveCategory(sharedCategory);
  }, [sharedCategory]);
  
  // Category data
  const categories = ["All", "Events", "Eat & drink", "Stay", "See & do", "Shopping"];

  // Filter options
  const dateOptions = [
    { value: 'today', label: 'Today' },
    { value: 'tomorrow', label: 'Tomorrow' },
    { value: 'this-week', label: 'This week' },
    { value: 'this-month', label: 'This month' }
  ];

  const priceOptions = [
    { value: 'free', label: 'Free' },
    { value: 'paid', label: 'Paid' },
    { value: 'below-5000', label: 'Below ₦5,000' },
    { value: '5000-10000', label: '₦5,000 - ₦10,000' },
    { value: 'above-10000', label: 'Above ₦10,000' }
  ];

  const sortOptions = [
    { value: 'popular', label: 'Most popular' },
    { value: 'newest', label: 'Newest' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' }
  ];

  // Handlers
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    // Also update the shared state to sync with EventsSection
    sharedCategoryChange(category);
  };

  const handleDateFilterChange = (value: string) => {
    console.log('Date filter changed:', value);
    // Implement filter logic
  };

  const handlePriceFilterChange = (value: string) => {
    console.log('Price filter changed:', value);
    // Implement filter logic
  };

  const handleSortChange = (value: string) => {
    console.log('Sort changed:', value);
    // Implement sort logic
  };

  return (
    <section className="relative overflow-hidden bg-blue-800 pt-24">
      <div className="absolute inset-0">
        <img
          src="/images/cityscape.png"
          alt="Ibadan cityscape background"
          className="w-full h-full object-cover object-bottom opacity-80"
          draggable="false"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-4 relative z-10">
        {/* Hero Content */}
        <div className="text-center text-white max-w-3xl mx-auto pt-16">
          <h1 className="font-primera font-semibold hero-title mb-4">
            LetXplore Ibadan
          </h1>
          <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Search, discover, and connect with the best local
            experiences powered by your community.
          </p>

          {/* Category Navigation */}
          <div className="mb-8">
            <CategoryNavigation
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={handleCategoryChange}
              variant="hero"
            />
          </div>

        
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
