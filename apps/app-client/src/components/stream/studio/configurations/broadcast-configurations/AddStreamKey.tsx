'use client';
import React, { useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import { Loader, Plus } from 'lucide-react';

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
    cn
} from '@stream-as-it/ui';

import { addStreamKey } from '@/api/stream';
import { fetchStreamById } from '@/store';
import useAppDispatch from '@/hooks/useAppDispatch';
import useAppSelector from '@/hooks/useAppSelector';

type Props = {};

const AddStreamKey = (props: Props) => {
    const dispatch = useAppDispatch();
    const { loading: broadcastLoader } = useAppSelector((state) => state.broadcast);
    const { isLive } = useAppSelector((state) => state.stream.streamStatus);
    const searchParams = useParams<{ stream_id: string }>();
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [streamPlatform, setStreamPlatform] = useState<string>('');
    const [error, setError] = useState({
        url: '',
        key: '',
        platform: ''
    });
    const streamUrlRef = useRef<HTMLInputElement>(null);
    const streamKeyRef = useRef<HTMLInputElement>(null);
    const streamVideoIdRef = useRef<HTMLInputElement>(null);

    const openDialog = () => {
        setOpen(true);
        setLoading(false);
    };

    const closeDialog = () => {
        if (loading) return;
        setOpen(false);
    };

    const onOpenChange = (status: boolean) => {
        if (!status) closeDialog();
    };

    const onSave = async () => {
        const _error = {
            url: '',
            platform: '',
            key: ''
        };
        let isError: boolean = false;
        if (!streamUrlRef.current?.value) {
            _error['url'] = 'Stream url required';
            isError = true;
        }
        if (!streamKeyRef.current?.value) {
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
        const stream_url = streamUrlRef.current!.value;
        const stream_key = streamKeyRef.current!.value;
        const video_id = streamVideoIdRef.current!.value || '';
        const platform = streamPlatform || '';
        setLoading(true);
        try {
            await addStreamKey(streamId, { stream_url, stream_key, video_id, platform });
            dispatch(fetchStreamById(+searchParams.stream_id));
            setOpen(false);
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>
                <Button
                    className="w-full flex gap-2"
                    onClick={openDialog}
                    loader={broadcastLoader}
                    disabled={broadcastLoader || isLive}
                >
                    <Plus />
                    <>Add Stream Key</>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>Add stream client</DialogHeader>
                <DialogDescription>
                    Add RTMP url and stream key to bind the platform with the stream
                </DialogDescription>
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="stream-url">Stream url*</Label>
                        <div>
                            <Input id="stream-url" ref={streamUrlRef} />
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
                            <Input id="stream-key" ref={streamKeyRef} />
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
                        <Input id="video-id" ref={streamVideoIdRef} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label>Stream platform*</Label>
                        <div>
                            <Select onValueChange={setStreamPlatform} value={streamPlatform}>
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

export default AddStreamKey;
