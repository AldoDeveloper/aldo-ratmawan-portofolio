import React from "react";

export interface PropsContextDashboard{
    children?: React.ReactNode;
}

export default function ContextPageLayoutDashboard({ children } : PropsContextDashboard) {
    return(
        <React.Fragment>
            { children }
        </React.Fragment>
    )
}

ContextPageLayoutDashboard.getLayoutDashboard = function(page: any){
    return page;
}