import React, { useContext } from 'react';
import BroadcastButton from './broadcast-configurations/BroadcastButton';
import { SocketContext } from '@/context/socketContext';
import { Button } from '@stream-as-it/ui';

type Props = {};

const Broadcast = (props: Props) => {
    const socketContext = useContext(SocketContext);

    const connectYoutube = () => {
        socketContext.socket?.emit('set:youtube', { streamKey: 'key' });
    };

    const startYoutube = () => {
        socketContext.socket?.emit('start:youtube');
    };

    return (
        <div className="p-8 flex flex-col gap-4">
            <BroadcastButton />
            <Button onClick={connectYoutube}>Youtube</Button>
            <Button onClick={startYoutube}>Youtube Start</Button>
        </div>
    );
};

export default Broadcast;
