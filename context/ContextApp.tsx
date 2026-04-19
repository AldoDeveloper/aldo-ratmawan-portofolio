import React from "react";

export interface IPropsLayoutDashboardContext {
    theme: 'light' | 'dark',
    isSidebarOpen?: boolean;
    profile?: any;
    onToggleTheme?: () => void;
    onToggleSidebar?: () => void;
    onSetProfile?: (profile: any) => void;
}

export const LayoutDashboardContext = React.createContext<IPropsLayoutDashboardContext>({
    theme: 'light',
    isSidebarOpen: false,
    profile: null,
    onToggleTheme: () => { },
    onToggleSidebar: () => { },
    onSetProfile: (profile: any) => {},
})