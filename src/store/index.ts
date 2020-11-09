import { configureStore } from '@reduxjs/toolkit';
import { volunteersReducer, adminsReducer, loginReducer } from './features';


export const store = configureStore({
    reducer: {
        volunteers: volunteersReducer,
        admins: adminsReducer,
        login: loginReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
