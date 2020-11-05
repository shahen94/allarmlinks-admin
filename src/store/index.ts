import { configureStore } from '@reduxjs/toolkit';
import { volunteersReducer } from './features'


export const store = configureStore({
    reducer: {
        volunteers: volunteersReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
