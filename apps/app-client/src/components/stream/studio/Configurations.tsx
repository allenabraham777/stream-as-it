'use client';
import React, { useState } from 'react';

import { TABS } from '@/constants/tabs';
import SideBar from './SideBar';
import Brand from './configurations/Brand';
import Settings from './configurations/Settings';

type Props = {};

const Configuration = (props: Props) => {
    const [tab, setTab] = useState(TABS.BRAND.name);
    let tabArray: React.ReactNode[] = [];
    switch (tab) {
        case TABS.CHAT.name:
            tabArray = [];
            break;
        case TABS.BANNER.name:
            tabArray = [];
            break;
        case TABS.BRAND.name:
            tabArray = [<Brand />];
            break;
        case TABS.SETTINGS.name:
            tabArray = [<Settings />];
            break;
    }
    return (
        <>
            <div className="h-full w-80 border-l border-secondary">{tabArray}</div>
            <div className="h-full w-24 border-l border-secondary">
                <SideBar tab={tab} setTab={setTab} />
            </div>
        </>
    );
};

export default Configuration;
