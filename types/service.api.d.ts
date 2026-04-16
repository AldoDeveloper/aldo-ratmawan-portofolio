// Service API Interfaces

export interface ServiceRequest {
    title: string;
    icon: string;
    description?: string;
    price?: number;
    created_at?: string;
    updated_at?: string;
}

export interface ServiceResponse {
    id: string;
    title: string;
    icon ?: string;
    description?: string;
    price?: number;
    created_at?: string;
    updated_at?: string;
}

export interface ServiceListResponse { success: boolean; data: ServiceResponse[]; message?: string; }
export interface ServiceDetailResponse { success: boolean; data: ServiceResponse; message?: string; }
export interface ServiceCreateResponse { success: boolean; data: ServiceResponse; message?: string; }
export interface ServiceUpdateResponse { success: boolean; data: ServiceResponse; message?: string; }
export interface ServiceDeleteResponse { success: boolean; message: string; }
export interface ApiErrorResponse { success: false; message: string; error?: any; }
