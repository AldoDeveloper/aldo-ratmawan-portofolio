// Achievement API Interfaces

export interface AchievementRequest {
    title: string;
    description: string;
    issuer?: string;
    date?: string;
    certificate_url?: string;
    image_url?: string;
    category?: string;
    status?: 'verified' | 'pending' | 'in-progress';
}

export interface AchievementResponse {
    id: string;
    title: string;
    description?: string;
    issuer?: string;
    date?: string;
    certificate_url?: string;
    image_url?: string;
    category?: string;
    status?: 'verified' | 'pending' | 'in-progress';
    createdAt?: string;
    updatedAt?: string;
}

export interface AchievementListResponse {
    success: boolean;
    data: AchievementResponse[];
    message?: string;
}

export interface AchievementDetailResponse {
    success: boolean;
    data: AchievementResponse;
    message?: string;
}

export interface AchievementCreateResponse {
    success: boolean;
    data: AchievementResponse;
    message?: string;
}

export interface AchievementUpdateResponse {
    success: boolean;
    data: AchievementResponse;
    message?: string;
}

export interface AchievementDeleteResponse {
    success: boolean;
    message: string;
}

export interface ApiErrorResponse {
    success: false;
    message: string;
    error?: any;
}
