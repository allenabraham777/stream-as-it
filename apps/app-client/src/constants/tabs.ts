import { LucideMessageSquareText, Layers, Palette, Settings, Radio } from 'lucide-react';

export const TABS = {
    CHAT: {
        name: 'CHAT',
        icon: LucideMessageSquareText
    },
    BANNER: { name: 'BANNER', icon: Layers },
    BRAND: { name: 'BRAND', icon: Palette },
    SETTINGS: { name: 'SETTINGS', icon: Settings },
    BROADCAST: { name: 'BROADCAST', icon: Radio }
};

export const tabList = Object.values(TABS);
