// Create a client component wrapper for state sharing
"use client";
import React from "react";

// Import layout components
import Header from "@/components/layout/Header";

// Import UI components
import HeroSection from "@/components/ui/HeroSection";
import EventsSection from "@/components/ui/EventsSection";



import { useState } from "react";

export default function Home() {
  // Shared state for category between hero and events sections
  const [sharedCategory, setSharedCategory] = useState("All");

  // Handler function to update the category in both components
  const handleCategoryChange = (category: string) => {
    setSharedCategory(category);
  };

  return (
    <>
      <div className="relative">
        <Header />
        <main>
          <HeroSection 
            activeCategory={sharedCategory} 
            onCategoryChange={handleCategoryChange} 
          />
          <EventsSection 
            activeCategory={sharedCategory} 
            onCategoryChange={handleCategoryChange} 
          />
        </main>
      </div>
    </>
  );
}
