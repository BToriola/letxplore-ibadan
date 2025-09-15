"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LocationProvider } from "../contexts/LocationContext";
import { AuthProvider } from "../contexts/AuthContext";
import { SearchProvider } from "../contexts/SearchContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SearchProvider>
        <LocationProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </LocationProvider>
      </SearchProvider>
    </QueryClientProvider>
  );
}
