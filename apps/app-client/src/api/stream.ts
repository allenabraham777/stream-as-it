import { Stream } from '@stream-as-it/types';

import httpClient from '@/services/http.service';

const BASE_URL = 'http://localhost:8001';

export const fetchAllStreams = () => httpClient.get<Stream[]>(`${BASE_URL}/stream`);
