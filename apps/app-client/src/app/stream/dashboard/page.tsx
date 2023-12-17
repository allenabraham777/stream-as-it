import React from 'react';
import { Plus } from 'lucide-react';

import { Card } from '@stream-as-it/ui';
import { Stream } from '@stream-as-it/types';

import { fetchAllStreams } from '@/api/stream';
import StreamCard from '@/components/stream/StreamCard';
import Link from 'next/link';

interface Props {}

const Dashboard = async (props: Props) => {
    const { data: streams } = await fetchAllStreams();

    return (
        <div className="p-4 flex gap-4">
            <Link href="/stream/create">
                <Card className="w-72 h-52 flex items-center justify-center cursor-pointer active:bg-secondary">
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
