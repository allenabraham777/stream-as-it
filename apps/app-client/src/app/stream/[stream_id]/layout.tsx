import React from 'react';

import { Typography } from '@stream-as-it/ui';

import { getStreamById } from '@/api/stream';
import SocketProvider from '@/components/providers/SocketProvider';

type Props = {
    children: React.ReactNode;
    params: {
        stream_id: number;
    };
};

const Layout = async ({ children, params: { stream_id } }: Props) => {
    try {
        await getStreamById(stream_id);
        return (
            <SocketProvider>
                <div className="h-full">{children}</div>;
            </SocketProvider>
        );
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        const message = error?.response?.data?.message || 'Something went wrong';
        return (
            <div className="h-full flex-1 flex flex-col justify-center items-center gap-8">
                <Typography variant="h1">Error</Typography>
                <Typography variant="h3">{message}</Typography>
            </div>
        );
    }
};

export default Layout;
