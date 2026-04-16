// Project API Interfaces

export interface ProjectRequest {
    title: string;
    slug: string;
    description?: string;
    thumbnail_url?: string;
    demo_url?: string;
    repo_url?: string;
    tech_stacks?: string[];
}

export interface ProjectResponse {
    id: string;
    title: string;
    slug: string;
    description?: string;
    thumbnail_url?: string;
    demo_url?: string;
    repo_url?: string;
    tech_stacks?: string[];
    created_at?: string;
    updated_at?: string;
}

export interface ProjectListResponse { success: boolean; data: ProjectResponse[]; message?: string; }
export interface ProjectDetailResponse { success: boolean; data: ProjectResponse; message?: string; }
export interface ProjectCreateResponse { success: boolean; data: ProjectResponse; message?: string; }
export interface ProjectUpdateResponse { success: boolean; data: ProjectResponse; message?: string; }
export interface ProjectDeleteResponse { success: boolean; message: string; }
export interface ApiErrorResponse { success: false; message: string; error?: any; }
