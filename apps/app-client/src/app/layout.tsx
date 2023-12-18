import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { cn } from '@stream-as-it/ui';
import '@stream-as-it/ui/build/style.css';

import { ThemeProvider } from '@/components/providers/ThemeProvider';
import AuthProvider from '@/components/providers/AuthProvider';
import Initializer from '@/components/providers/Initializer';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Stream As It',
    description: 'Stream from your browser to world using Stream As It.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head />
            <body className={cn(inter.className, 'h-full')}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <AuthProvider>
                        <Initializer>{children}</Initializer>
                    </AuthProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
