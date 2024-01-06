'use client';
import { Typography } from '@stream-as-it/ui';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import _ from 'underscore';

const BASE_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/authentication`;

type Props = {
    params: { user_token: string; verification_token: string };
};

const verify = _.debounce(
    (user_token: string, verification_token: string) =>
        axios(`${BASE_URL}/auth/verify/${user_token}/${verification_token}`),
    1000,
    true
);

const Verification = (props: Props) => {
    const [message, setMessage] = useState('Verifying....');
    useEffect(() => {
        verifyUser();
    }, []);
    const verifyUser = async () => {
        const { user_token, verification_token } = props.params;
        try {
            await verify(user_token, verification_token);
            setMessage('Verification successfull. Please login to continue.');
        } catch (error) {
            setMessage('Invalid operation!');
        }
    };
    return (
        <div>
            <Typography variant="h3">{message}</Typography>
        </div>
    );
};

export default Verification;
