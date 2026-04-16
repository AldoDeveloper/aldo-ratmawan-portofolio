import React from "react";
import { IPropsLayoutDashboardContext, LayoutDashboardContext } from "../context/ContextApp";
import { useThemeHook } from "../hooks/thema.hook";

export interface IPropsLayoutDashboard{
    children?: React.ReactNode;
};


export const LayoutDashboard : React.FC<IPropsLayoutDashboard> = ({ children }) => {

    const value = useThemeHook();
    
    return(
        <React.Fragment>
           <LayoutDashboardContext.Provider value={value}>
             <div className="flex overflow-hidden bg-gray-100 dark:bg-gray-900">
                { children }
             </div>
           </LayoutDashboardContext.Provider>
        </React.Fragment>
    )
}