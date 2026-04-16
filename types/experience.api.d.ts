// Experience API Interfaces

export interface ExperienceRequest {
    company_name: string;
    position: string;
    employment_type?: string;
    location?: string;
    is_remote?: boolean;
    start_date?: string;
    end_date?: string;
    is_current?: boolean;
    description?: string;
}

export interface ExperienceResponse {
    id: string;
    company_name: string;
    position: string;
    employment_type?: string;
    location?: string;
    is_remote?: boolean;
    start_date?: string;
    end_date?: string;
    is_current?: boolean;
    description?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface ExperienceListResponse { success: boolean; data: ExperienceResponse[]; message?: string; }
export interface ExperienceDetailResponse { success: boolean; data: ExperienceResponse; message?: string; }
export interface ExperienceCreateResponse { success: boolean; data: ExperienceResponse; message?: string; }
export interface ExperienceUpdateResponse { success: boolean; data: ExperienceResponse; message?: string; }
export interface ExperienceDeleteResponse { success: boolean; message: string; }
export interface ApiErrorResponse { success: false; message: string; error?: any; }
