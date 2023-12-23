import { combineReducers, configureStore } from '@reduxjs/toolkit';

import streamSlice from './slices/streamSlice';
import slateSlice from './slices/slateSlice';
import brandSlice from './slices/brandSlice';
import broadcastSlice from './slices/broadcastSlice';

const reducer = combineReducers({
    stream: streamSlice,
    slate: slateSlice,
    brand: brandSlice,
    broadcast: broadcastSlice
});

const store = configureStore({
    reducer,
    middleware: (defaultMiddleware) => defaultMiddleware({ serializableCheck: false })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
