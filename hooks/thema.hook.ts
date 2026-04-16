import React, { useState } from "react";
import { IPropsLayoutDashboardContext } from "../context/ContextApp";

export const useThemeHook = () => {
    const [theme, setTheme] = useState<'light' | 'dark'>('light')

    React.useEffect(() => {
        const root = window.document.documentElement;
        const theme = localStorage.getItem("theme");
        root.classList.toggle('dark', theme === 'dark');
        setTheme(theme as any)
    }, []);

    const onToggleTheme = () => {
        const root  = window.document.documentElement;
        const theme = localStorage.getItem("theme");
        if (theme === "dark") {
            localStorage.setItem("theme", "light");
            root.classList.remove("dark");
            setTheme('light')
        } else {
            localStorage.setItem("theme", "dark");
            root.classList.add("dark");
            setTheme('dark')
        }
    }

    const value: IPropsLayoutDashboardContext = {
        theme,
        isSidebarOpen: false,
        onToggleTheme,
        onToggleSidebar: () => { }
    }


    return value;
}