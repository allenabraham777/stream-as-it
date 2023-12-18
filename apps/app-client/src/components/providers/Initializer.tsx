'use client';
import React from 'react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Loading from '../commons/Loading';

type Props = {
    children: React.ReactNode;
};

const Initializer = ({ children }: Props) => {
    const { status, data } = useSession();
    const router = useRouter();
    if (status === 'loading') {
        return <Loading />;
    } else if (data && data?.error) {
        signOut();
        router.push('/login');
    }
    return <>{children}</>;
};

export default Initializer;
