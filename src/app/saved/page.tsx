"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from '@/components/icons/SvgIcons';
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
  const router = useRouter();
  const { currentUser, loading: authLoading } = useAuth();
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

  if (authLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-[#0063BF]"></div>
          <p className="mt-6 text-gray-600 text-sm font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (!currentUser && !loading) {
    return (
      <div className="min-h-screen bg-white">
        <DetailPageHeader />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">Saved Posts</h1>
          <p>Please log in to see your saved posts.</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <DetailPageHeader />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-2 mb-8">
          <button
            aria-label="Back"
            onClick={() => router.back()}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            style={{ lineHeight: 0 }}
          >
            <ArrowLeft width={24} height={24} />
          </button>
          <h2 className="text-xl font-semibold text-[#1C1C1C]">Saved</h2>
        </div>
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : savedPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {savedPosts.map((post, index) => (
              <div key={post.id} className="w-full max-w-[340px] animate-fadeIn" style={{ animationDelay: `${index * 0.05}s` }}>
                <EventCard {...transformPostToEventCard(post)} navigationCategory={post.category} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[300px] text-gray-500">
            <p className="text-lg font-medium">No saved posts</p>
          </div>
        )}
      </main>
    </div>
  );
}