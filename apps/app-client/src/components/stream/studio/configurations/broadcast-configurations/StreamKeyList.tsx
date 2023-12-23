'use client';
import React, { useEffect } from 'react';
import { Loader2 } from 'lucide-react';

import { Typography, cn } from '@stream-as-it/ui';
import { streamingTypes } from '@stream-as-it/constants';
import { StreamKey } from '@stream-as-it/types';

import useAppDispatch from '@/hooks/useAppDispatch';
import { fetchStreamById } from '@/store';
import { useParams } from 'next/navigation';
import useAppSelector from '@/hooks/useAppSelector';

type Props = {};

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
            <Typography>Streams Attached</Typography>
            <div className={cn({ hidden: stream?.stream_keys?.length })}>
                <h3>No streams attached</h3>
                <p>Please attach stream clients to start streaming</p>
            </div>
            {stream?.stream_keys?.map((stream_key: StreamKey) => (
                <div key={stream_key.id} className="capitalize">
                    {
                        streamingTypes.details[
                            stream_key.platform as keyof typeof streamingTypes.details
                        ].label
                    }
                </div>
            ))}
        </div>
    );
};

export default StreamKeyList;
