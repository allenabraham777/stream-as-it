'use client';
import React, { useCallback, useEffect } from 'react';
import { Mic, MicOff, ScreenShare, ScreenShareOff, Video, VideoOff } from 'lucide-react';

import { Button, cn } from '@stream-as-it/ui';

import {
    resetScreenShareStream,
    resetVideoStream,
    setAudioStatus,
    setCanvasAudioStatus,
    setScreenShareStream,
    setScreenStatus,
    setVideoStatus,
    setVideoStream
} from '@/store';
import useAppSelector from '@/hooks/useAppSelector';
import useAppDispatch from '@/hooks/useAppDispatch';
import useCamera from '@/hooks/stream/useCamera';
import useScreen from '@/hooks/stream/useScreen';

type Props = {};

const Controller = (props: Props) => {
    const dispatch = useAppDispatch();
    const { audio, video, screen } = useAppSelector((state) => state.stream.streamStudioStatus);
    const { stream, startCamera, stopCamera } = useCamera();
    const { screenShareStream, startScreenShare, stopScreenShare } = useScreen();

    useEffect(() => {
        startCamera({ width: 1920, height: 1080 }).catch((error) => {
            dispatch(setAudioStatus(false));
            dispatch(setVideoStatus(false));
            console.error(error);
        });
        return () => {
            stopCamera();
        };
    }, []);

    useEffect(() => {
        if (screen) {
            startScreenShare().catch((error) => {
                dispatch(setScreenStatus(false));
                console.error(error);
            });
        } else {
            stopScreenShare();
        }
        return () => {
            stopScreenShare();
        };
    }, [screen]);

    useEffect(() => {
        dispatch(setVideoStream(stream));

        return () => {
            dispatch(resetVideoStream());
        };
    }, [stream]);

    useEffect(() => {
        if (!screenShareStream && screen) {
            dispatch(setScreenStatus(false));
        }
        dispatch(setScreenShareStream(screenShareStream));

        return () => {
            dispatch(resetScreenShareStream());
        };
    }, [screenShareStream]);

    const toggleAudio = useCallback(() => {
        dispatch(setAudioStatus(!audio));
        dispatch(setCanvasAudioStatus(!audio));
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
