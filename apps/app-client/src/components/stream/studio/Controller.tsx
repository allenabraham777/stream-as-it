import { Button } from '@stream-as-it/ui';
import { Mic, ScreenShare, Video } from 'lucide-react';
import React from 'react';

type Props = {};

const Controller = (props: Props) => {
    return (
        <div className="flex gap-4 justify-center">
            <Button variant="outline" className="h-14 w-14 p-3 rounded-full cursor-pointer">
                <Mic />
            </Button>
            <Button variant="outline" className="h-14 w-14 p-3 rounded-full cursor-pointer">
                <Video />
            </Button>
            <Button variant="outline" className="h-14 w-14 p-3 rounded-full cursor-pointer">
                <ScreenShare />
            </Button>
        </div>
    );
};

export default Controller;
