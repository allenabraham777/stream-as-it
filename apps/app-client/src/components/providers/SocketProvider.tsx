'use client';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import io, { Socket } from 'socket.io-client';
import _ from 'underscore';

import { SocketContext } from '@/context/socketContext';

const BASE_URL = `${process.env.NEXT_PUBLIC_STREAM_BACKEND_URL}`;

type Props = {
    children: React.ReactNode;
};

function loadSocket(token: string, setSocket: (value: Socket) => void) {
    const socket = io(BASE_URL, { query: { token } });
    setSocket(socket);
}

const debouncedLoadSocket = _.debounce(loadSocket, 500, true);

const SocketProvider = ({ children }: Props) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const { data } = useSession();

    useEffect(() => {
        const accessToken = data?.tokens.accessToken as string;
        debouncedLoadSocket(accessToken, setSocket);
        return () => {
            if (socket) {
                socket.disconnect();
                setSocket(null);
            }
        };
    }, []);
    return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>;
};

export default SocketProvider;
