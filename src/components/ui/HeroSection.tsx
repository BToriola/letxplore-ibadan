"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import CategoryNavigation from './CategoryNavigation';
import '../../styles/hero.css';

interface HeroSectionProps {
  activeCategory?: string;
  onCategoryChange?: (category: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  activeCategory: sharedCategory = "All",
  onCategoryChange: sharedCategoryChange = () => {},
}) => {
  const [activeCategory, setActiveCategory] = useState(sharedCategory);

  useEffect(() => {
    setActiveCategory(sharedCategory);
  }, [sharedCategory]);
  
  const categories = ["All", "Events", "Eat & drink", "Stay", "See & do",  "Services", "Shop"];

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    sharedCategoryChange(category);
  };


  return (
    <section className="relative overflow-hidden bg-blue-800 pt-24">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/50  z-10"></div>
        <Image
          src="/images/cityscape.png"
          alt="Ibadan cityscape background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-bottom opacity-80"
          draggable="false"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-4 relative z-10">
        {/* Hero Content */}
        <div className="text-center text-white w-full mx-auto pt-4">
          <h1 className="font-primera font-medium hero-title mb-4">
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
