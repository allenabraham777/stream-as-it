'use client';
import { Button } from '@stream-as-it/ui';
import { Layers, MessageSquareText, Palette, Settings } from 'lucide-react';
import React from 'react';

type Props = {};

const SideBar = (props: Props) => {
    return (
        <div className="flex flex-col">
            <Button variant="ghost" className="h-20 rounded-none cursor-pointer">
                <MessageSquareText className="h-10 w-10" />
            </Button>
            <Button variant="ghost" className="h-20 rounded-none cursor-pointer">
                <Layers className="h-10 w-10" />
            </Button>
            <Button variant="ghost" className="h-20 rounded-none cursor-pointer">
                <Palette className="h-10 w-10" />
            </Button>
            <Button variant="ghost" className="h-20 rounded-none cursor-pointer">
                <Settings className="h-10 w-10" />
            </Button>
        </div>
    );
};

export default SideBar;
