import { configureStore } from '@reduxjs/toolkit';
import { volunteersCountReducer } from './features'


export const store = configureStore({
    reducer: {
        volunteersCount: volunteersCountReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
