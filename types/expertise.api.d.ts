// Expertise API Interfaces

export interface ExpertiseRequest {
    title: string;
    description: string;
}

export interface ExpertiseResponse {
    id: string;
    title: string;
    description?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface ExpertiseListResponse {
    success: boolean;
    data: ExpertiseResponse[];
    message?: string;
}

export interface ExpertiseDetailResponse {
    success: boolean;
    data: ExpertiseResponse;
    message?: string;
}

export interface ExpertiseCreateResponse {
    success: boolean;
    data: ExpertiseResponse;
    message?: string;
}

export interface ExpertiseUpdateResponse {
    success: boolean;
    data: ExpertiseResponse;
    message?: string;
}

export interface ExpertiseDeleteResponse {
    success: boolean;
    message: string;
}

export interface ApiErrorResponse {
    success: false;
    message: string;
    error?: any;
}
