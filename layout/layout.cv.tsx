import React, { FC } from "react";
import { useThemeHook } from "../hooks/thema.hook";
import { LayoutDashboardContext } from "../context/ContextApp";

export const LayoutCv: FC<{ children?: React.ReactNode }> = ({ children }) => {

    const value = useThemeHook();
    return(
        <React.Fragment>
           <LayoutDashboardContext.Provider value={value}>
             { children }
           </LayoutDashboardContext.Provider>
        </React.Fragment>
    )
}