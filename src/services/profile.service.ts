import { ProfileRequest, ProfileResponse, ProfileListResponse, ProfileCreateResponse, ProfileUpdateResponse, ProfileDeleteResponse, ProfileDetailResponse } from "@/types/profile.api";

const API_BASE = '/api/profile';

export async function fetchProfiles(): Promise<ProfileListResponse> {
    const response = await fetch(API_BASE);
    if (!response.ok) throw new Error('Failed to fetch profiles');
    return await response.json();
}

export async function fetchProfile(id: string): Promise<ProfileDetailResponse> {
    const response = await fetch(`${API_BASE}/${id}`);
    if (!response.ok) throw new Error('Failed to fetch profile');
    return await response.json();
}

export async function createProfile(data: ProfileRequest): Promise<ProfileCreateResponse> {
    const response = await fetch(API_BASE, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    if (!response.ok) throw new Error('Failed to create profile');
    return await response.json();
}

export async function updateProfile(id: string, data: ProfileRequest): Promise<ProfileUpdateResponse> {
    const response = await fetch(`${API_BASE}/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    if (!response.ok) throw new Error('Failed to update profile');
    return await response.json();
}

export async function deleteProfile(id: string): Promise<ProfileDeleteResponse> {
    const response = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Failed to delete profile');
    return await response.json();
}
