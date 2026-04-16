// Contact API Interfaces

export interface ContactRequest {
    type: string;
    url: string;
    label: string;
}

export interface ContactResponse {
    id: string;
    type: string;
    url: string;
    label: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface ContactListResponse { success: boolean; data: ContactResponse[]; message?: string; }
export interface ContactDetailResponse { success: boolean; data: ContactResponse; message?: string; }
export interface ContactCreateResponse { success: boolean; data: ContactResponse; message?: string; }
export interface ContactUpdateResponse { success: boolean; data: ContactResponse; message?: string; }
export interface ContactDeleteResponse { success: boolean; message: string; }
export interface ApiErrorResponse { success: false; message: string; error?: any; }
