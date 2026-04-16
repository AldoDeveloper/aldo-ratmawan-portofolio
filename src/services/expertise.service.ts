import { 
    ExpertiseRequest, 
    ExpertiseResponse, 
    ExpertiseListResponse, 
    ExpertiseCreateResponse, 
    ExpertiseUpdateResponse, 
    ExpertiseDeleteResponse, 
    ExpertiseDetailResponse 
} from "@/types/expertise.api";

const API_BASE = '/api/expertise';

/**
 * Fetch all expertise items
 */
export async function fetchExpertiseItems(): Promise<ExpertiseListResponse> {
    const response = await fetch(API_BASE);

    if (!response.ok) {
        throw new Error('Failed to fetch expertise items');
    }

    return await response.json();
}

/**
 * Fetch a single expertise item by ID
 */
export async function fetchExpertiseItem(id: string): Promise<ExpertiseDetailResponse> {
    const response = await fetch(`${API_BASE}/${id}`);

    if (!response.ok) {
        throw new Error('Failed to fetch expertise item');
    }

    return await response.json();
}

/**
 * Create a new expertise item
 */
export async function createExpertiseItem(data: ExpertiseRequest): Promise<ExpertiseCreateResponse> {
    const response = await fetch(API_BASE, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('Failed to create expertise item');
    }

    return await response.json();
}

/**
 * Update an existing expertise item
 */
export async function updateExpertiseItem(id: string, data: ExpertiseRequest): Promise<ExpertiseUpdateResponse> {
    const response = await fetch(`${API_BASE}/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('Failed to update expertise item');
    }

    return await response.json();
}

/**
 * Delete an expertise item
 */
export async function deleteExpertiseItem(id: string): Promise<ExpertiseDeleteResponse> {
    const response = await fetch(`${API_BASE}/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error('Failed to delete expertise item');
    }

    return await response.json();
}
