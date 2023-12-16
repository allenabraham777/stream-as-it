import { createAsyncThunk } from "@reduxjs/toolkit";

import { Auth } from "@stream-as-it/types";

import { fetchUserDetails } from "@/api/auth";

export const getUserDetails = createAsyncThunk(
  "stream-as-it/getUserDetails",
  async () => {
    const details: Auth.User = (await fetchUserDetails()).data;
    return details;
  }
);
