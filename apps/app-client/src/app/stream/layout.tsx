import NavBar from '@/components/NavBar';
import React from 'react';

type Props = {
    children: React.ReactNode;
};

const StreamLayout = ({ children }: Props) => {
    return (
        <div className="flex flex-col">
            <NavBar />
            {children}
        </div>
    );
};

export default StreamLayout;
