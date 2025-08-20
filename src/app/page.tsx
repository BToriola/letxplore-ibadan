// Create a client component wrapper for state sharing
"use client";
import React, { useState, useEffect } from "react";

// Import UI components
import HeroSection from "@/components/ui/HeroSection";
import EventsSection from "@/components/ui/EventsSection";
import ReviewsSection from "@/components/ui/ReviewsSection";

// Import API hooks for testing
import { usePosts, usePostsByCategories } from "@/hooks/useApi";
import { useLocation } from "@/contexts/LocationContext";

export default function Home() {
  // Shared state for category between hero and events sections
  const [sharedCategory, setSharedCategory] = useState("All");

  // Get current location from context
  const { selectedLocation } = useLocation();

  // Test API endpoints - only for console logging
  const { loading: postsLoading, error: postsError } = usePosts({
    category: sharedCategory !== 'All' ? sharedCategory : undefined,
    city: selectedLocation, // Always include the city parameter
    limit: 10
  });

  // New hook for grouped posts by categories (3 posts per category like in screenshot)
  const { 
    loading: groupedPostsLoading, 
    error: groupedPostsError, 
    groupedPosts 
  } = usePostsByCategories({
    city: selectedLocation, // Always include the city parameter
  }, 3); // Limit to 3 posts per category as shown in screenshot

  // Log API status to console
  useEffect(() => {
    console.log('API Loading States:', {
      posts: postsLoading,
      groupedPosts: groupedPostsLoading
    });
  }, [postsLoading, groupedPostsLoading]);

  useEffect(() => {
    if (postsError || groupedPostsError) {
      console.log('API Errors:', {
        posts: postsError,
        groupedPosts: groupedPostsError
      });
    }
  }, [postsError, groupedPostsError]);

  // Log grouped posts data structure
  useEffect(() => {
    if (groupedPosts && Object.keys(groupedPosts).length > 0) {
      console.log('=== GROUPED POSTS BY CATEGORIES ===');
      Object.entries(groupedPosts).forEach(([category, posts]) => {
        console.log(`Category: ${category} - ${posts.length} posts:`, posts);
      });
      console.log('=== END GROUPED POSTS ===');
    }
  }, [groupedPosts]);

  // Handler function to update the category in both components
  const handleCategoryChange = (category: string) => {
    console.log('Category changed to:', category);
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
          />
          <ReviewsSection />
        </main>
      </div>
    </>
  );
}
