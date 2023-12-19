import { combineReducers, configureStore } from '@reduxjs/toolkit';

import streamSlice from './slices/streamSlice';

const reducer = combineReducers({
    stream: streamSlice
});

const store = configureStore({
    reducer,
    middleware: (defaultMiddleware) => defaultMiddleware({ serializableCheck: false })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
