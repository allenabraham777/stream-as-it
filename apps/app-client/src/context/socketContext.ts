'use client';
import { createContext } from 'react';
import { Socket } from 'socket.io-client';

const initialState: {
    socket: null | Socket;
} = {
    socket: null
};

export const SocketContext = createContext(initialState);
