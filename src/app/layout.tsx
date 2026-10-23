import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Geist } from 'next/font/google';

import { cn } from '@web/lib/utils';
import { ThemeProvider } from '@components/ThemeProvider';
import { ThemeToggle } from '@components/ThemeToggle';

import { AdminNavButton } from '@catalog';
import { ReservationsNavButton } from '@booking/components/ReservationsNavButton';

import { Providers } from './providers';

import '@web/lib/zod-pt-br';
import './globals.css';

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Ludens',
  description: 'Ingressos do teatro comunitário',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="pt-BR"
      className={cn('font-sans', geist.variable)}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <Providers>
            {children}

            <div className="fixed right-4 top-4 z-50 flex items-center gap-2">
              <AdminNavButton />
              <ReservationsNavButton />
              <ThemeToggle />
            </div>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
