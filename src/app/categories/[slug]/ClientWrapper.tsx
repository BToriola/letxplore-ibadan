"use client";

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import HeroSection from '@/components/ui/HeroSection';
import CategoryEventSection from './CategoryEventSection';
import { usePostsByCategories } from '@/hooks/useApi';
import { useLocation } from '@/contexts/LocationContext';

interface ClientWrapperProps {
  categoryName: string;
}

export default function ClientWrapper({ categoryName }: ClientWrapperProps) {
  const router = useRouter();
  const { selectedLocation } = useLocation();
  const [sharedCategory, setSharedCategory] = useState(categoryName);

  // Fetch grouped posts data
  const groupedPostsFilters = useMemo(() => ({
    city: selectedLocation,
  }), [selectedLocation]);

  const { 
    loading: groupedPostsLoading, 
    error: groupedPostsError, 
    groupedPosts 
  } = usePostsByCategories(groupedPostsFilters);

  const handleCategoryChange = (newCategory: string) => {
    setSharedCategory(newCategory);
    
    if (newCategory === "All") {
      router.push('/');
    } else {
      const slug = newCategory.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      router.push(`/categories/${slug}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <HeroSection 
          activeCategory={sharedCategory}
          onCategoryChange={handleCategoryChange}
          groupedPosts={groupedPosts}
        />
        <CategoryEventSection 
          categoryName={categoryName} 
          groupedPosts={groupedPosts}
        />
      </main>
    </div>
  );
}
