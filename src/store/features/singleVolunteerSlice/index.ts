import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit"
import {ActionStatus} from "../../../types/auth/ILoginData";
import IVolunteerRecord from '../../../types/volunteers/IVolunteerRecord';
import fetchVolunteerById from './../../../api/volunteer/fetchVolunteerById';
import ISingleVolunteerState from '../../../types/volunteers/ISingleVolunteerState';

const fetchById = createAsyncThunk<IVolunteerRecord,
    string>(
    'volunteers/fetchByID',
    // Declare the type your function argument here:
    async (id: string): Promise<IVolunteerRecord> => {
        const response = await fetchVolunteerById(id)
        return response as IVolunteerRecord
    }
)

const initialState: ISingleVolunteerState = {
    data: {
        _id: '',
        name: '',
        surname: '',
        email: '',
        phone: '',
        birthDate: '',
        country: '',
        city: ''
    },
    status: ActionStatus.Initial,
}
const volunteersSlice = createSlice({
    name: 'singleVolunteer',
    initialState,
    reducers: {
        setVolunteers: (state, {payload}: PayloadAction<IVolunteerRecord>): void => {
            state.data = payload
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchById.fulfilled, (state, {payload}) => {
            state.data = payload
        })
    }
})
const {actions, reducer} = volunteersSlice
export const {setVolunteers} = actions
export {fetchById}
export default reducer