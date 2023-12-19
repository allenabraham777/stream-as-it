'use client';
import React, { useCallback, useEffect } from 'react';
import { Mic, MicOff, ScreenShare, ScreenShareOff, Video, VideoOff } from 'lucide-react';

import { Button, cn } from '@stream-as-it/ui';

import {
    resetVideoStream,
    setAudioStatus,
    setScreenStatus,
    setVideoStatus,
    setVideoStream
} from '@/store';
import useAppSelector from '@/hooks/useAppSelector';
import useAppDispatch from '@/hooks/useAppDispatch';
import useCamera from '@/hooks/stream/useCamera';

type Props = {};

const Controller = (props: Props) => {
    const dispatch = useAppDispatch();
    const { audio, video, screen } = useAppSelector((state) => state.stream.streamStudioStatus);
    const { stream, startCamera, stopCamera } = useCamera();

    useEffect(() => {
        startCamera();
        return () => {
            stopCamera();
        };
    }, []);

    useEffect(() => {
        dispatch(setVideoStream(stream));

        return () => {
            dispatch(resetVideoStream());
        };
    }, [stream]);

    const toggleAudio = useCallback(() => {
        dispatch(setAudioStatus(!audio));
    }, [audio]);

    const toggleVideo = useCallback(() => {
        dispatch(setVideoStatus(!video));
    }, [video]);

    const toggleScreen = useCallback(() => {
        dispatch(setScreenStatus(!screen));
    }, [screen]);

    return (
        <div className="flex gap-4 justify-center">
            <Button
                variant="outline"
                className={cn('h-14 w-14 p-3 rounded-full cursor-pointer', {
                    'bg-red-500 hover:bg-red-400 text-background hover:text-background': audio
                })}
                onClick={toggleAudio}
            >
                {audio ? <Mic /> : <MicOff />}
            </Button>
            <Button
                variant={video ? 'default' : 'outline'}
                className={cn('h-14 w-14 p-3 rounded-full cursor-pointer', {
                    'text-background': video
                })}
                onClick={toggleVideo}
            >
                {video ? <Video /> : <VideoOff />}
            </Button>
            <Button
                variant="outline"
                className={cn('h-14 w-14 p-3 rounded-full cursor-pointer', {
                    'bg-blue-500 hover:bg-blue-400 text-background hover:text-background': screen
                })}
                onClick={toggleScreen}
            >
                {screen ? <ScreenShare /> : <ScreenShareOff />}
            </Button>
        </div>
    );
};

export default Controller;
