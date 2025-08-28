import { useState, useEffect, useCallback } from 'react';
import { apiService, Post, PostFilters, CreateCommentData, Comment } from '../services/api';

// Hook for fetching posts with filtering - only console.logs for now
export const usePosts = (filters?: PostFilters) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching posts with filters:', filters);
      
      const response = await apiService.getPosts(filters);
      console.log('Posts response received:', response);
      
      if (!response.success) {
        setError(response.message || 'Failed to fetch posts');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      console.error('Error fetching posts:', errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return { 
    loading, 
    error, 
    refetch: fetchPosts 
  };
};

// Hook for single post details
export const usePostDetail = (postId: string | null) => {
  const [loading, setLoading] = useState(true); // Start with true to show loading initially
  const [error, setError] = useState<string | null>(null);
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    if (!postId) {
      setLoading(false);
      setError('No post ID provided');
      return;
    }

    const fetchPost = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('Fetching post with ID:', postId);
        
        const response = await apiService.getPostById(postId);
        console.log('Post detail response received:', response);
        
        // Handle different response formats
        if (response && typeof response === 'object') {
          // Check if it's a wrapped response with success/data properties
          if ('success' in response) {
            if (!response.success) {
              setError(response.message || 'Failed to fetch post');
            } else if (response.data) {
              setPost(response.data);
              console.log('Post data set from response.data:', response.data);
            }
          } else {
            // Direct response - the response IS the post data
            // Attempt to treat response as Post if it matches basic shape
            const maybePost = response as unknown;
            if (maybePost && typeof maybePost === 'object' && 'id' in (maybePost as object) && 'name' in (maybePost as object)) {
              setPost(maybePost as Post);
              console.log('Post data set directly from response:', maybePost);
            } else {
              setError('Invalid post data format received');
            }
          }
        } else {
          setError('Invalid response format received');
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
        console.error('Error fetching post detail:', errorMessage);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  return { loading, error, post };
};

// Hook for comments
export const useComments = (postId: string | null) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [addingComment, setAddingComment] = useState(false);

  const fetchComments = useCallback(async () => {
    if (!postId) {
      return;
    }

    try {
      setLoading(true);
      setError(null);
      console.log('Fetching comments for post:', postId);
      
      const response = await apiService.getComments(postId);
      console.log('Comments response received:', response);
      
      if (response.success && response.data) {
        setComments(response.data);
      } else {
        setError(response.message || 'Failed to fetch comments');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      console.error('Error fetching comments:', errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [postId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const addComment = async (commentData: CreateCommentData) => {
    if (!postId) throw new Error('Post ID is required');

    try {
      setAddingComment(true);
      console.log('Adding comment:', commentData);
      console.log('Post ID:', postId);
      
      const response = await apiService.addComment(postId, commentData);
      console.log('Add comment response received:', response);
      
      if (response.success && response.data) {
        // Refresh comments after adding a new one
        await fetchComments();
        return response.data;
      } else {
        console.error('API returned unsuccessful response:', response);
        throw new Error(response.message || `Failed to add comment. Response: ${JSON.stringify(response)}`);
      }
    } catch (err) {
      console.error('Error adding comment:', err);
      throw err;
    } finally {
      setAddingComment(false);
    }
  };

  return { 
    loading, 
    error, 
    comments,
    addingComment,
    addComment, 
    refetch: fetchComments 
  };
};

// Hook for search functionality using posts endpoint with name filter - only console.logs for now
export const useSearch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(async (query: string, filters?: Omit<PostFilters, 'name'>) => {
    if (!query.trim()) {
      console.log('Empty search query provided');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      console.log('Searching for:', query, 'with filters:', filters);
      
      // Use the posts endpoint with name parameter for search
      const response = await apiService.getPosts({
        ...filters,
        name: query
      });
      console.log('Search response received:', response);
      
      if (!response.success) {
        setError(response.message || 'Search failed');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Search error occurred';
      console.error('Error searching:', errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    search
  };
};

// Hook for fetching posts grouped by categories - only console.logs for now
export const usePostsByCategories = (filters?: Omit<PostFilters, 'category'>, postsPerCategory: number = 3) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [groupedPosts, setGroupedPosts] = useState<Record<string, Post[]>>({});

  const fetchPostsByCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching all posts for category grouping with filters:', filters);
      console.log('Expected API call will be: /api/posts with city =', filters?.city);
      
      // Get all posts without category filter but with other filters
      const response = await apiService.getPosts({
        ...filters,
        limit: 50 // Get more posts to have enough for all categories
      });
      
      console.log('All posts response received:', response);
      
      // Check if the response is already grouped (direct object with categories as keys)
      // or if it's in the standard API response format
      let groupedData: Record<string, Post[]> = {};
      
      if (response && typeof response === 'object') {
        // Narrow response into known shapes without using `any`
        const resp = response as unknown;

        // If top-level keys map to arrays of posts, treat as grouped response
        if (resp && typeof resp === 'object') {
          const possibleCategories = Object.keys(resp as Record<string, unknown>);
          const isDirectGroupedResponse = possibleCategories.some(key => {
            const val = (resp as Record<string, unknown>)[key];
            return Array.isArray(val) && (val as unknown[]).length > 0 && typeof (val as unknown[])[0] === 'object' && 'category' in ((val as unknown[])[0] as object);
          });

          if (isDirectGroupedResponse) {
            console.log('Response is already grouped by categories');
            Object.entries(resp as Record<string, unknown>).forEach(([category, posts]) => {
              if (Array.isArray(posts)) {
                groupedData[category] = (posts as Post[]).slice(0, postsPerCategory);
              }
            });
          } else {
            // Possibly standard API format with { success, data }
            const maybeApi = resp as { success?: boolean; data?: unknown };
            if (maybeApi.success && Array.isArray(maybeApi.data)) {
              // Group posts by category on the client side
              groupedData = (maybeApi.data as Post[]).reduce((acc: Record<string, Post[]>, post: Post) => {
                const category = post.category || 'Uncategorized';
                if (!acc[category]) acc[category] = [];
                if (acc[category].length < postsPerCategory) acc[category].push(post);
                return acc;
              }, {});
            } else if (maybeApi.data && typeof maybeApi.data === 'object') {
              Object.entries(maybeApi.data as Record<string, unknown>).forEach(([category, posts]) => {
                if (Array.isArray(posts)) {
                  groupedData[category] = (posts as Post[]).slice(0, postsPerCategory);
                }
              });
            } else {
              setError('Invalid response format');
              return;
            }
          }
        } else {
          setError('Invalid response format');
          return;
        }
      } else {
        setError('Invalid response received');
        return;
      }

      console.log(`Posts grouped by categories (max ${postsPerCategory} per category):`, groupedData);
      console.log('Categories found:', Object.keys(groupedData));
      setGroupedPosts(groupedData);
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      console.error('Error fetching posts by categories:', errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [filters, postsPerCategory]);

  useEffect(() => {
    fetchPostsByCategories();
  }, [fetchPostsByCategories]);

  return { 
    loading, 
    error, 
    groupedPosts,
    refetch: fetchPostsByCategories 
  };
};

// Hook for fetching comments for multiple posts
export const useMultiplePostsComments = (postIds: string[]) => {
  console.log('=== useMultiplePostsComments HOOK CALLED ===');
  console.log('Received postIds:', postIds);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [commentsData, setCommentsData] = useState<Record<string, Comment[]>>({});

  const fetchCommentsForPosts = useCallback(async () => {
    console.log('=== fetchCommentsForPosts CALLED ===');
    console.log('postIds in callback:', postIds);
    
    if (postIds.length === 0) {
      console.log('No postIds provided, setting empty comments data');
      setCommentsData({});
      return;
    }

    try {
      setLoading(true);
      setError(null);
      console.log('Fetching comments for posts:', postIds);
      
      // Fetch comments for all posts in parallel
      const commentPromises = postIds.map(async (postId) => {
        try {
          const response = await apiService.getComments(postId);
          console.log(`Comments response for post ${postId}:`, response);
          
          if (response.success && response.data) {
            return { postId, comments: response.data };
          } else {
            console.warn(`Failed to fetch comments for post ${postId}:`, response.message);
            return { postId, comments: [] };
          }
        } catch (err) {
          console.error(`Error fetching comments for post ${postId}:`, err);
          return { postId, comments: [] };
        }
      });

      const results = await Promise.all(commentPromises);
      
      // Convert results to a record
      const commentsRecord: Record<string, Comment[]> = {};
      results.forEach(({ postId, comments }) => {
        commentsRecord[postId] = comments;
      });

      console.log('All comments fetched:', commentsRecord);
      setCommentsData(commentsRecord);
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      console.error('Error fetching comments for multiple posts:', errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [postIds]);

  useEffect(() => {
    console.log('=== useMultiplePostsComments useEffect TRIGGERED ===');
    console.log('Current postIds:', postIds);
    console.log('About to call fetchCommentsForPosts');
    fetchCommentsForPosts();
  }, [fetchCommentsForPosts, postIds]);

  return { 
    loading, 
    error, 
    commentsData,
    refetch: fetchCommentsForPosts 
  };
};
