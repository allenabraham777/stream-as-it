import React from 'react';
import ActionBar from 'components/StreamDashboard/ActionBar';
import SideBar from 'components/SideBar/SideBar';
import Slate from 'components/StreamDashboard/Slate';
import VideoList from 'components/StreamDashboard/VideoList';

type Props = {};

const Dashboard = (props: Props) => {
    return (
        <div className="text-center max-h-[100%] box-border flex">
            <div className="flex-1 flex flex-col">
                <div className="flex-1 px-8 pt-8">
                    <Slate />
                </div>
                <div className="h-[20%] p-8">
                    <VideoList />
                </div>
                <div className="pb-8">
                    <ActionBar />
                </div>
            </div>
            <div className="w-[25%] border-l border-opacity-10 border-gray-500">
                <SideBar />
            </div>
        </div>
    );
};

export default Dashboard;
