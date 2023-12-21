import React, { useCallback, useContext, useEffect } from 'react';
import { Radio } from 'lucide-react';

import { setLiveStatus } from '@/store';
import { Button } from '@stream-as-it/ui';
import { startStream, stopStream, toggleMute } from '@/helpers/stream';
import useAppSelector from '@/hooks/useAppSelector';
import useAppDispatch from '@/hooks/useAppDispatch';
import { SocketContext } from '@/context/socketContext';

type Props = {};

const BroadcastButton = (props: Props) => {
    const dispatch = useAppDispatch();
    const { isLive } = useAppSelector((state) => state.stream.streamStatus);
    const { videoStream, screenShareStream } = useAppSelector((state) => state.stream.streamData);
    const { audio, screen } = useAppSelector((state) => state.slate.loadStatus);
    const socketContext = useContext(SocketContext);

    useEffect(() => {
        if (isLive) {
            toggleMute(audio);
        }
    }, [isLive, audio]);

    const streamHandler = useCallback(() => {
        if (!socketContext.socket) return;
        if (isLive) {
            stopStream(socketContext.socket);
        } else {
            console.log({ audio, screen });

            startStream(videoStream, screenShareStream, screen, audio, socketContext.socket);
        }
        dispatch(setLiveStatus(!isLive));
    }, [socketContext.socket, isLive, audio, screen]);

    return (
        <Button
            variant={isLive ? 'destructive' : 'default'}
            className="flex gap-2 cursor-pointer"
            size="lg"
            onClick={streamHandler}
        >
            <Radio />
            {isLive ? <span>Stop Stream</span> : <span>Start Stream</span>}
        </Button>
    );
};

export default BroadcastButton;
