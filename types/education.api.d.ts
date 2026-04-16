// Education API Interfaces

export interface EducationRequest {
    institution_name: string;
    education_level: string;
    major?: string;
    start_date?: string;
    end_date?: string;
    is_current?: boolean;
    grade?: string;
    description?: string;
}

export interface EducationResponse {
    id: string;
    institution_name: string;
    education_level: string;
    major?: string;
    start_date?: string;
    end_date?: string;
    is_current?: boolean;
    grade?: string;
    description?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface EducationListResponse { success: boolean; data: EducationResponse[]; message?: string; }
export interface EducationDetailResponse { success: boolean; data: EducationResponse; message?: string; }
export interface EducationCreateResponse { success: boolean; data: EducationResponse; message?: string; }
export interface EducationUpdateResponse { success: boolean; data: EducationResponse; message?: string; }
export interface EducationDeleteResponse { success: boolean; message: string; }
export interface ApiErrorResponse { success: false; message: string; error?: any; }
