import NavBar from '@/components/commons/NavBar';
import { getServerSession } from 'next-auth';
import React from 'react';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/authOptions';

type Props = {
    children: React.ReactNode;
};

const StreamLayout = async ({ children }: Props) => {
    const session = await getServerSession(authOptions);
    if (!session) return redirect('/login');
    return (
        <div className="flex flex-col h-full">
            <NavBar />
            {children}
        </div>
    );
};

export default StreamLayout;
