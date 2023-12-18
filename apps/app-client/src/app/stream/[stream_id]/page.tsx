import Controller from '@/components/stream/studio/Controller';
import Screens from '@/components/stream/studio/Screens';
import Settings from '@/components/stream/studio/Settings';
import SideBar from '@/components/stream/studio/SideBar';
import Slate from '@/components/stream/studio/Slate';
import React from 'react';

type Props = {
    params: {
        stream_id: number;
    };
};

const StreamDashboard = async ({ params: { stream_id } }: Props) => {
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
            <div className="h-full w-80 border-l border-secondary">
                <Settings />
            </div>
            <div className="h-full w-24 border-l border-secondary">
                <SideBar />
            </div>
        </div>
    );
};

export default StreamDashboard;
