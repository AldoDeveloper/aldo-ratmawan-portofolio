import { CertificationRequest, CertificationResponse, CertificationListResponse, CertificationCreateResponse, CertificationUpdateResponse, CertificationDeleteResponse, CertificationDetailResponse } from "@/types/certification.api";

const API_BASE = '/api/certifications';

export async function fetchCertifications(): Promise<CertificationListResponse> {
    const response = await fetch(API_BASE);
    if (!response.ok) throw new Error('Failed to fetch certifications');
    return await response.json();
}

export async function fetchCertification(id: string): Promise<CertificationDetailResponse> {
    const response = await fetch(`${API_BASE}/${id}`);
    if (!response.ok) throw new Error('Failed to fetch certification');
    return await response.json();
}

export async function createCertification(data: CertificationRequest): Promise<CertificationCreateResponse> {
    const response = await fetch(API_BASE, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    if (!response.ok) throw new Error('Failed to create certification');
    return await response.json();
}

export async function updateCertification(id: string, data: CertificationRequest): Promise<CertificationUpdateResponse> {
    const response = await fetch(`${API_BASE}/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    if (!response.ok) throw new Error('Failed to update certification');
    return await response.json();
}

export async function deleteCertification(id: string): Promise<CertificationDeleteResponse> {
    const response = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Failed to delete certification');
    return await response.json();
}
