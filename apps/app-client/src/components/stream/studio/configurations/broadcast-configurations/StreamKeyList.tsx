'use client';
import React, { useEffect } from 'react';
import { Ban, CheckCircle2, Loader2, Trash } from 'lucide-react';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
    Button,
    Card,
    Typography,
    cn,
    toast
} from '@stream-as-it/ui';
import { streamingTypes } from '@stream-as-it/constants';
import { StreamKey } from '@stream-as-it/types';

import StreamKeyManager from './StreamKeyManager';

import useAppDispatch from '@/hooks/useAppDispatch';
import { fetchStreamById } from '@/store';
import { useParams } from 'next/navigation';
import useAppSelector from '@/hooks/useAppSelector';
import { deleteStreamKey } from '@/api/stream';

type Props = {};

type DeleteProps = {
    streamKey: StreamKey;
};

const DeleteStreamKey = (props: DeleteProps) => {
    const dispatch = useAppDispatch();
    const onContinue = async () => {
        try {
            await deleteStreamKey(props.streamKey.stream_id, props.streamKey.id);
            toast('Stream key updated successfully', {
                icon: <CheckCircle2 className="text-primary" />
            });
            dispatch(fetchStreamById(props.streamKey.stream_id));
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error(error);
            toast('Stream key action failed', {
                description: error?.response?.data?.message || 'Please try again later!',
                icon: <Ban className="text-destructive" />
            });
        }
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant={'destructive'} size="sm">
                    <Trash />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will delete the stream key from the
                        stream.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onContinue}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

const StreamKeyList = (props: Props) => {
    const dispatch = useAppDispatch();
    const { stream, loading } = useAppSelector((state) => state.broadcast);
    const params = useParams<{ stream_id: string }>();
    useEffect(() => {
        if (params.stream_id) dispatch(fetchStreamById(+params.stream_id));
    }, [params]);
    if (loading)
        return (
            <div className="py-8 flex justify-center">
                <Loader2 className="animate-spin text-primary w-12 h-12" />
            </div>
        );

    return (
        <div className="py-8 flex flex-col gap-4">
            <Typography className={cn('!text-primary', { hidden: !stream?.stream_keys?.length })}>
                Streams Attached
            </Typography>
            <div className={cn('flex flex-col gap-4', { hidden: stream?.stream_keys?.length })}>
                <Typography variant="h3">No streams attached</Typography>
                <Typography variant="blockquote">
                    Please attach stream clients to start streaming
                </Typography>
            </div>
            {stream?.stream_keys?.map((stream_key: StreamKey) => (
                <Card key={stream_key.id} className="relative overflow-hidden">
                    <div className="p-4 flex gap-1 group">
                        <Typography>
                            {
                                streamingTypes.details[
                                    stream_key.platform as keyof typeof streamingTypes.details
                                ].label
                            }
                        </Typography>
                        <div className="absolute top-0 right-0 left-0 bottom-0 bg-secondary hidden group-hover:flex cursor-pointer justify-center items-center gap-4">
                            <StreamKeyManager isUpdate streamKey={stream_key} />
                            <DeleteStreamKey streamKey={stream_key} />
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    );
};

export default StreamKeyList;
