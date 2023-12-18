import { authOptions } from '@/app/api/auth/authOptions';
import axios from 'axios';
import { getServerSession } from 'next-auth';
import { getSession } from 'next-auth/react';

const httpClient = axios.create({});

httpClient.interceptors.request.use(async function (config) {
    if (typeof window === 'undefined') {
        const session = await getServerSession(authOptions);
        const token = session?.tokens.accessToken;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            config.headers['Content-Type'] = 'application/json';
        }
        return config;
    } else {
        const session = await getSession();
        const token = session?.tokens.accessToken;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            config.headers['Content-Type'] = 'application/json';
        }
        return config;
    }
});

export default httpClient;
