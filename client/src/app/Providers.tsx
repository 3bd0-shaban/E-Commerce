'use client';
import { ThemeProvider } from 'next-themes'
import React from "react";
import { Provider } from 'react-redux';
import { store } from '@Redux/Store';
import { AuthProvider } from '@Contexts/AuthContext';
import { UserProvider } from '@Contexts/UserContextProps';
import { SessionProvider } from 'next-auth/react';

type providersProps = {
  children: React.ReactNode;
  session?: any;
};
export default function Providers({ children, session }: providersProps) {


  return (
    <SessionProvider session={session}>

      <Provider store={store}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <AuthProvider>
            <UserProvider>
              <div className=" min-h-screen">
                {children}
              </div>
            </UserProvider>
          </AuthProvider>
        </ThemeProvider>
      </Provider>
    </SessionProvider >
  );
}
