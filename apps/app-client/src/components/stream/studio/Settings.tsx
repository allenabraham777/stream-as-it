import { Typography } from '@stream-as-it/ui';
import React from 'react';

type Props = {};

const Brand = () => {
    return (
        <div className="p-8 flex flex-col gap-4">
            <Typography>Brand Color</Typography>
            <div className="flex gap-4 items-center">
                <span className="aspect-square h-10 bg-blue-500 rounded-full" />
                <Typography variant="p">#ABCDEF</Typography>
            </div>
            <Typography>Shape Layout</Typography>
            <Typography>Background</Typography>
        </div>
    );
};

const Settings = (props: Props) => {
    return (
        <>
            <Brand />
        </>
    );
};

export default Settings;
