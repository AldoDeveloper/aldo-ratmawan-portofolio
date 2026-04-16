// OpenSource API Interfaces

export interface OpenSourceRequest {
    project_name: string;
    repo_url?: string;
    description?: string;
    stars?: number;
}

export interface OpenSourceResponse {
    id: string;
    project_name: string;
    repo_url?: string;
    description?: string;
    stars?: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface OpenSourceListResponse { success: boolean; data: OpenSourceResponse[]; message?: string; }
export interface OpenSourceDetailResponse { success: boolean; data: OpenSourceResponse; message?: string; }
export interface OpenSourceCreateResponse { success: boolean; data: OpenSourceResponse; message?: string; }
export interface OpenSourceUpdateResponse { success: boolean; data: OpenSourceResponse; message?: string; }
export interface OpenSourceDeleteResponse { success: boolean; message: string; }
export interface ApiErrorResponse { success: false; message: string; error?: any; }
