// Interface for searchPostsByNameDesc response item
export interface SearchPostResult {
  id: string;
  name: string;
  description?: string;
  city: string;
  category: string;
  createdAt: number;
  updatedAt: number;
}
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

// Interface for /api/cities response
interface CityListResponse {
  cities: string[];
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
  about?: string; // Changed from description to about
  category: string;
  city: string;
  neighborhood: string;
  address: string;
  date?: string; // Added date field
  time?: string; // Added time field
  price?: string; // Added price field
  latitude?: number;
  longitude?: number;
  phone?: string;
  email?: string;
  website?: string;
  whatsapp?: string; // Added whatsapp field
  googleMaps?: string; // Added googleMaps field
  ctaLink?: string; // Added ctaLink field
  ctaType?: string; // Added ctaType field
  eventType?: string; // Added eventType field
  openingHours?: {
    [key: string]: unknown; // Use unknown to avoid explicit any
  };
  featuredImageUrl?: string; // Added featuredImageUrl
  galleryImageUrls?: string[]; // Added galleryImageUrls
  images?: string[]; // Keep existing images field for compatibility
  amenities?: string[];
  highlights?: string[];
  rating?: number; // Made optional
  reviewCount?: number; // Made optional
  priceRange?: string;
  socialMedia?: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
  social_fb?: string; // Added social_fb field
  social_ig?: string; // Added social_ig field
  comments?: Record<string, unknown>; // Added comments field
  createdAt?: number; // Added createdAt field
  updatedAt?: number; // Added updatedAt field
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
  // Search posts by name and description
  async searchPostsByNameDesc(params: { query: string; city?: string; limit?: number }): Promise<SearchPostResult[]> {
    const queryParams = new URLSearchParams();
    queryParams.append('query', params.query);
    if (params.city) queryParams.append('city', params.city);
    if (params.limit) queryParams.append('limit', params.limit.toString());
    const endpoint = `/searchPostsByNameDesc?${queryParams.toString()}`;
    const res = await this.makeRequest<SearchPostResult[]>(endpoint);
    return res.data;
  }
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
      console.log('Request options:', { ...options, headers: defaultHeaders });
      
      const response = await fetch(url, {
        ...options,
        headers: defaultHeaders,
      });

      console.log(`Response status: ${response.status}`);

      if (!response.ok) {
        let errorMessage = `HTTP error! status: ${response.status}`;
        try {
          const errorData = await response.text();
          console.log('Error response body:', errorData);
          errorMessage += ` - ${errorData}`;
        } catch {
          console.log('Could not read error response body');
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      
      if (data && typeof data === 'object' && 'success' in data) {
        return data;
      }
      
      return {
        success: true,
        data: data,
        message: 'Success'
      };
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

  async getCities(): Promise<ApiResponse<CityListResponse>> {
    return this.makeRequest<CityListResponse>(`/api/cities`);
  }
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
  CityListResponse,
};
