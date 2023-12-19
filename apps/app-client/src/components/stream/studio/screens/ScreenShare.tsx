'use client';
import React, { useCallback } from 'react';
import { User, Plus, ScreenShareOff, ScreenShare as ScreenShareIcon } from 'lucide-react';

import { Button, cn } from '@stream-as-it/ui';

import useAppDispatch from '@/hooks/useAppDispatch';
import useAppSelector from '@/hooks/useAppSelector';
import { setScreenStatus } from '@/store';
import ReactPlayer from 'react-player';
import { useSession } from 'next-auth/react';

type Props = {};

const ScreenShare = (props: Props) => {
    const { data } = useSession();
    const dispatch = useAppDispatch();
    const { screen } = useAppSelector((state) => state.stream.streamStudioStatus);
    const { screenShareStream } = useAppSelector((state) => state.stream.streamData);

    const toggleScreen = useCallback(() => {
        dispatch(setScreenStatus(!screen));
    }, [screen]);

    return (
        <div
            className={cn(
                'aspect-video bg-black h-36 relative rounded-md overflow-hidden group cursor-pointer block',
                { hidden: !screen }
            )}
        >
            <p className="hidden group-hover:flex absolute right-2 top-2 gap-2 z-10">
                <Button
                    variant="icon"
                    className={cn('cursor-pointer h-6 w-6 p-0', {
                        'text-background bg-blue-500 hover:bg-blue-400': screen,
                        'bg-secondary': !screen
                    })}
                    onClick={toggleScreen}
                >
                    {screen ? (
                        <ScreenShareIcon className="h-4 w-4" />
                    ) : (
                        <ScreenShareOff className="h-4 w-4" />
                    )}
                </Button>
            </p>
            <Button className="hidden group-hover:flex absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] gap-2">
                <Plus />
                <span>Add to Slate</span>
            </Button>
            <ReactPlayer
                url={screen ? (screenShareStream as MediaStream) : undefined}
                style={{ height: '100%', width: '100%' }}
                width="100%"
                height="100%"
                playing
                muted
            />
            <div className="w-full p-1 absolute bottom-0 left-0 bg-primary text-primary-foreground text-sm flex gap-2">
                <User className="h-5" />
                <span className="flex-1">{data?.user?.name || 'User'}'s Screen</span>
            </div>
        </div>
    );
};

export default ScreenShare;
