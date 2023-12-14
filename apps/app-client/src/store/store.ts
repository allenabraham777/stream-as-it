import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "@/store/slices/authSlice";

const reducer = combineReducers({
  auth: authSlice,
});

export const store = configureStore({
  reducer,
});

export type StoreState = ReturnType<typeof store.getState>;

export type Dispatch = typeof store.dispatch;
