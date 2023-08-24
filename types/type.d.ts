
import React, {ReactElement, ReactNode, Dispatch, SetStateAction} from "react";
import type { NextPage } from 'next'
import { FirebaseApp } from 'firebase/app';
import { Firestore } from 'firebase/firestore';
import { StorageReference} from 'firebase/storage'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayoutIndex?: (page: ReactElement) => ReactNode;
}

export type LayoutConfig = {
    ripple: boolean;
    inputStyle: string;
    menuMode: string;
    colorScheme: string;
    theme: string;
    scale: number;          
};

export type LayoutContextMode = {
    layoutMode?: LayoutConfigMode;
    setLayoutMode ?: Dispatch<SetStateAction<LayoutConfigMode>>;
    changesMode: (theme: string, color: string) => void;
}

export type LayoutConfigMode = {
    theme?: string,
    color?: string
}

export interface LayoutContextProps {
    layoutConfig: LayoutConfig;
    setLayoutConfig: Dispatch<SetStateAction<LayoutConfig>>;
}

export type otherAbilitiesProps = {
    name?: string,
    description?: string,
    path?: string,
    start?: number
}

export type AppFirebase = {
    appInitialize?: Firestore;
    appFirestore: FirebaseApp;
    appStorage?: FirebaseApp
}

export type Advantage = {
    name?: string,
    description?: string,
    path?: string,
    start: number,
    classColor?: string,
    modeDark?: {
        path?: string
    }
}

export type PropsServiceBackend = {
    callackUrl?: string,
    description?: string,
    icon?: string,
    title?: string
}

export type PropsServiceFrontEnd = {
    callackUrl?: string,
    description?: string,
    icon?: string,
    title?: string
}
export type PropsServiceFullstack = {
    callackUrl?: string,
    description?: string,
    icon?: string,
    title?: string
}

export type Service = {
    backend?: PropsServiceBackend,
    frontend?: PropsServiceFrontEnd,
    fullstack?:PropsServiceFullstack,
}

export type ListSelectedSevice = {
    callbackUrl?: string,
    description?: string,
    icon?: string,
    title?: string
}

export type PropsProject = {
    deploy?: boolean,
    doc?: {
        description?: string,
        images?: Array,
        listInfo?: Array, 
    },
    name?: string,
    repo?: {
        name?: string,
        url?: string
    } | null,
    techno?: string,
    title?: string,
    type?: string,
    weblink?: string | null,
    urlBackground?: string,
    media?: PropsGaleriaOptions[],
}

export type PropsWorkExperience = {
    address?: string;
    company_name?: string;
    descriptionHtml?: string;
    jobType?: string;
    typeJob?: string;
    year?: string;
}

export type PropsGaleriaOptions = {
    description?: string;
    img_url?: string
}
