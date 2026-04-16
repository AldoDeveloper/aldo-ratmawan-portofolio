import { ServiceRequest, ServiceResponse, ServiceListResponse, ServiceCreateResponse, ServiceUpdateResponse, ServiceDeleteResponse, ServiceDetailResponse } from "@/types/service.api";

const API_BASE = '/api/services';

export async function fetchServices(): Promise<ServiceListResponse> {
    const response = await fetch(API_BASE);
    if (!response.ok) throw new Error('Failed to fetch services');
    return await response.json();
}

export async function fetchService(id: string): Promise<ServiceDetailResponse> {
    const response = await fetch(`${API_BASE}/${id}`);
    if (!response.ok) throw new Error('Failed to fetch service');
    return await response.json();
}

export async function createService(data: ServiceRequest): Promise<ServiceCreateResponse> {
    const response = await fetch(API_BASE, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    if (!response.ok) throw new Error('Failed to create service');
    return await response.json();
}

export async function updateService(id: string, data: ServiceRequest): Promise<ServiceUpdateResponse> {
    const response = await fetch(`${API_BASE}/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    if (!response.ok) throw new Error('Failed to update service');
    return await response.json();
}

export async function deleteService(id: string): Promise<ServiceDeleteResponse> {
    const response = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Failed to delete service');
    return await response.json();
}
