import { configureStore } from '@reduxjs/toolkit';
import { volounteersCountReducer } from './features'


export const store = configureStore({
    reducer: {
        volounteersCount: volounteersCountReducer,
    }
})
export type RootState = ReturnType<typeof store.getState>
