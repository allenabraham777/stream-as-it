import React from 'react';

import { Stream } from '@stream-as-it/types';
import { Card, Typography } from '@stream-as-it/ui';
import Link from 'next/link';

type Props = {
    stream: Stream;
};

const StreamCard = ({ stream }: Props) => {
    return (
        <Link href={`/stream/${stream.id}`}>
            <Card className="h-52 p-4 flex flex-col gap-4 overflow-hidden justify-center items-center cursor-pointer active:bg-secondary">
                <Typography variant="h4">{stream.stream_title}</Typography>
            </Card>
        </Link>
    );
};

export default StreamCard;
