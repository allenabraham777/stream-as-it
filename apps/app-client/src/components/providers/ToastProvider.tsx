'use client';
import React from 'react';
import { useTheme } from 'next-themes';

import { Toaster } from '@stream-as-it/ui';

type ToasterProps = React.ComponentProps<typeof Toaster>;

type Props = {
    children: React.ReactNode;
};

const ToastProvider = ({ children }: Props) => {
    const { theme } = useTheme();
    return (
        <>
            <Toaster theme={theme as ToasterProps['theme']} position="top-right" />
            {children}
        </>
    );
};

export default ToastProvider;
