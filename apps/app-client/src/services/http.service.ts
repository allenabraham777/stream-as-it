import axios from 'axios';

const httpClient = axios.create({});

httpClient.interceptors.request.use(async function (config) {
    if (typeof window === 'undefined') {
        const { cookies } = await import('next/headers.js');
        const cookieStore = cookies();
        const token = cookieStore.get('authToken')?.value;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            config.headers['Content-Type'] = 'application/json';
        }
        return config;
    } else {
        const { getCookie } = await import('typescript-cookie');
        const token = getCookie('authToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            config.headers['Content-Type'] = 'application/json';
        }
        return config;
    }
});

export default httpClient;
