import { ContactRequest, ContactResponse, ContactListResponse, ContactCreateResponse, ContactUpdateResponse, ContactDeleteResponse, ContactDetailResponse } from "@/types/contact.api";

const API_BASE = '/api/contacts';

export async function fetchContacts(): Promise<ContactListResponse> {
    const response = await fetch(API_BASE);
    if (!response.ok) throw new Error('Failed to fetch contacts');
    return await response.json();
}

export async function fetchContact(id: string): Promise<ContactDetailResponse> {
    const response = await fetch(`${API_BASE}/${id}`);
    if (!response.ok) throw new Error('Failed to fetch contact');
    return await response.json();
}

export async function createContact(data: ContactRequest): Promise<ContactCreateResponse> {
    const response = await fetch(API_BASE, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    if (!response.ok) throw new Error('Failed to create contact');
    return await response.json();
}

export async function updateContact(id: string, data: ContactRequest): Promise<ContactUpdateResponse> {
    const response = await fetch(`${API_BASE}/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    if (!response.ok) throw new Error('Failed to update contact');
    return await response.json();
}

export async function deleteContact(id: string): Promise<ContactDeleteResponse> {
    const response = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Failed to delete contact');
    return await response.json();
}
