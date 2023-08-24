import React, { createContext, useState } from 'react'
import { LayoutConfig, LayoutConfigMode, LayoutContextMode } from '../types/type';
export const LayoutContextModeConfig = createContext({} as LayoutContextMode);

export const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
    const [navigatorOnline, setNavigatorOnline] = React.useState<boolean | null>(null);
    const [configMode, setConfigMode] = React.useState<LayoutConfigMode>({
        theme: 'dark',
        color: 'light'
    });

    React.useEffect(() => {
        const themeLocal = window.localStorage.getItem('theme');
        const themesConditions = themeLocal === null ? configMode.theme as string : themeLocal as string;
        strBodyTheme(themesConditions);
        setNavigatorOnline(navigator.onLine);
        setConfigMode((value: LayoutConfigMode) => ({ ...value, theme: themesConditions }));
    }, [configMode.theme])

    const strBodyTheme = (theme?: string) => {
        const documentSetting = document.body;
        documentSetting.setAttribute('data-bs-theme', theme as string);
        window.localStorage.setItem('theme', theme as string);
    }

    const changesMode = (theme?: string, color?: string) => {
        setConfigMode((values: LayoutConfigMode) => ({ ...values, theme: theme, color: color }));
        strBodyTheme(theme);
    }

    const values: LayoutContextMode = {
        layoutMode: configMode,
        setLayoutMode: setConfigMode,
        changesMode
    }

    return (
        <React.Fragment>
            {
                navigatorOnline === false && (
                    <div className={'panel-noconnection'}>
                        <div>
                            <img className='mx-auto d-block mb-4' src="/assets/image/no-connection.png" alt='panel-data' />
                            <h4 className='text-center fw-bold'>NO CONNECTION INTERNET !!</h4>
                        </div>
                    </div>
                )
            }
            {
                navigatorOnline === true && (
                    <LayoutContextModeConfig.Provider value={values}>
                        {children}
                    </LayoutContextModeConfig.Provider>
                )
            }
        </React.Fragment>
    )
}
