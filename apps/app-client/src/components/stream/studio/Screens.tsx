import React from 'react';
import UserVideo from './screens/UserVideo';
import ScreenShare from './screens/ScreenShare';

type Props = {};

const Screens = (props: Props) => {
    return (
        <div className="flex gap-4">
            <UserVideo />
            <ScreenShare />
        </div>
    );
};

export default Screens;
