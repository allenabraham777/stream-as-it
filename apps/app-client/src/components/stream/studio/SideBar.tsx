'use client';
import React from 'react';

import { Button, cn } from '@stream-as-it/ui';
import { tabList } from '@/constants/tabs';

type Props = {
    tab: string;
    setTab: (value: string) => void;
};

const SideBar = ({ tab, setTab }: Props) => {
    return (
        <div className="flex flex-col">
            {tabList.map(({ name, icon: Icon }) => {
                return (
                    <Button
                        variant="ghost"
                        className={cn('h-20 rounded-none cursor-pointer', {
                            'bg-green-500 hover:bg-green-500 bg-opacity-40 hover:bg-opacity-40':
                                tab === name
                        })}
                        onClick={() => setTab(name)}
                    >
                        <Icon className="h-10 w-10" />
                    </Button>
                );
            })}
        </div>
    );
};

export default SideBar;
