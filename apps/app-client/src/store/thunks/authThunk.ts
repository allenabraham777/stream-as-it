import { createAsyncThunk } from '@reduxjs/toolkit';

import { User } from '@stream-as-it/types';

import { fetchUserDetails } from '@/api/auth';

export const getUserDetails = createAsyncThunk('stream-as-it/getUserDetails', async () => {
    const details: User = (await fetchUserDetails()).data;
    return details;
});
