import { ExperienceRequest, ExperienceResponse, ExperienceListResponse, ExperienceCreateResponse, ExperienceUpdateResponse, ExperienceDeleteResponse, ExperienceDetailResponse } from "types/experience.api";

const API_BASE = '/api/experiences';

export async function fetchExperiences(): Promise<ExperienceListResponse> {
    const response = await fetch(API_BASE);
    if (!response.ok) throw new Error('Failed to fetch experiences');
    return await response.json();
}

export async function fetchExperience(id: string): Promise<ExperienceDetailResponse> {
    const response = await fetch(`${API_BASE}/${id}`);
    if (!response.ok) throw new Error('Failed to fetch experience');
    return await response.json();
}

export async function createExperience(data: ExperienceRequest): Promise<ExperienceCreateResponse> {
    const response = await fetch(API_BASE, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    if (!response.ok) throw new Error('Failed to create experience');
    return await response.json();
}

export async function updateExperience(id: string, data: ExperienceRequest): Promise<ExperienceUpdateResponse> {
    const response = await fetch(`${API_BASE}/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    if (!response.ok) throw new Error('Failed to update experience');
    return await response.json();
}

export async function deleteExperience(id: string): Promise<ExperienceDeleteResponse> {
    const response = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Failed to delete experience');
    return await response.json();
}
