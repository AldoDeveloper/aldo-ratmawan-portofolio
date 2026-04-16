import { SkillRequest, SkillResponse, SkillListResponse, SkillCreateResponse, SkillUpdateResponse, SkillDeleteResponse, SkillDetailResponse } from "@/types/skill.api";

const API_BASE = '/api/skills';

export async function fetchSkills(): Promise<SkillListResponse> {
    const response = await fetch(API_BASE);
    if (!response.ok) throw new Error('Failed to fetch skills');
    return await response.json();
}

export async function fetchSkill(id: string): Promise<SkillDetailResponse> {
    const response = await fetch(`${API_BASE}/${id}`);
    if (!response.ok) throw new Error('Failed to fetch skill');
    return await response.json();
}

export async function createSkill(data: SkillRequest): Promise<SkillCreateResponse> {
    const response = await fetch(API_BASE, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    if (!response.ok) throw new Error('Failed to create skill');
    return await response.json();
}

export async function updateSkill(id: string, data: SkillRequest): Promise<SkillUpdateResponse> {
    const response = await fetch(`${API_BASE}/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    if (!response.ok) throw new Error('Failed to update skill');
    return await response.json();
}

export async function deleteSkill(id: string): Promise<SkillDeleteResponse> {
    const response = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Failed to delete skill');
    return await response.json();
}
