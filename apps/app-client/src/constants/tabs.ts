import { MessageSquareText, Layers, Palette, Settings } from 'lucide-react';

export const TABS = {
    CHAT: {
        name: 'CHAT',
        icon: MessageSquareText
    },
    BANNER: { name: 'BANNER', icon: Layers },
    BRAND: { name: 'BRAND', icon: Palette },
    SETTINGS: { name: 'SETTINGS', icon: Settings }
};

export const tabList = Object.values(TABS);
