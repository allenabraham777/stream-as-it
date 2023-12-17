import React from 'react';
import Dashboard from 'components/StreamDashboard/Dashboard';
import DefaultLayout from 'layouts/Default';

type Props = {};

const StreamDashboard = (props: Props) => {
    return (
        <DefaultLayout>
            <Dashboard />
        </DefaultLayout>
    );
};

export default StreamDashboard;
