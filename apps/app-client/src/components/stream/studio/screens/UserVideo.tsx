'use client';
import React, { useCallback } from 'react';
import { Mic, MicOff, User, Video as VideoIcon, VideoOff, Plus } from 'lucide-react';

import { Button, cn } from '@stream-as-it/ui';

import useAppDispatch from '@/hooks/useAppDispatch';
import useAppSelector from '@/hooks/useAppSelector';
import { setAudioStatus, setCanvasVideoStatus, setVideoStatus } from '@/store';
import ReactPlayer from 'react-player';
import { useSession } from 'next-auth/react';

type Props = {};

const UserVideo = (props: Props) => {
    const { data } = useSession();
    const dispatch = useAppDispatch();
    const { audio, video } = useAppSelector((state) => state.stream.streamStudioStatus);
    const { video: videoStatus } = useAppSelector((state) => state.slate.loadStatus);
    const { videoStream } = useAppSelector((state) => state.stream.streamData);

    const toggleAudio = useCallback(() => {
        dispatch(setAudioStatus(!audio));
    }, [audio]);

    const toggleVideo = useCallback(() => {
        dispatch(setVideoStatus(!video));
    }, [video]);

    const toggleCanvasVideo = useCallback(() => {
        dispatch(setCanvasVideoStatus(!videoStatus));
    }, [videoStatus]);

    return (
        <div className="aspect-video h-36 relative rounded-md overflow-hidden group cursor-pointer">
            <p className="absolute right-2 top-2 flex gap-2 z-10">
                <Button
                    variant="icon"
                    className={cn('bg-secondary cursor-pointer h-6 w-6 p-0', {
                        'bg-red-500 hover:bg-red-400 text-background hover:text-background': audio
                    })}
                    onClick={toggleAudio}
                >
                    {audio ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                </Button>
                <Button
                    variant={video ? 'default' : 'icon'}
                    className={cn('cursor-pointer h-6 w-6 p-0', {
                        'text-background': video,
                        'bg-secondary': !video
                    })}
                    onClick={toggleVideo}
                >
                    {video ? <VideoIcon className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
                </Button>
            </p>
            <Button
                className="hidden group-hover:flex absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] gap-2 z-10"
                onClick={toggleCanvasVideo}
            >
                <Plus />
                {videoStatus ? <span>Remove from Slate</span> : <span>Add to Slate</span>}
            </Button>
            <ReactPlayer
                url={video ? (videoStream as MediaStream) : '/assets/user.png'}
                config={{
                    file: { attributes: { poster: '/assets/user.png', id: 'user-video' } }
                }}
                style={{ height: '100%', width: '100%' }}
                width="100%"
                height="100%"
                playing
                muted
            />
            <div className="w-full p-1 absolute bottom-0 left-0 bg-primary text-primary-foreground text-sm flex gap-2">
                <User className="h-5" />
                <span className="flex-1">{data?.user?.name || 'User'}</span>
            </div>
        </div>
    );
};

export default UserVideo;
