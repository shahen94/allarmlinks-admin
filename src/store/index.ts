import { configureStore } from '@reduxjs/toolkit';
import { volunteersReducer, adminsReducer, loginReducer ,singleVolunteerReducer} from './features';


export const store = configureStore({
    reducer: {
        volunteers: volunteersReducer,
        admins: adminsReducer,
        login: loginReducer,
        singleVolunteer:singleVolunteerReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
