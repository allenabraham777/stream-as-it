import { User } from '@stream-as-it/types';

import httpClient from '@/services/http.service';

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const fetchUserDetails = () => httpClient.get<User>(`${BASE_URL}/auth/user/details`);
