import NavBar from '@/components/NavBar';
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
