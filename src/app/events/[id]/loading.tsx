import React from 'react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row animate-pulse">
          {/* Left section */}
          <div className="flex-1">
            {/* Image placeholder */}
            <div className="bg-gray-300 rounded-lg mb-6 h-96 w-full"></div>
            
            {/* Action buttons placeholder */}
            <div className="flex mb-6">
              <div className="h-8 w-20 bg-gray-300 rounded-full mr-4"></div>
              <div className="h-8 w-20 bg-gray-300 rounded-full"></div>
            </div>
            
            {/* Title and description placeholder */}
            <div className="mb-8">
              <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-300 rounded w-full"></div>
                <div className="h-4 bg-gray-300 rounded w-full"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6"></div>
              </div>
            </div>
            
            {/* More images placeholder */}
            <div className="mb-10">
              <div className="h-6 bg-gray-300 rounded w-40 mb-4"></div>
              <div className="grid grid-cols-5 gap-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="bg-gray-300 rounded-lg aspect-square"></div>
                ))}
              </div>
            </div>
            
            {/* Similar events placeholder */}
            <div>
              <div className="h-6 bg-gray-300 rounded w-60 mb-4"></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gray-300 h-36 w-full"></div>
                    <div className="p-4">
                      <div className="h-5 bg-gray-300 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right sidebar */}
          <div className="w-full md:w-80 md:ml-8 flex-shrink-0 mt-8 md:mt-0">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="h-5 bg-gray-300 rounded w-20 mb-6"></div>
              
              <div className="space-y-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i}>
                    <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
                    <div className="flex items-center">
                      <div className="h-4 w-4 bg-gray-300 rounded-full mr-2"></div>
                      <div className="h-4 bg-gray-300 rounded w-36"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
