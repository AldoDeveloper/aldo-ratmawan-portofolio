
import React from 'react';
import { Advantage, PropsGaleriaOptions, PropsProject, PropsWorkExperience } from '../../../types/type';
import { FirebaseContextProvider } from '../../../context/ContextApp';
import {
    Firestore,
    collection,
    onSnapshot,
    getFirestore,
    query,
    getDocs,
} from 'firebase/firestore';

import { showImagesPortfolio } from '../../../firebase/storage/showStorage';
import { FirebaseApp } from 'firebase/app';
import { slugh } from '@/Help/StringHelp';

export function useListServiceAdvantage() {

    const firebaseApp = React.useContext(FirebaseContextProvider);
    const [advantage, setAdvantage] = React.useState<Advantage[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);

    React.useEffect(() => {
        const dbRef = collection(firebaseApp?.appInitialize as Firestore, 'advantage');
        onSnapshot(dbRef, (snapshot) => {
            snapshot.docs.map(async (values) => {
                const pathFull = await showImagesPortfolio(firebaseApp?.appStorage, `advantage/${values?.data()?.path}`);
                const pathModedark = Object.hasOwn(values?.data(), 'modeDark') ? await showImagesPortfolio(firebaseApp?.appStorage, `advantage/${values?.data()?.modeDark?.path}`) : await showImagesPortfolio(firebaseApp?.appStorage, `advantage/${values?.data()?.path}`);
                const dataMap: Advantage = {
                    name: values?.data().name,
                    description: values?.data().description,
                    path: pathFull,
                    start: values?.data().start as number,
                    classColor: values?.data().classColor,
                    modeDark: { path: pathModedark }
                };
                setLoading(false);
                setAdvantage((values) => [...values, dataMap]);
            })
        })
    }, []);
    return { loading, advantage };
}

export function useShowServiceKey(...stringPath: string[]) {
    const [service, setService] = React.useState<any>([]);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<any>(null);
    const firebaseApp = React.useContext(FirebaseContextProvider);
    const db = getFirestore(firebaseApp?.appFirestore as FirebaseApp);

    React.useEffect(() => {
        setTimeout(async () => {
            try {
                const queryData = query(collection(db, 'service', ...stringPath));
                const querySnapshot = await getDocs(queryData);
                querySnapshot.forEach((snapshot) => {
                    if (snapshot?.exists()) {
                        setLoading(false);
                        setService((values: any) => ([...values, snapshot.data()]))
                    }
                })
            } catch (error) {
                setLoading(true)
                setError(error)
            }
        }, 3000)
    }, []);
    return { loading, service, setService, error };
}

export async function TrigerService(
    firebaseApp?: FirebaseApp,
    strCollection?: string, ...stringPath: string[]) {
    var data: any = [];
    var isError: boolean = false;

    try {
        const db = getFirestore(firebaseApp as FirebaseApp);
        const queryRef = query(collection(db, strCollection as string, ...stringPath));
        const snapshot = await getDocs(queryRef);
        snapshot.forEach((snapshot) => {
            if (snapshot?.exists()) {
                data.push(snapshot?.data() as any);
            }
        });
    } catch (error) {
        isError = true;
    }
    return { data, isError }
}

export async function useShowContact(title?: string, firebaseApp?: FirebaseApp, img?: string, ...string: string[]) {
    var data: any = [];
    var isLoading: boolean = true;
    var isError: boolean = false;

    try {
        const db = getFirestore(firebaseApp as FirebaseApp);
        const queryRef = query(collection(db, 'contact', ...string));
        const snapshot = await getDocs(queryRef);

        snapshot.forEach((snap) => {
            if (snap.exists()) {
                isLoading = false;
                data.push(snap?.data() as any);
            }
        })
    } catch (error) {
        isError = true
        console.log(error)
    }
    const slughData = slugh(title as string);
    return { isError, isLoading, data, title, img, slughData }
}

export function useServiceProject() {
    const firebaseApp = React.useContext(FirebaseContextProvider);
    const [project, setProject] = React.useState<PropsProject[]>([]);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [error, setError] = React.useState<any>(null);

    React.useEffect(() => {
        try {
            setTimeout(async () => {
                const db = getFirestore(firebaseApp?.appFirestore as FirebaseApp)
                const focRef = query(collection(db, 'project'));
                const doc = await getDocs(focRef);
                doc.forEach(async (snapshot) => {
                    if (snapshot?.exists()) {
                        setLoading(true);
                        const ulrBg = snapshot?.data()?.urlBackground === null ? '/assets/image/data-back.png' : await showImagesPortfolio(
                            firebaseApp?.appFirestore,
                            `project/${snapshot?.data()?.urlBackground}`);

                        const mediaData: PropsGaleriaOptions[] = snapshot?.data()?.media instanceof Array ? snapshot?.data()?.media.map(
                            (media: PropsGaleriaOptions) => {
                                showImagesPortfolio(firebaseApp?.appFirestore, `project/${media.img_url}`).then((values) => {
                                    media['img_url'] = values;
                                })
                                return media;
                            }) : [];

                        const dataProject: PropsProject = {
                            deploy: snapshot?.data()?.deploy,
                            doc: {
                                description: snapshot?.data()?.doc.description,
                                images: snapshot?.data()?.doc.images,
                                listInfo: snapshot?.data()?.doc.listInfo
                            },
                            name: snapshot?.data()?.name,
                            repo: snapshot?.data()?.repo,
                            techno: snapshot?.data()?.techno,
                            title: snapshot?.data()?.title,
                            weblink: snapshot?.data()?.weblink,
                            urlBackground: ulrBg,
                            media: mediaData,

                        }
                        setProject((values) => ([...values, dataProject]));
                        return;
                    }
                })
            }, 2000)
        } catch (error) {
            setLoading(true)
            setError(error)
        }
    }, []);

    return { loading, error, project }
}

export function useWorkExperince(){
    const firebaseApp = React.useContext(FirebaseContextProvider);
    const [workExp, setWorkExp] = React.useState<PropsWorkExperience[]>([]);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [error, setError] = React.useState<any>(null);

    React.useEffect(() =>{
        try{
            setTimeout(async() =>{
                const db  = getFirestore(firebaseApp?.appFirestore as FirebaseApp)
                const focRef = query(collection(db, 'workExperience'));
                const doc = await getDocs(focRef);
                doc.forEach((snapshot) => {
                    if(snapshot.exists()){
                        setLoading(true);
                        setWorkExp((values) => ([...values, snapshot?.data()]));
                        return;
                    }
                })
            }, 3000)
        }catch(error){
            setLoading(true);
            setError(error);
        }
    }, []);

    return { workExp, loading, error }
}