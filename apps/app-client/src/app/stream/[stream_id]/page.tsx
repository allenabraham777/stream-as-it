'use client';
import React from 'react';

import Controller from '@/components/stream/studio/Controller';
import Screens from '@/components/stream/studio/Screens';
import Configurations from '@/components/stream/studio/Configurations';
import Slate from '@/components/stream/studio/Slate';

type Props = {
    params: {
        stream_id: number;
    };
};

const StreamDashboard = ({ params: { stream_id } }: Props) => {
    return (
        <div className="flex h-full rounded-sm">
            <div className="flex-1 flex flex-col">
                <div className="flex-1 p-4 pt-8 flex justify-center items-center">
                    <Slate />
                </div>
                <div className="px-8 py-4">
                    <Screens />
                </div>
                <div className="p-4">
                    <Controller />
                </div>
            </div>
            <Configurations />
        </div>
    );
};

export default StreamDashboard;
