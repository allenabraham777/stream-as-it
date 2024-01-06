import { Stream, StreamKey } from '@stream-as-it/types';

import httpClient from '@/services/http.service';

const BASE_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/stream`;

export const fetchAllStreams = () => httpClient.get<Stream[]>(`${BASE_URL}/stream`);

export const getStreamById = (streamId: number) =>
    httpClient.get<Stream>(`${BASE_URL}/stream/${streamId}`);

export const addStreamKey = (streamId: number, streamKey: Partial<StreamKey>) =>
    httpClient.post(`${BASE_URL}/stream/${streamId}/key/new`, streamKey);

export const updateStreamKey = (
    streamId: number,
    streamKeyId: number,
    streamKey: Partial<StreamKey>
) => httpClient.put(`${BASE_URL}/stream/${streamId}/key/${streamKeyId}`, streamKey);

export const deleteStreamKey = (streamId: number, streamKeyId: number) =>
    httpClient.delete(`${BASE_URL}/stream/${streamId}/key/${streamKeyId}`);
