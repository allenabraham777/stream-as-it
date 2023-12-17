'use client';
import { Dispatch } from '@/store/store';
import { getUserDetails } from '@/store/thunks/authThunk';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

type Props = {
    children: React.ReactNode;
};

const StoreInitializer = ({ children }: Props) => {
    const dispatch = useDispatch<Dispatch>();
    useEffect(() => {
        dispatch(getUserDetails());
    }, [dispatch]);
    return <>{children}</>;
};

export default StoreInitializer;
