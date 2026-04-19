import React, { useState } from "react";
import { IPropsLayoutDashboardContext } from "../context/ContextApp";

export const useThemeHook = () => {
    const [theme, setTheme] = useState<'light' | 'dark'>('dark')
    const [profile, setProfile] = useState<any>(null);

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

    const onSetProfile = (profile: any) => {
        setProfile(profile);
    }

    const value: IPropsLayoutDashboardContext = {
        theme,
        profile,
        isSidebarOpen: false,
        onToggleTheme,
        onSetProfile,
        onToggleSidebar: () => { }
    }


    return value;
}