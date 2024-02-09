'use client';
import React, { useState } from 'react';

import { TABS } from '@/constants/tabs';
import SideBar from './SideBar';
import Brand from './configurations/Brand';
import Settings from './configurations/Settings';
import Broadcast from './configurations/Broadcast';
import NotImplemented from '@/components/commons/NotImplemented';
import Chat from './configurations/Chat';

type Props = {};

const Configuration = (props: Props) => {
    const [tab, setTab] = useState(TABS.BRAND.name);
    let tabArray: React.ReactNode[] = [];
    switch (tab) {
        case TABS.CHAT.name:
            tabArray = [<Chat />];
            break;
        case TABS.BANNER.name:
            tabArray = [<NotImplemented title="Banners" key="banner" />];
            break;
        case TABS.BRAND.name:
            tabArray = [<Brand key="brand" />];
            break;
        case TABS.SETTINGS.name:
            tabArray = [<Settings key="settings" />];
            break;
        case TABS.BROADCAST.name:
            tabArray = [<Broadcast key="broadcast" />];
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
