'use client';

import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';

import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'sonner';

import { store } from '@/contexts/store';

import { AuthListener } from './AuthListener';
import { QueryProvider } from './QueryProvider';
import SheetProvider from './SheetProvider';
import { ThemeProvider } from './ThemeProvider';

function ClientProviders({ children, session }: { children: ReactNode; session: Session | null }): React.JSX.Element {
  return (
    <>
      <ThemeProvider
        attribute='class'
        defaultTheme='system'
        enableSystem
      >
        <SessionProvider session={session}>
          <Provider store={store}>
            <AuthListener />
            <QueryProvider>
              <Toaster position='top-right' />
              <SheetProvider />
              {children}
            </QueryProvider>
          </Provider>
        </SessionProvider>
      </ThemeProvider>
    </>
  );
}

export default ClientProviders;
