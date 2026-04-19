import { useState, useEffect } from 'react';

export const useFetchJson = <T>(url: string, options?: RequestInit): { data: T | null; error: Error | null; loading: boolean } => {
    
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    
    const fetchData = async () => {
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const jsonData: T = await response.json();
            // await new Promise(resolve => setTimeout(resolve, 5000));
            setData(jsonData);
        }
        catch (err) {
            setError(err as Error);
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return { data, error, loading };
}