import type { AppProps } from 'next/app';
import { NextPageWithLayout } from '../../types/type';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import '../styles/globals.css';
import { initializeApp } from 'firebase/app';
import { LayoutProvider } from '../../layout/layoutContext';
import { getFirestore } from 'firebase/firestore';
import { configFirebaseFirestore } from '../../firebase/configFirebase';
import { FirebaseContextProvider } from '../../context/ContextApp';
import ErrorBoundary from '@/Error/ErrorBoundary';

const firestoreData = getFirestore(initializeApp(configFirebaseFirestore));

type AppLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppLayout) {
  if (Component.getLayoutIndex) {
    return (
      <ErrorBoundary>
        <LayoutProvider>
          <FirebaseContextProvider.Provider value={
            {
              appInitialize: firestoreData,
              appFirestore: initializeApp(configFirebaseFirestore),
              appStorage: initializeApp(configFirebaseFirestore)
            }}>
            {Component.getLayoutIndex(<Component {...pageProps} />)}
          </FirebaseContextProvider.Provider>
        </LayoutProvider>
      </ErrorBoundary>
    )
  }
  return <Component {...pageProps} />
} 