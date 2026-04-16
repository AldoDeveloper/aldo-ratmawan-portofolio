

export interface AuthApiConfig{
    username: string;
    password: string;
}

export interface ApiConfig{
    base_url: string;
    auth: AuthApiConfig;
}

export interface IRequestOptionRequest{
    data?: any;
    headers ?: Record<string, any>;
    cache?: RequestCache;
    signal?: AbortSignal;
}

export interface IRequestApi{
    url: string;
    method: 'GET' | "POST" | 'PATCH' | 'DELETE' | 'PUT' | 'OPTIONS',
    options?: IRequestOptionRequest
}

export class FetchApiConfig{

    private static instance: FetchApiConfig;
    private configFetch !: ApiConfig;

    constructor(config: ApiConfig){
        this.configFetch = config;
    }

    static create(config: ApiConfig) {
        
        if(!this.instance){
            FetchApiConfig.instance = new FetchApiConfig(config);
        }
        return FetchApiConfig.instance;
    }

    private getTokenBasicAuth() {
        const token = Buffer.from(`${this.configFetch.auth.username}:${this.configFetch.auth.password}`).toString('base64');
        return token;
    }

    async requestFormData<T>(path: string, data?: Record<string, string | File>) : Promise<Response> {
        const token= this.getTokenBasicAuth();
        const url = `${this.configFetch.base_url}/${path}`;
        const headers = new Headers();
        headers.set('Authorization', `Basic ${token}`);
        headers.set('Content-Type', 'multipart/form-data');

        const formData = new FormData();
        if(data){
            for(const [key, value] of Object.entries(data)){
                formData.set(key, value);
            }
        }

        const fetchFormData = await fetch(url, { headers, body: formData });
        return fetchFormData

    }

    async request<T>(config: IRequestApi): Promise<T> {

        const url = `${this.configFetch.base_url}/${config.url}`;
        const token = Buffer.from(`${this.configFetch.auth.username}:${this.configFetch.auth.password}`).toString('base64');

        const addHeaders = config.options?.headers ? Object.entries(config.options.headers): undefined;

        const headers = new Headers();
        headers.set('Authorization', `Basic ${token}`);

        if(addHeaders){
            for(const [key, value] of addHeaders){
                headers.set(key, value);
            }
        }
        
        const apiFetch = await fetch(url, {
            method : config.method,
            headers,
            body   : JSON.stringify(config.options?.data),
            cache  : config.options?.cache,
            signal : config.options?.signal
        });

        return await apiFetch.json();
    }
}