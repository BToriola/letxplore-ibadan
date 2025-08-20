const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://stagging-letsxplore-b957bddd5479.herokuapp.com';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

interface PostFilters {
  category?: string;
  city?: string;
  neighborhood?: string;
  name?: string;
  limit?: number;
  page?: number;
}

interface Post {
  id: string;
  name: string;
  description: string;
  category: string;
  city: string;
  neighborhood: string;
  address: string;
  latitude?: number;
  longitude?: number;
  phone?: string;
  email?: string;
  website?: string;
  openingHours?: {
    [key: string]: string;
  };
  images: string[];
  amenities: string[];
  highlights: string[];
  rating: number;
  reviewCount: number;
  priceRange?: string;
  socialMedia?: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface Comment {
  id: string;
  content: string;
  userId: string;
  username: string;
  userAvatar?: string;
  rating?: number;
  createdAt: string;
  updatedAt: string;
}

interface CreateCommentData {
  content: string;
  userId: string;
  username: string;
  rating?: number;
}

interface SavePostResponse {
  message: string;
  userId: string;
  postId: string;
  savedAt: number;
}

interface SavedPost {
  postId: string;
  savedAt: number;
}

class ApiService {
  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const defaultHeaders = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    try {
      console.log(`Making API request to: ${url}`);
      
      const response = await fetch(url, {
        ...options,
        headers: defaultHeaders,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(`API Response from ${endpoint}:`, data);
      
      return data;
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  // Posts endpoints
  async getPosts(filters?: PostFilters): Promise<ApiResponse<Post[]>> {
    const queryParams = new URLSearchParams();
    
    if (filters?.category) queryParams.append('category', filters.category);
    if (filters?.city) queryParams.append('city', filters.city);
    if (filters?.neighborhood) queryParams.append('neighborhood', filters.neighborhood);
    if (filters?.name) queryParams.append('name', filters.name);
    if (filters?.limit) queryParams.append('limit', filters.limit.toString());
    if (filters?.page) queryParams.append('page', filters.page.toString());

    const queryString = queryParams.toString();
    const endpoint = `/api/posts${queryString ? `?${queryString}` : ''}`;
    
    return this.makeRequest<Post[]>(endpoint);
  }

  async getPostById(id: string): Promise<ApiResponse<Post>> {
    return this.makeRequest<Post>(`/posts/${id}`);
  }

  // Comments endpoints
  async getComments(postId: string): Promise<ApiResponse<Comment[]>> {
    return this.makeRequest<Comment[]>(`/posts/${postId}/comments`);
  }

  async addComment(postId: string, commentData: CreateCommentData): Promise<ApiResponse<Comment>> {
    return this.makeRequest<Comment>(`/posts/${postId}/comments`, {
      method: 'POST',
      body: JSON.stringify(commentData),
    });
  }

  // User saved posts endpoints
  async savePost(userId: string, postId: string): Promise<ApiResponse<SavePostResponse>> {
    return this.makeRequest<SavePostResponse>(`/users/${userId}/save`, {
      method: 'POST',
      body: JSON.stringify({ postId }),
    });
  }

  async getSavedPosts(userId: string): Promise<ApiResponse<SavedPost[]>> {
    return this.makeRequest<SavedPost[]>(`/users/${userId}/saved-posts`);
  }
}

export const apiService = new ApiService();

// Export types for use in other files
export type {
  Post,
  Comment,
  CreateCommentData,
  SavePostResponse,
  SavedPost,
  PostFilters,
  ApiResponse,
};
