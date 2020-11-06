import { configureStore } from '@reduxjs/toolkit';
import { volunteersReducer } from './features';
import { adminsReducer } from './features';


export const store = configureStore({
    reducer: {
        volunteers: volunteersReducer,
        admins: adminsReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
