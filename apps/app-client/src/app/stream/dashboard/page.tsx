import { Card } from '@stream-as-it/ui';
import { Plus } from 'lucide-react';
import React from 'react';

interface Props {}

const Dashboard = (props: Props) => {
    return (
        <div className="p-4 flex">
            <Card className="w-52 h-36 flex items-center justify-center">
                <Plus className="w-12 h-12" />
            </Card>
        </div>
    );
};

export default Dashboard;
