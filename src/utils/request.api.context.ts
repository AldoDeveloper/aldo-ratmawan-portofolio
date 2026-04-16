import { FetchApiConfig } from "@/core/base.config.api"

const apiFetch = FetchApiConfig.create({
    base_url: process.env.BASE_API as string,
    auth: {
        username: process.env.AUTH_USERNAME as string,
        password: process.env.AUTH_PASSWORD as string
    }
});

export const getRequestApi = async<TYPE>(path: string, params?: Record<string, any>) => {

    const urlParam = new URLSearchParams(params).toString();
    const url = params ? `${path}?${urlParam}` : path;

    const result = await apiFetch.request<TYPE>({ url, method: 'GET' });
    return result;
}

export const postRequestApi = async<TYPE, DATA>(path: string, params?: Record<string,any>, data?: DATA) => {
    const urlParam = new URLSearchParams(params).toString();
    const url = params ? `${path}?${urlParam}` : path;

    const result = await apiFetch.request<TYPE>({ url, method: 'POST', options: { data, headers: {
        "Content-Type" : 'application/json'
    } }});
    return result;
}

export const patchRequestApi = async<TYPE, DATA>(path: string, params?: Record<string, any>, data?: DATA) => {
    const urlParam = new URLSearchParams(params).toString();
    const url = params ? `${path}?${urlParam}` : path;
    const result = await apiFetch.request<TYPE>({ url, method: 'PATCH', options: { data, headers: {
        "Content-Type" : 'application/json'
    } }});
    return result;
}

export const deleteRequestApi = async<TYPE, DATA extends any>(path: string, params?: Record<string, any>, data?: DATA ) => {
    const urlParam = new URLSearchParams(params).toString();
    const url = params ? `${path}?${urlParam}` : path;
    const result = await apiFetch.request<TYPE>({ url, method: 'DELETE', options: { data, headers: {
        "Content-Type" : 'application/json'
    } }});
    return result;
}