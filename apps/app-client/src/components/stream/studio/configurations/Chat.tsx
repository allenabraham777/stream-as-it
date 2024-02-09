'use client';
import React from 'react';

import { streamingTypes } from '@stream-as-it/constants';
import { Typography } from '@stream-as-it/ui';

import useAppSelector from '@/hooks/useAppSelector';

type Props = {};

const Chat = (props: Props) => {
    const streamKeys = useAppSelector((state) => state.broadcast.stream?.stream_keys);
    const isLive = useAppSelector((state) => state.stream.streamStatus.isLive);
    if (!streamKeys || !isLive) {
        return (
            <div className="p-8 flex flex-col gap-4">
                <Typography variant="h3">Chats Unavailable</Typography>
                <Typography variant="p">Please start the stream to view the chats</Typography>
            </div>
        );
    }
    const streamKey = streamKeys.find(
        (streamKey) => streamKey.platform === streamingTypes.types.YOUTUBE
    );
    if (!streamKey) return null;
    return (
        <div className="flex flex-col gap-4 h-full">
            <Typography variant="h3" className="pt-4 px-8">
                Chats
            </Typography>
            <div className="flex-1">
                <iframe
                    src={`https://www.youtube.com/live_chat?v=${streamKey.video_id}&embed_domain=fly-welcomed-coyote.ngrok-free.app`}
                    style={{ width: '100%', height: '100%' }}
                ></iframe>
            </div>
        </div>
    );
};

export default Chat;
