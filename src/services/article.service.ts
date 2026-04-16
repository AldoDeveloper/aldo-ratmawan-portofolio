import { ArticleRequest, ArticleResponse, ArticleListResponse, ArticleCreateResponse, ArticleUpdateResponse, ArticleDeleteResponse, ArticleDetailResponse } from "types/article.api";

const API_BASE = '/api/articles';

export async function fetchArticles(): Promise<ArticleListResponse> {
    const response = await fetch(API_BASE);
    if (!response.ok) throw new Error('Failed to fetch articles');
    return await response.json();
}

export async function fetchArticle(id: string): Promise<ArticleDetailResponse> {
    const response = await fetch(`${API_BASE}/${id}`);
    if (!response.ok) throw new Error('Failed to fetch article');
    return await response.json();
}

export async function createArticle(data: ArticleRequest): Promise<ArticleCreateResponse> {
    const response = await fetch(API_BASE, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    if (!response.ok) throw new Error('Failed to create article');
    return await response.json();
}

export async function updateArticle(id: string, data: ArticleRequest): Promise<ArticleUpdateResponse> {
    const response = await fetch(`${API_BASE}/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    if (!response.ok) throw new Error('Failed to update article');
    return await response.json();
}

export async function deleteArticle(id: string): Promise<ArticleDeleteResponse> {
    const response = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Failed to delete article');
    return await response.json();
}
