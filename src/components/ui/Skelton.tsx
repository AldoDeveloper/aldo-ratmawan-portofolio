import React from 'react';
import  { SkeletonTheme } from 'react-loading-skeleton';

export interface PropsSkeleton{
    children?: React.ReactNode;
    baseColor?: string;
    highlightColor?: string;
}

export const Skeletons : React.FC<PropsSkeleton> = ({ children, baseColor, highlightColor }) => {
    return(
        <SkeletonTheme baseColor={baseColor ?? '#374151'} highlightColor={highlightColor ?? '#4b5563'}>
            { children }
        </SkeletonTheme>
    )
}