'use client';
import { ThemeProvider } from 'next-themes'
import React from "react";
import { Provider } from 'react-redux';
import { store } from '@Redux/Store';
import { AuthProvider } from '@Contexts/AuthContext';
import { UserProvider } from '@Contexts/UserContextProps';

type providersProps = {
  children: React.ReactNode;
};
export default function Providers({ children }: providersProps) {



  return (
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
  );
}
