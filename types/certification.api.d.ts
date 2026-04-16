// Certification API Interfaces

export interface CertificationRequest {
    name: string;
    issuer: string;
    issue_date?: string;
    credential_url?: string;
    description?: string;
}

export interface CertificationResponse {
    id: string;
    name: string;
    issuer: string;
    issue_date?: string;
    credential_url?: string;
    description?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface CertificationListResponse { success: boolean; data: CertificationResponse[]; message?: string; }
export interface CertificationDetailResponse { success: boolean; data: CertificationResponse; message?: string; }
export interface CertificationCreateResponse { success: boolean; data: CertificationResponse; message?: string; }
export interface CertificationUpdateResponse { success: boolean; data: CertificationResponse; message?: string; }
export interface CertificationDeleteResponse { success: boolean; message: string; }
export interface ApiErrorResponse { success: false; message: string; error?: any; }
