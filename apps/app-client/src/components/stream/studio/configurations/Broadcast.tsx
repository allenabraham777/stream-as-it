import React from 'react';
import BroadcastButton from './broadcast-configurations/BroadcastButton';
import AddStreamKey from './broadcast-configurations/AddStreamKey';
import StreamKeyList from './broadcast-configurations/StreamKeyList';

type Props = {};

const Broadcast = (props: Props) => {
    return (
        <div className="p-8 flex flex-col gap-4 h-full">
            <BroadcastButton />
            <StreamKeyList />
            <div className="flex-1" />
            <AddStreamKey />
        </div>
    );
};

export default Broadcast;
