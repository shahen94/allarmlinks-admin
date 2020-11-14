import { configureStore } from '@reduxjs/toolkit';
import { adminsReducer, loginReducer, singleVolunteerReducer, volunteersReducer, searchReducer } from './features';
import { resetAdmins } from './features/adminsSlice';
import { logout } from './features/loginSlice';
import { resetVolunteers } from './features/volunteersSlice';
import { resetSingleVolunteer } from './features/singleVolunteerSlice';

function loginChecker({ getState, dispatch }: any): any {
    return (next: any) => (action: any) => {
        if (action.payload && action.payload.status === 401) {
            dispatch(logout());
        }
        if (action.type === "login/logout") {
            dispatch(resetVolunteers());
            dispatch(resetSingleVolunteer());
            dispatch(resetAdmins());
        }

        return next(action);
    }
}

export const store = configureStore({
    reducer: {
        volunteers: volunteersReducer,
        admins: adminsReducer,
        login: loginReducer,
        singleVolunteer: singleVolunteerReducer,
        search: searchReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(loginChecker)
    //middleware: [loginChecker]
})

export type RootState = ReturnType<typeof store.getState>
