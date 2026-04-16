import React from "react";

export interface IPropsLayoutDashboardContext{
    theme ?: 'light' | 'dark',
    isSidebarOpen?: boolean;
    onToggleTheme?: () => void;
    onToggleSidebar?: () => void;
}   

export const LayoutDashboardContext = React.createContext<IPropsLayoutDashboardContext>({
    theme: 'light',
    isSidebarOpen: false,
    onToggleTheme: () => {},
    onToggleSidebar: () => {}
})