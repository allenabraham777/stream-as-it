import { Stream, StreamKey } from '@stream-as-it/types';

import httpClient from '@/services/http.service';

const BASE_URL = 'http://localhost:8001';

export const fetchAllStreams = () => httpClient.get<Stream[]>(`${BASE_URL}/stream`);

export const getStreamById = (streamId: number) =>
    httpClient.get<Stream>(`${BASE_URL}/stream/${streamId}`);

export const addStreamKey = (streamId: number, streamKey: Partial<StreamKey>) =>
    httpClient.post(`${BASE_URL}/stream/${streamId}/key/new`, streamKey);
