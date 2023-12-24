'use client';
import React, { useLayoutEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Ban, CheckCircle2, Loader, Pencil, Plus } from 'lucide-react';

import {
    Button,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTrigger,
    Input,
    Label,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    Typography,
    cn,
    toast
} from '@stream-as-it/ui';
import { StreamKey } from '@stream-as-it/types';

import { addStreamKey, updateStreamKey } from '@/api/stream';
import { fetchStreamById } from '@/store';
import useAppDispatch from '@/hooks/useAppDispatch';
import useAppSelector from '@/hooks/useAppSelector';

type Props = {
    isUpdate?: boolean;
    streamKey?: StreamKey;
};

const StreamKeyManager = ({ isUpdate = false, streamKey }: Props) => {
    const dispatch = useAppDispatch();
    const { loading: broadcastLoader } = useAppSelector((state) => state.broadcast);
    const { isLive } = useAppSelector((state) => state.stream.streamStatus);
    const searchParams = useParams<{ stream_id: string }>();
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [streamPlatform, setStreamPlatform] = useState<string>('');
    const [streamUrl, setStreamUrl] = useState<string>('');
    const [streamKeyValue, setStreamKeyValue] = useState<string>('');
    const [streamVideoId, setStreamVideoId] = useState<string>('');
    const [error, setError] = useState({
        url: '',
        key: '',
        platform: ''
    });

    useLayoutEffect(() => {
        if (!loading && open && isUpdate && streamKey) {
            setStreamKeyValue(streamKey.stream_key);
            setStreamUrl(streamKey.stream_url);
            setStreamVideoId(streamKey.video_id || '');
            setStreamPlatform(streamKey.platform);
        }
    }, [loading, open, streamKey]);

    const openDialog = () => {
        setOpen(true);
        setLoading(false);
    };

    const closeDialog = () => {
        if (loading) return;
        setOpen(false);
    };

    const onOpenChange = (status: boolean) => {
        if (!status) {
            closeDialog();
        }
    };

    const onSave = async () => {
        const _error = {
            url: '',
            platform: '',
            key: ''
        };
        let isError: boolean = false;
        if (!streamUrl) {
            _error['url'] = 'Stream url required';
            isError = true;
        }
        if (!streamKeyValue) {
            _error['key'] = 'Stream key required';
            isError = true;
        }
        if (!streamPlatform) {
            _error['platform'] = 'Stream platform required';
            isError = true;
        }
        setError((error) => ({ ...error, ..._error }));
        if (isError) return;

        const streamId = +searchParams.stream_id;
        const payload: Partial<StreamKey> = {
            stream_url: streamUrl,
            stream_key: streamKeyValue,
            video_id: streamVideoId || ''
        };
        setLoading(true);
        try {
            if (isUpdate) {
                await updateStreamKey(streamId, streamKey!.id, payload);
                toast('Stream key updated successfully', {
                    icon: <CheckCircle2 className="text-primary" />
                });
            } else {
                payload.platform = streamPlatform;
                await addStreamKey(streamId, payload);
                toast('Stream key created successfully', {
                    icon: <CheckCircle2 className="text-primary" />
                });
            }
            dispatch(fetchStreamById(+searchParams.stream_id));
            setOpen(false);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast('Stream key action failed', {
                description: error?.response?.data.message || 'Please try again later!',
                icon: <Ban className="text-destructive" />
            });
            console.error(error);
        }
        setLoading(false);
    };

    const content = {
        title: isUpdate ? 'Add stream key' : 'Update stream key',
        description: isUpdate
            ? 'Update your stream key details'
            : 'Add RTMP url and stream key to bind the platform with the stream'
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>
                {isUpdate ? (
                    <Button size="sm" onClick={openDialog}>
                        <Pencil />
                    </Button>
                ) : (
                    <Button
                        className="w-full flex gap-2"
                        onClick={openDialog}
                        loader={broadcastLoader}
                        disabled={broadcastLoader || isLive}
                    >
                        <Plus />
                        <>Add Stream Key</>
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>{content.title}</DialogHeader>
                <DialogDescription>{content.description}</DialogDescription>
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="stream-url">Stream url*</Label>
                        <div>
                            <Input
                                id="stream-url"
                                value={streamUrl}
                                onChange={({ target: { value } }) => setStreamUrl(value)}
                            />
                            <Typography
                                variant="small"
                                className={cn('!text-red-600 hidden', { block: error.url })}
                            >
                                {error.url}
                            </Typography>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="stream-key">Stream key*</Label>
                        <div>
                            <Input
                                id="stream-key"
                                value={streamKeyValue}
                                onChange={({ target: { value } }) => setStreamKeyValue(value)}
                            />
                            <Typography
                                variant="small"
                                className={cn('!text-red-600 hidden', { block: error.key })}
                            >
                                {error.key}
                            </Typography>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="video-id">Video</Label>
                        <Input
                            id="video-id"
                            value={streamVideoId}
                            onChange={({ target: { value } }) => setStreamVideoId(value)}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label>Stream platform*</Label>
                        <div>
                            <Select
                                onValueChange={setStreamPlatform}
                                disabled={isUpdate}
                                value={streamPlatform}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a platform" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="YOUTUBE">Youtube</SelectItem>
                                </SelectContent>
                            </Select>
                            <Typography
                                variant="small"
                                className={cn('!text-red-600 hidden', { block: error.platform })}
                            >
                                {error.platform}
                            </Typography>
                        </div>
                    </div>
                </div>
                <DialogFooter className="sm:justify-end gap-2 pt-4">
                    <Button
                        type="button"
                        variant="destructive"
                        className="px-8 w-28"
                        onClick={closeDialog}
                        disabled={loading}
                    >
                        Close
                    </Button>
                    <Button
                        type="button"
                        variant="default"
                        className="px-8 w-28"
                        onClick={onSave}
                        disabled={loading}
                    >
                        {loading ? <Loader className="animate-spin" /> : <>Save</>}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default StreamKeyManager;
