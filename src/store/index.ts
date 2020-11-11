import { configureStore } from '@reduxjs/toolkit';
import { adminsReducer, loginReducer, singleVolunteerReducer, volunteersReducer } from './features';


export const store = configureStore({
    reducer: {
        volunteers: volunteersReducer,
        admins: adminsReducer,
        login: loginReducer,
        singleVolunteer: singleVolunteerReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
