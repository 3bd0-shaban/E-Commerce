'use client';
import { ThemeProvider } from 'next-themes'
import React from "react";
import { Provider } from 'react-redux';
import { store } from '@Redux/Store';
import { AuthProvider } from '@Contexts/AuthContext';
import { UserProvider } from '@Contexts/UserContextProps';
import Router from 'next/router';
import NProgress from 'nprogress';
import { PathProvider } from '@Contexts/PathContext';
import usePath from '@Hooks/usePath';

type providersProps = {
  children: React.ReactNode;
};
export default function Providers({ children }: providersProps) {

  Router.events.on('routeChangeStart', () => NProgress.start());
  Router.events.on('routeChangeComplete', () => NProgress.done());
  Router.events.on('routeChangeError', () => NProgress.done());

  Router.events.on('routeChangeComplete', () => { window.scrollTo(0, 0); });


  return (
    <Provider store={store}>
      <ThemeProvider attribute="class"
        defaultTheme="light"
      >
        <AuthProvider>
          <UserProvider>
            <PathProvider>
              <div className=" dark:text-gray-500 text-gray-700 transition-colors duration-300 min-h-screen select-none">
                {children}
              </div>
            </PathProvider>
          </UserProvider>
        </AuthProvider>
      </ThemeProvider>
    </Provider>
  );
}
