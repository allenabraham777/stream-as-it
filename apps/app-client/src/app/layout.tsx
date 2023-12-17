import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import { cn } from '@stream-as-it/ui';
import '@stream-as-it/ui/build/style.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import AppProvider from '@/store/AppProvider';
import StoreInitializer from '@/components/StoreInitializer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Stream As It',
    description: 'Stream from your browser to world using Stream As It.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <AppProvider>
            <html lang="en" suppressHydrationWarning>
                <head />
                <body className={cn(inter.className, 'h-full')}>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <StoreInitializer>{children}</StoreInitializer>
                    </ThemeProvider>
                </body>
            </html>
        </AppProvider>
    );
}
