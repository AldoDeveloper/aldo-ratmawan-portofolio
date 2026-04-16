// ContactForm API Interfaces

export interface ContactFormRequest {
    name: string;
    email: string;
    message: string;
}

export interface ContactFormResponse {
    id: string;
    name: string;
    email: string;
    message: string;
    created_at?: string;
}

export interface ContactFormListResponse { success: boolean; data: ContactFormResponse[]; message?: string; }
export interface ContactFormDetailResponse { success: boolean; data: ContactFormResponse; message?: string; }
export interface ContactFormCreateResponse { success: boolean; data: ContactFormResponse; message?: string; }
export interface ContactFormUpdateResponse { success: boolean; data: ContactFormResponse; message?: string; }
export interface ContactFormDeleteResponse { success: boolean; message: string; }
export interface ApiErrorResponse { success: false; message: string; error?: any; }
