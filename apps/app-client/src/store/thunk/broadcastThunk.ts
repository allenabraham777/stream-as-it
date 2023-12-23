import { createAsyncThunk } from '@reduxjs/toolkit';

import { getStreamById } from '@/api/stream';

export const fetchStreamById = createAsyncThunk('stream/fetchById', async (streamId: number) => {
    const response = await getStreamById(streamId);
    return response.data;
});
