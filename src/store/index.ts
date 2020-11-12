import { configureStore } from '@reduxjs/toolkit';

import { adminsReducer, loginReducer, singleVolunteerReducer, volunteersReducer,searchReducer } from './features';
import { logout } from './features/loginSlice';

function loginChecker({ getState, dispatch }: any): any {
    return (next: any) => (action: any) => {
        if (action.type.indexOf("rejected") >= 0 && action.error.message === "Request failed with status code 401") {
            dispatch(logout())
        }
        // if(action.payload && action.payload.response && action.payload.response.status === 401) {
        //     dispatch(logout())
        // }

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
    
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(loginChecker)
})

export type RootState = ReturnType<typeof store.getState>
