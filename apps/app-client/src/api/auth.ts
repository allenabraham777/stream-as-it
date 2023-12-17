import { User } from '@stream-as-it/types';

import httpClient from '@/services/http.service';

const BASE_URL = 'http://localhost:8000';

export const fetchUserDetails = () => httpClient.get<User>(`${BASE_URL}/auth/user/details`);
