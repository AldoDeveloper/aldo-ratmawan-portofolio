import React from "react";
import { Skeleton } from 'primereact/skeleton';
import { LayoutContextModeConfig } from "../../layout/layoutContext";

export const MySkeleton = ({ width, height, mb } : { width?: string, height?: string, mb?: string }): React.JSX.Element => {
    const { layoutMode } = React.useContext(LayoutContextModeConfig);
    return (
        <Skeleton
            width={width}
            height={height === undefined ? '1.1rem' : height}
            className={`mx-auto d-block ${mb} ${layoutMode?.theme === 'dark' ? 'bg-skelton-dark' : ''}`}>
        </Skeleton>
    )
}