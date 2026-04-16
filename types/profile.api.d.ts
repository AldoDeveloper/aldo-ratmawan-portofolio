// Profile API Interfaces

export interface ProfileRequest {
    full_name: string;
    username: string;
    email: string;
    headline?: string;
    bio?: string;
    avatar_url?: string;
    resume_url?: string;
    location?: string;
    is_available?: boolean;
    years_of_experience?: number;
}

export interface ProfileResponse {
    id: string;
    full_name: string;
    username: string;
    email: string;
    headline?: string;
    bio?: string;
    avatar_url?: string;
    resume_url?: string;
    location?: string;
    is_available?: boolean;
    years_of_experience?: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface ProfileListResponse { success: boolean; data: ProfileResponse[]; message?: string; }
export interface ProfileDetailResponse { success: boolean; data: ProfileResponse; message?: string; }
export interface ProfileCreateResponse { success: boolean; data: ProfileResponse; message?: string; }
export interface ProfileUpdateResponse { success: boolean; data: ProfileResponse; message?: string; }
export interface ProfileDeleteResponse { success: boolean; message: string; }
export interface ApiErrorResponse { success: false; message: string; error?: any; }
