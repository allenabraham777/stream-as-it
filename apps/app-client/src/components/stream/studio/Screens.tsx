import React from 'react';
import Video from './screens/Video';
import ScreenShare from './screens/ScreenShare';

type Props = {};

const Screens = (props: Props) => {
    return (
        <div className="flex gap-4">
            <Video />
            <ScreenShare />
        </div>
    );
};

export default Screens;
