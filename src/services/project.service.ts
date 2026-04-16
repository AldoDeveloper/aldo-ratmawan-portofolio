import { ProjectRequest, ProjectResponse, ProjectListResponse, ProjectCreateResponse, ProjectUpdateResponse, ProjectDeleteResponse, ProjectDetailResponse } from "@/types/project.api";

const API_BASE = '/api/projects';

export async function fetchProjects(): Promise<ProjectListResponse> {
    const response = await fetch(API_BASE);
    if (!response.ok) throw new Error('Failed to fetch projects');
    return await response.json();
}

export async function fetchProject(id: string): Promise<ProjectDetailResponse> {
    const response = await fetch(`${API_BASE}/${id}`);
    if (!response.ok) throw new Error('Failed to fetch project');
    return await response.json();
}

export async function createProject(data: ProjectRequest): Promise<ProjectCreateResponse> {
    const response = await fetch(API_BASE, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    if (!response.ok) throw new Error('Failed to create project');
    return await response.json();
}

export async function updateProject(id: string, data: ProjectRequest): Promise<ProjectUpdateResponse> {
    const response = await fetch(`${API_BASE}/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    if (!response.ok) throw new Error('Failed to update project');
    return await response.json();
}

export async function deleteProject(id: string): Promise<ProjectDeleteResponse> {
    const response = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Failed to delete project');
    return await response.json();
}
