import React from 'react';
import { Plus } from 'lucide-react';
import Link from 'next/link';

import { Card } from '@stream-as-it/ui';
import { Stream } from '@stream-as-it/types';

import { fetchAllStreams } from '@/api/stream';
import StreamCard from '@/components/stream/StreamCard';

interface Props {}

const Dashboard = async (props: Props) => {
    const { data: streams } = await fetchAllStreams();

    return (
        <div className="p-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            <Link href="/stream/create">
                <Card className="h-52 flex items-center justify-center cursor-pointer active:bg-secondary">
                    <Plus className="w-12 h-12" />
                </Card>
            </Link>
            {streams.map((stream: Stream) => (
                <StreamCard key={stream.id} stream={stream} />
            ))}
        </div>
    );
};

export default Dashboard;
