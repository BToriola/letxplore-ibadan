"use client";

import React, { useState, useMemo } from "react";

import HeroSection from "@/components/ui/HeroSection";
import EventsSection from "@/components/ui/EventsSection";
import ReviewsSection from "@/components/ui/ReviewsSection";

import { usePosts, usePostsByCategories } from "@/hooks/useApi";
import { useLocation } from "@/contexts/LocationContext";

export default function Home() {
  // Shared state for category between hero and events sections
  const [sharedCategory, setSharedCategory] = useState("All");

  // Get current location from context
  const { selectedLocation } = useLocation();

  // Memoize the filters to prevent unnecessary re-renders
  const postsFilters = useMemo(() => ({
    category: sharedCategory !== 'All' ? sharedCategory : undefined,
    city: selectedLocation,
    limit: 10
  }), [sharedCategory, selectedLocation]);

  const groupedPostsFilters = useMemo(() => ({
    city: selectedLocation,
  }), [selectedLocation]);

  usePosts(postsFilters);

  // New hook for grouped posts by categories (fetch all posts from API)
  const { 
    groupedPosts 
  } = usePostsByCategories(groupedPostsFilters);


  // Handler function to update the category in both components
  const handleCategoryChange = (category: string) => {
    setSharedCategory(category);
  };

  return (
    <>
      <div className="relative">
        <main>
          <HeroSection 
            activeCategory={sharedCategory} 
            onCategoryChange={handleCategoryChange} 
          />
          <EventsSection 
            activeCategory={sharedCategory} 
            onCategoryChange={handleCategoryChange}
            groupedPosts={groupedPosts}
          />
          <ReviewsSection groupedPosts={groupedPosts} />
        </main>
      </div>
    </>
  );
}