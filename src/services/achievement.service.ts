import { AchievementRequest, AchievementResponse, AchievementListResponse, AchievementCreateResponse, AchievementUpdateResponse, AchievementDeleteResponse, AchievementDetailResponse } from "types/achievement.api"

const API_BASE = '/api/achievement';

/**
 * Fetch all achievements
 */
export async function fetchAchievements(): Promise<AchievementListResponse> {
    const response = await fetch(API_BASE);
    
    if (!response.ok) {
        throw new Error('Failed to fetch achievements');
    }
    
    return await response.json();
}

/**
 * Fetch a single achievement by ID
 */
export async function fetchAchievement(id: string): Promise<AchievementDetailResponse> {
    const response = await fetch(`${API_BASE}/${id}`);
    
    if (!response.ok) {
        throw new Error('Failed to fetch achievement');
    }
    
    return await response.json();
}

/**
 * Create a new achievement
 */
export async function createAchievement(data: AchievementRequest): Promise<AchievementCreateResponse> {
    const response = await fetch(API_BASE, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    
    if (!response.ok) {
        throw new Error('Failed to create achievement');
    }
    
    return await response.json();
}

/**
 * Update an existing achievement
 */
export async function updateAchievement(id: string, data: AchievementRequest): Promise<AchievementUpdateResponse> {
    const response = await fetch(`${API_BASE}/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    
    if (!response.ok) {
        throw new Error('Failed to update achievement');
    }
    
    return await response.json();
}

/**
 * Delete an achievement
 */
export async function deleteAchievement(id: string): Promise<AchievementDeleteResponse> {
    const response = await fetch(`${API_BASE}/${id}`, {
        method: 'DELETE',
    });
    
    if (!response.ok) {
        throw new Error('Failed to delete achievement');
    }
    
    return await response.json();
}
