import { EducationRequest, EducationResponse, EducationListResponse, EducationCreateResponse, EducationUpdateResponse, EducationDeleteResponse, EducationDetailResponse } from "@/types/education.api";

const API_BASE = '/api/educations';

export async function fetchEducations(): Promise<EducationListResponse> {
    const response = await fetch(API_BASE);
    if (!response.ok) throw new Error('Failed to fetch educations');
    return await response.json();
}

export async function fetchEducation(id: string): Promise<EducationDetailResponse> {
    const response = await fetch(`${API_BASE}/${id}`);
    if (!response.ok) throw new Error('Failed to fetch education');
    return await response.json();
}

export async function createEducation(data: EducationRequest): Promise<EducationCreateResponse> {
    const response = await fetch(API_BASE, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    if (!response.ok) throw new Error('Failed to create education');
    return await response.json();
}

export async function updateEducation(id: string, data: EducationRequest): Promise<EducationUpdateResponse> {
    const response = await fetch(`${API_BASE}/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    if (!response.ok) throw new Error('Failed to update education');
    return await response.json();
}

export async function deleteEducation(id: string): Promise<EducationDeleteResponse> {
    const response = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Failed to delete education');
    return await response.json();
}
