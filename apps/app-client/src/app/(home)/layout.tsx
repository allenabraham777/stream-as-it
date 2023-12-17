import NavBar from '@/components/commons/NavBar';
import React from 'react';

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="h-full">
            <NavBar fixed />
            {children}
        </main>
    );
};

export default HomeLayout;
