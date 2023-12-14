import { fetchUserDetails } from "@/api/auth";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getUserDetails = createAsyncThunk(
  "stream-as-it/getUserDetails",
  async () => {
    const details: Auth.User = (await fetchUserDetails()).data;
    return details;
  }
);
