// Blog/Article API Interfaces

export interface ArticleRequest {
    title: string;
    slug: string;
    content_md: string;
    thumbnail_url?: string;
    published?: boolean | 0 | 1;
}

export interface ArticleResponse {
    id: string;
    title: string;
    slug: string;
    content_md: string;
    thumbnail_url?: string;
    published?: boolean;
    created_at?: string;
    updatedAt?: string;
}

export interface ArticleListResponse {
    success: boolean;
    data: ArticleResponse[];
    message?: string;
}

export interface ArticleDetailResponse {
    success: boolean;
    data: ArticleResponse;
    message?: string;
}

export interface ArticleCreateResponse {
    success: boolean;
    data: ArticleResponse;
    message?: string;
}

export interface ArticleUpdateResponse {
    success: boolean;
    data: ArticleResponse;
    message?: string;
}

export interface ArticleDeleteResponse {
    success: boolean;
    message: string;
}

export interface ApiErrorResponse {
    success: false;
    message: string;
    error?: any;
}
