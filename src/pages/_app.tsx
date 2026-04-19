import 'react-loading-skeleton/dist/skeleton.css'
import '../styles/globals.css'
import type { AppProps } from 'next/app';
import { NextPageWithLayout } from '../../types/type';
import React from 'react';
import ErrorBoundary from '@/Error/ErrorBoundary';
import { LayoutDashboard } from '../../layout/layout.dashboars';
import { Sidebar } from '@/components/sidebar';
import { Navbar } from '@/components/ui/NavbarDasboard';
import { sidebarItems } from '../../const/sidebar.items.constans';
import { LayoutCv } from '../../layout/layout.cv';

type AppLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppLayout) {
  if (Component.getLayoutIndex) {
    return (
      <ErrorBoundary>
         <LayoutCv>
           { Component.getLayoutIndex(<Component {...pageProps} />) }
         </LayoutCv>
      </ErrorBoundary>
    )
  }

  if (Component.getLayoutDashboard) {
    return (
      <ErrorBoundary>
        <LayoutDashboard>
          <Sidebar items={sidebarItems} />
          <div className="flex-1 min-h-screen">
            <div className="w-full">
              <Navbar />
              <div className='w-full px-3 py-4 h-[91svh] overflow-y-auto'>
                <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
                  {Component.getLayoutDashboard(<Component {...pageProps} />)}
                </div>
              </div>
            </div>
          </div>
        </LayoutDashboard>
      </ErrorBoundary>
    )
  }

  return <Component {...pageProps} />
} 