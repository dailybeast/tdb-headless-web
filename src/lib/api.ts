import type { 
  Article, 
  Collection, 
  ApiResponse, 
  PaginationParams, 
  FieldSelection, 
  SortParams 
} from './types';

export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string,
    public details?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export interface ApiConfig {
  baseUrl: string;
  clientId?: string;
  clientSecret?: string;
  timeout?: number;
}

export class ContentApi {
  private config: ApiConfig;
  private defaultTimeout = 10000;

  constructor(config: ApiConfig) {
    this.config = {
      timeout: this.defaultTimeout,
      ...config
    };
  }

  private async request<T>(
    endpoint: string, 
    params: Record<string, any> = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = new URL(endpoint, this.config.baseUrl);
      
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, value.toString());
        }
      });

      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      };

      if (this.config.clientId && this.config.clientSecret) {
        headers['CF-Access-Client-Id'] = this.config.clientId;
        headers['CF-Access-Client-Secret'] = this.config.clientSecret;
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

      const response = await fetch(url.toString(), {
        method: 'GET',
        headers,
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new ApiError(
          `HTTP ${response.status}: ${response.statusText}`,
          response.status,
          response.status.toString()
        );
      }

      const responseData = await response.json();
      
      // Handle wrapped API response format
      const data = responseData.result?.content || responseData.result || responseData;
      
      return {
        data,
        meta: {
          total: data?.length,
          limit: params.limit,
          offset: params.offset
        }
      };

    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new ApiError('Request timeout', 408, 'TIMEOUT');
        }
        
        throw new ApiError(
          `Network error: ${error.message}`,
          0,
          'NETWORK_ERROR',
          error
        );
      }

      throw new ApiError('Unknown error occurred', 0, 'UNKNOWN_ERROR');
    }
  }

  async getCollection(
    identifier: string,
    options: { by?: 'alias' | 'id' } & FieldSelection = {}
  ): Promise<ApiResponse<Collection>> {
    const { by = 'alias', fields } = options;
    const params: Record<string, any> = {};
    
    if (fields) {
      params.fields = fields;
    }
    
    if (by === 'alias') {
      params.content_alias = identifier;
    } else {
      params.id = identifier;
    }

    return this.request<Collection>('/collections', params);
  }

  async getArticle(
    identifier: string,
    options: { by?: 'slug' | 'id' } & FieldSelection = {}
  ): Promise<ApiResponse<Article>> {
    const { by = 'slug', fields } = options;
    const params: Record<string, any> = {};
    
    if (fields) {
      params.fields = fields;
    }
    
    if (by === 'slug') {
      params.canonical_url = identifier;
    } else {
      params.id = identifier;
    }

    return this.request<Article>('/stories', params);
  }

  async listArticlesByTag(
    tagSlug: string,
    options: PaginationParams & FieldSelection & SortParams = {}
  ): Promise<ApiResponse<Article[]>> {
    const params = {
      tag_slug: tagSlug,
      ...options
    };

    return this.request<Article[]>('/stories/list', params);
  }

  async listArticlesByAuthor(
    authorSlug: string,
    options: PaginationParams & FieldSelection & SortParams = {}
  ): Promise<ApiResponse<Article[]>> {
    const params = {
      author_slug: authorSlug,
      ...options
    };

    return this.request<Article[]>('/stories/list', params);
  }

  async getSection(
    sectionId: string,
    options: FieldSelection = {}
  ): Promise<ApiResponse<any>> {
    const params = {
      id: sectionId,
      ...options
    };

    return this.request<any>('/sections', params);
  }

  async listStories(
    options: PaginationParams & FieldSelection & SortParams = {}
  ): Promise<ApiResponse<Article[]>> {
    return this.request<Article[]>('/stories/list', options);
  }
}

export function createApiClient(): ContentApi {
  const config: ApiConfig = {
    baseUrl: import.meta.env.CONTENT_CACHE_API_URL || '',
    clientId: import.meta.env.CF_ACCESS_CLIENT_ID,
    clientSecret: import.meta.env.CF_ACCESS_CLIENT_SECRET,
    timeout: 15000
  };

  if (!config.baseUrl) {
    throw new Error('CONTENT_CACHE_API_URL environment variable is required');
  }

  return new ContentApi(config);
}

export const api = createApiClient();