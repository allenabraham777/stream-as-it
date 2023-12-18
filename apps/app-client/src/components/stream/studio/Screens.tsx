import { Button } from '@stream-as-it/ui';
import { Mic, User, Video } from 'lucide-react';
import React from 'react';

type Props = {};

const Screens = (props: Props) => {
    return (
        <div className="flex">
            <div className="aspect-video bg-black h-36 relative rounded-md overflow-hidden">
                <p className="absolute right-2 top-2 flex gap-2">
                    <Button variant="icon" size="sm" className="bg-secondary">
                        <Video />
                    </Button>
                    <Button variant="icon" size="sm" className="bg-secondary">
                        <Mic />
                    </Button>
                </p>
                <span className="w-full p-1 absolute bottom-0 left-0 bg-primary text-primary-foreground text-sm flex gap-2">
                    <User className="h-5" /> Name
                </span>
            </div>
        </div>
    );
};

export default Screens;
