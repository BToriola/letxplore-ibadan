"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Header from '../layout/Header';
import CategoryNavigation from './CategoryNavigation';
import { useLocation } from '../../contexts/LocationContext';
import '../../styles/hero.css';

interface HeroSectionProps {
  activeCategory?: string;
  onCategoryChange?: (category: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  activeCategory: sharedCategory = "All",
  onCategoryChange: sharedCategoryChange = () => {},
}) => {
  const { selectedLocation } = useLocation();
  const [activeCategory, setActiveCategory] = useState(sharedCategory);
  const [heroHeight, setHeroHeight] = useState(0);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setActiveCategory(sharedCategory);
  }, [sharedCategory]);

  useEffect(() => {
    // Handle scroll events
    const handleScroll = () => {
      const position = window.scrollY;
      
      // Determine if hero content should collapse
      if (position > 100) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };

    // Measure hero section height once rendered
    const updateHeight = () => {
      if (heroRef.current) {
        // Calculate initial full height
        setHeroHeight(heroRef.current.offsetHeight);
      }
    };
    
    // Initial measurement
    updateHeight();
    
    // Add event listeners
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', updateHeight);
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateHeight);
    };
  }, []);
  
  const categories = ["All", "Events", "Eat & drink", "Stay", "See & do",  "Services", "Shop"];

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    sharedCategoryChange(category);
  };


  // Calculate dynamic height based on scroll position
  const collapsedHeightMobile = 200; // Reduced height for mobile
  const collapsedHeightDesktop = 250; // Keep desktop height at 250px
  const collapsedHeight = typeof window !== 'undefined' && window.innerWidth < 768 ? collapsedHeightMobile : collapsedHeightDesktop;

  return (
    <>
      {/* Fixed Hero Section with dynamic height */}
      <section 
        ref={heroRef} 
        className="fixed top-0 left-0 right-0 overflow-hidden bg-blue-800 z-50 transition-all duration-500"
        style={{ 
          height: isCollapsed ? `${collapsedHeight}px` : 'auto',
          boxShadow: isCollapsed ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none'
        }}
      >
        {/* Header integrated into Hero - always visible */}
        <div className="z-50">
          <Header />
        </div>
        
        {/* Background Image */}
        <div className={`transition-all duration-500 ${isCollapsed ? 'mt-0' : 'mt-8 md:mt-16'}`}>
          {/* Transparent overlay to avoid a dark strip showing between sections */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-transparent z-10"></div>
          <Image
            src="/images/cityscape.png"
            alt="Ibadan cityscape background"
            fill
            priority
            sizes="100vw"
            className={`object-cover object-center transition-all duration-500 ${
              isCollapsed ? 'object-center' : 'object-center md:object-bottom'
            } opacity-80`}
            draggable="false"
          />
        </div>

        {/* Hero Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1 md:py-3 relative z-10 pt-20 md:pt-20">
          {/* Hero Title and Description */}
          <div 
            ref={contentRef} 
            className={`text-center text-white w-full mx-auto pt-2 transition-all duration-500 ${
              isCollapsed ? 'opacity-0 transform -translate-y-10 h-0 overflow-hidden' : 'opacity-100'
            }`}
          >
            <h1 className="font-primera font-medium hero-title mb-4">
              Hello {selectedLocation}
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              Search, discover, and connect with the best local
              experiences powered by your community.
            </p>
          </div>
          
          {/* Category Navigation - Shows in original position when not scrolled */}
          <div className={`transition-all duration-500 mb-4 ${
            isCollapsed ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'
          }`}>
            <CategoryNavigation
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={handleCategoryChange}
              variant="hero"
              enableNavigation={true}
            />
          </div>
        </div>
        
        <div className={`absolute top-16 md:top-32 left-0 right-0 transition-all duration-500 z-20 ${
          isCollapsed ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-10 pointer-events-none'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-3">
            <CategoryNavigation
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={handleCategoryChange}
              variant="collapsed"
              enableNavigation={true}
            />
          </div>
        </div>
      </section>
      
      {/* Spacer element with dynamic height */}
      <div 
        style={{ 
          height: isCollapsed ? `${collapsedHeight}px` : `${heroHeight}px`,
          transition: 'height 0.5s'
        }} 
        className="relative z-0"
      ></div>
    </>
  );
};

export default HeroSection;
