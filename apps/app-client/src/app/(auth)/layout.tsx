import NavBar from '@/components/commons/NavBar';
import { getServerSession } from 'next-auth';
import React from 'react';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/authOptions';

type Props = {
    children: React.ReactNode;
};

const layout = async ({ children }: Props) => {
    const session = await getServerSession(authOptions);
    if (session) return redirect('/stream/dashboard');
    return (
        <section className="h-full flex items-center justify-center">
            <NavBar fixed hideButtons />
            {children}
        </section>
    );
};

export default layout;
