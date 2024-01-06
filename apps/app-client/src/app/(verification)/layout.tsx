import NavBar from '@/components/commons/NavBar';
import React from 'react';

type Props = {
    children: React.ReactNode;
};

const VerificationLayout = ({ children }: Props) => {
    return (
        <div className="flex flex-col h-full">
            <NavBar />
            <div className="flex-1 w-full flex h-full justify-center items-center">{children}</div>
        </div>
    );
};

export default VerificationLayout;
