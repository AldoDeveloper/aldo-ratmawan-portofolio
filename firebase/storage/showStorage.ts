import { FirebaseApp } from 'firebase/app';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

export async function showImagesPortfolio(app?: FirebaseApp, path?: string) : Promise<string>{
    const storage = getStorage(app);
    const refStorage = ref(storage, `portoflio/${path}`);
    const urlData = await getDownloadURL(refStorage);
    return urlData;
}

export async function resumeUrlData(app?: FirebaseApp, path?:string) : Promise<string>{
    const storage = getStorage(app);
    const refStorage = ref(storage, `portoflio/resume/${path}`);
    const urlData = await getDownloadURL(refStorage);
    return urlData;
}