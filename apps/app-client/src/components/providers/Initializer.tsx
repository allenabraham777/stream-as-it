'use client';
import React from 'react';
import { useSession } from 'next-auth/react';
import Loading from '../commons/Loading';

type Props = {
    children: React.ReactNode;
};

const Initializer = ({ children }: Props) => {
    const { status } = useSession();
    if (status === 'loading') {
        return <Loading />;
    }
    return <>{children}</>;
};

export default Initializer;
