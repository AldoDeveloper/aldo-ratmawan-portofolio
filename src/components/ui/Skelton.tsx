import React, { useContext } from 'react';
import  { SkeletonTheme } from 'react-loading-skeleton';
import { LayoutDashboardContext } from '../../../context/ContextApp';

export interface PropsSkeleton{
    children?: React.ReactNode;
    baseColor?: string;
    highlightColor?: string;
}

export const Skeletons : React.FC<PropsSkeleton> = ({ children, baseColor, highlightColor }) => {

    const { theme } = useContext(LayoutDashboardContext);

    const map_color : Record<string, any> = {
        "dark" : ['#374151', '#4b5563'],
        "light" : ['#e5e7eb', '#f3f4f6']
    };

    return(
        <SkeletonTheme 
            baseColor={map_color[theme as any][0]} 
            highlightColor={map_color[theme as any][1]}>
            { children }
        </SkeletonTheme>
    )
}