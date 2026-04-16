// Skill API Interfaces

export interface SkillRequest {
    name: string;
    category?: string;
    level?: number;
    description?: string;
}

export interface SkillResponse {
    id: number;
    name: string;
    icon_svg: string;
    category?: string;
    level?: string;
    level_percent?: number;
    description?: string;
    created_at?: string;
    updated_at?: string;
}

export interface SkillListResponse { success: boolean; data: SkillResponse[]; message?: string; }
export interface SkillDetailResponse { success: boolean; data: SkillResponse; message?: string; }
export interface SkillCreateResponse { success: boolean; data: SkillResponse; message?: string; }
export interface SkillUpdateResponse { success: boolean; data: SkillResponse; message?: string; }
export interface SkillDeleteResponse { success: boolean; message: string; }
export interface ApiErrorResponse { success: false; message: string; error?: any; }
