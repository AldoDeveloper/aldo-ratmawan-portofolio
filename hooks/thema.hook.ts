import React from "react";
import { IPropsLayoutDashboardContext } from "../context/ContextApp";

export const useThemeHook = () => {

    React.useEffect(() => {
        const root = window.document.documentElement;
        const theme = localStorage.getItem("theme");
        root.classList.toggle('dark', theme === 'dark');
    });

    const onToggleTheme = () => {
        const root  = window.document.documentElement;
        const theme = localStorage.getItem("theme");
        if (theme === "dark") {
            localStorage.setItem("theme", "light");
            root.classList.remove("dark");
        } else {
            localStorage.setItem("theme", "dark");
            root.classList.add("dark");
        }
    }

    const value: IPropsLayoutDashboardContext = {
        isSidebarOpen: false,
        onToggleTheme,
        onToggleSidebar: () => { }
    }


    return value;
}