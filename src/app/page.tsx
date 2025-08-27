"use client";

import React, { useState, useEffect, useMemo } from "react";

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

  const { loading: postsLoading, error: postsError } = usePosts(postsFilters);

  // New hook for grouped posts by categories (fetch all posts from API)
  const { 
    loading: groupedPostsLoading, 
    error: groupedPostsError, 
    groupedPosts 
  } = usePostsByCategories(groupedPostsFilters);


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
        console.log(`Category: ${category} - ${Array.isArray(posts) ? posts.length : 0} posts:`, posts);
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
            groupedPosts={groupedPosts}
          />
          <ReviewsSection groupedPosts={groupedPosts} />
        </main>
      </div>
    </>
  );
}
