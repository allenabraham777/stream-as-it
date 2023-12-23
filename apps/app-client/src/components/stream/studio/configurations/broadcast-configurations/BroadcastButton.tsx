import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Radio } from 'lucide-react';

import { setLiveStatus } from '@/store';
import { Button, toast } from '@stream-as-it/ui';
import { startStream, stopStream, toggleMute } from '@/helpers/stream';
import useAppSelector from '@/hooks/useAppSelector';
import useAppDispatch from '@/hooks/useAppDispatch';
import { SocketContext } from '@/context/socketContext';
import { streamingTypes } from '@stream-as-it/constants';

type Props = {};

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const BroadcastButton = (props: Props) => {
    const [processing, setProcessing] = useState(false);
    const dispatch = useAppDispatch();
    const { isLive } = useAppSelector((state) => state.stream.streamStatus);
    const { videoStream, screenShareStream } = useAppSelector((state) => state.stream.streamData);
    const { audio, screen } = useAppSelector((state) => state.slate.loadStatus);
    const { stream, loading } = useAppSelector((state) => state.broadcast);
    const socketContext = useContext(SocketContext);

    useEffect(() => {
        if (isLive) {
            toggleMute(audio);
        }
    }, [isLive, audio]);

    const streamHandler = useCallback(async () => {
        if (!socketContext.socket || processing || !stream?.stream_keys?.length) return;
        dispatch(setLiveStatus(!isLive));
        setProcessing(() => true);
        try {
            if (isLive) {
                await delay(10000);
                stopStream(socketContext.socket);
            } else {
                for (const streamKey of stream.stream_keys) {
                    socketContext.socket.emit(`set:${streamKey.platform.toLowerCase()}`, {
                        streamKey: streamKey.stream_key
                    });
                    toast(
                        `Stream set for ${
                            streamingTypes.details[
                                streamKey.platform as keyof typeof streamingTypes.details
                            ].label
                        }`
                    );
                    await delay(2000);
                    socketContext.socket.emit(`start:${streamKey.platform.toLowerCase()}`);
                    await delay(1000);
                }
                await delay(3000);
                startStream(
                    videoStream,
                    screenShareStream,
                    screen,
                    audio,
                    socketContext.socket,
                    stream.stream_keys
                );
                toast('Live stream started');
            }
        } catch (error) {
            console.error(error);
            dispatch(setLiveStatus(false));
        }
        setProcessing(() => false);
    }, [socketContext.socket, isLive, audio, screen, processing, stream]);

    return (
        <Button
            variant={isLive ? 'destructive' : 'default'}
            className="flex gap-2 cursor-pointer"
            size="lg"
            onClick={streamHandler}
            loader={loading || processing}
            disabled={loading || processing || !stream?.stream_keys?.length}
        >
            <Radio />
            {isLive ? <span>Stop Stream</span> : <span>Start Stream</span>}
        </Button>
    );
};

export default BroadcastButton;
