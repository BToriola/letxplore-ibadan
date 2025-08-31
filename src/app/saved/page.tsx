"use client";

import React, { useState, useEffect } from 'react';
import DetailPageHeader from '@/components/layout/DetailPageHeader';
import EventCard, { EventCardProps } from '@/components/ui/EventCard';
import { useAuth } from '@/contexts/AuthContext';
import { apiService, Post } from '@/services/api';

const transformPostToEventCard = (post: Post): EventCardProps => ({
  id: post.id,
  title: post.name,
  date: post.date || 'TBA',
  time: post.time || 'TBA',
  location: `${post.neighborhood || ''}, ${post.city || ''}`.replace(/^, /, ''),
  price: post.price || 'Free',
  image: post.featuredImageUrl || (post.images && post.images[0]) || '/default.svg',
  category: post.category,
  description: post.about,
});

export default function SavedPostsPage() {
  const { currentUser } = useAuth();
  const [savedPosts, setSavedPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      const fetchSavedPosts = async () => {
        try {
          const savedPostsResponse = await apiService.getSavedPosts(currentUser.uid);
          if (savedPostsResponse.success && savedPostsResponse.data) {
            const postPromises = savedPostsResponse.data.map(savedPost =>
              apiService.getPostById(savedPost.postId)
            );
            const postResponses = await Promise.all(postPromises);
            const posts = postResponses
              .filter(res => res.success && res.data)
              .map(res => res.data);
            setSavedPosts(posts);
          }
        } catch (error) {
          console.error("Error fetching saved posts:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchSavedPosts();
    } else {
      setLoading(false);
    }
  }, [currentUser]);

  if (!currentUser && !loading) {
    return (
      <div>
        <DetailPageHeader />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">Saved Posts</h1>
          <p>Please log in to see your saved posts.</p>
        </main>
      </div>
    );
  }

  return (
    <div>
      <DetailPageHeader />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Saved Posts</h1>
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 px-2 md:px-0">
            {savedPosts.length > 0 ? (
              savedPosts.map((post, index) => (
                <div key={post.id} className="w-full animate-fadeIn" style={{ animationDelay: `${index * 0.05}s` }}>
                  <EventCard {...transformPostToEventCard(post)} navigationCategory={post.category} />
                </div>
              ))
            ) : (
              <div className="col-span-1 md:col-span-2 lg:col-span-3 py-20 text-center">
                <div className="inline-block p-4 rounded-full bg-blue-100 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-[#1C1C1C]">NO saved post</h3>
                <p className="mt-2 text-[#939393]">
                  You have not saved any posts yet.
                </p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}