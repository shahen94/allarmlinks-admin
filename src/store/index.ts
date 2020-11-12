import { configureStore } from '@reduxjs/toolkit';
import { adminsReducer, loginReducer, singleVolunteerReducer, volunteersReducer,searchReducer } from './features';


export const store = configureStore({
    reducer: {
        volunteers: volunteersReducer,
        admins: adminsReducer,
        login: loginReducer,
        singleVolunteer: singleVolunteerReducer,
        search: searchReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
