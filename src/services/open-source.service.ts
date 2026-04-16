import { OpenSourceRequest, OpenSourceResponse, OpenSourceListResponse, OpenSourceCreateResponse, OpenSourceUpdateResponse, OpenSourceDeleteResponse, OpenSourceDetailResponse } from "@/types/opensource.api";

const API_BASE = '/api/open-sources';

export async function fetchOpenSources(): Promise<OpenSourceListResponse> {
    const response = await fetch(API_BASE);
    if (!response.ok) throw new Error('Failed to fetch open sources');
    return await response.json();
}

export async function fetchOpenSource(id: string): Promise<OpenSourceDetailResponse> {
    const response = await fetch(`${API_BASE}/${id}`);
    if (!response.ok) throw new Error('Failed to fetch open source');
    return await response.json();
}

export async function createOpenSource(data: OpenSourceRequest): Promise<OpenSourceCreateResponse> {
    const response = await fetch(API_BASE, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    if (!response.ok) throw new Error('Failed to create open source');
    return await response.json();
}

export async function updateOpenSource(id: string, data: OpenSourceRequest): Promise<OpenSourceUpdateResponse> {
    const response = await fetch(`${API_BASE}/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    if (!response.ok) throw new Error('Failed to update open source');
    return await response.json();
}

export async function deleteOpenSource(id: string): Promise<OpenSourceDeleteResponse> {
    const response = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Failed to delete open source');
    return await response.json();
}
