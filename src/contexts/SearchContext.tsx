"use client";

import React, { createContext, useContext, useState } from 'react';
import { EventCardProps } from '@/components/ui/EventCard';

interface SearchContextType {
  searchResults: EventCardProps[];
  setSearchResults: (results: EventCardProps[]) => void;
  isSearching: boolean;
  setIsSearching: (isSearching: boolean) => void;
}

const SearchContext = createContext<SearchContextType>({
  searchResults: [],
  setSearchResults: () => {},
  isSearching: false,
  setIsSearching: () => {},
});

export const useSearch = () => useContext(SearchContext);

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchResults, setSearchResults] = useState<EventCardProps[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  return (
    <SearchContext.Provider 
      value={{ 
        searchResults, 
        setSearchResults,
        isSearching,
        setIsSearching,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
