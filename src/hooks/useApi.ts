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
      
      const response = await apiService.getPosts(filters);      
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
        
        const response = await apiService.getPostById(postId);
        
        // Handle different response formats
        if (response && typeof response === 'object') {
          if ('success' in response) {
            if (!response.success) {
              setError(response.message || 'Failed to fetch post');
            } else if (response.data) {
              setPost(response.data);
            }
          } else {

            const maybePost = response as unknown;
            if (maybePost && typeof maybePost === 'object' && 'id' in (maybePost as object) && 'name' in (maybePost as object)) {
              setPost(maybePost as Post);
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
      
      const response = await apiService.getComments(postId);
      
      if (response.success && response.data) {
        if (Array.isArray(response.data)) {
          setComments(response.data);
        } else if (typeof response.data === 'object' && response.data !== null) {
          setComments(Object.values(response.data));
        } else {
          setComments([]);
        }
      } else {
        setError(response.message || 'Failed to fetch comments');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
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
      const response = await apiService.addComment(postId, commentData);
      
      if (response.success && response.data) {
        // Refresh comments after adding a new one
        await fetchComments();
        return response.data;
      } else {
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

export const useSearch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(async (query: string, filters?: Omit<PostFilters, 'name'>) => {
    if (!query.trim()) {
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      // Use the posts endpoint with name parameter for search
      const response = await apiService.getPosts({
        ...filters,
        name: query
      });
      
      if (!response.success) {
        setError(response.message || 'Search failed');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Search error occurred';
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
      
      const response = await apiService.getPosts({
        ...filters,
        limit: 50 
      });
            

      let groupedData: Record<string, Post[]> = {};
      
      if (response && typeof response === 'object') {
        const resp = response as unknown;

        if (resp && typeof resp === 'object') {
          const possibleCategories = Object.keys(resp as Record<string, unknown>);
          const isDirectGroupedResponse = possibleCategories.some(key => {
            const val = (resp as Record<string, unknown>)[key];
            return Array.isArray(val) && (val as unknown[]).length > 0 && typeof (val as unknown[])[0] === 'object' && 'category' in ((val as unknown[])[0] as object);
          });

          if (isDirectGroupedResponse) {
            Object.entries(resp as Record<string, unknown>).forEach(([category, posts]) => {
              if (Array.isArray(posts)) {
                groupedData[category] = (posts as Post[]).slice(0, postsPerCategory);
              }
            });
          } else {
            const maybeApi = resp as { success?: boolean; data?: unknown };
            if (maybeApi.success && Array.isArray(maybeApi.data)) {
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
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [commentsData, setCommentsData] = useState<Record<string, Comment[]>>({});

  const fetchCommentsForPosts = useCallback(async () => {
    if (postIds.length === 0) {
      setCommentsData({});
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      // Fetch comments for all posts in parallel
      const commentPromises = postIds.map(async (postId) => {
        try {
          const response = await apiService.getComments(postId);
          
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
    fetchCommentsForPosts();
  }, [fetchCommentsForPosts, postIds]);

  return { 
    loading, 
    error, 
    commentsData,
    refetch: fetchCommentsForPosts 
  };
};
