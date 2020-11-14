import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ActionStatus } from "../../../types/auth/ILoginData";
import IVolunteerRecord from '../../../types/volunteers/IVolunteerRecord';
import fetchVolunteerById from './../../../api/volunteer/fetchVolunteerById';
import ISingleVolunteerState from '../../../types/volunteers/ISingleVolunteerState';

const fetchById = createAsyncThunk<IVolunteerRecord, string, { rejectValue: any }>(
    'volunteers/fetchByID',
    async (id: string, thunkApi: any): Promise<IVolunteerRecord> => {
        const response = await fetchVolunteerById(id);
        if (response.status !== 200) {
            return thunkApi.rejectWithValue(response);
        }
        return response.data.data as IVolunteerRecord;
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
        setVolunteers: (state, { payload }: PayloadAction<IVolunteerRecord>): void => {
            state.data = payload
        },
        resetSingleVolunteer: (state: ISingleVolunteerState): ISingleVolunteerState => initialState
    },
    extraReducers: builder => {
        builder
            .addCase(fetchById.fulfilled, (state, { payload }) => {
                state.status = ActionStatus.Success;
                state.data = payload
            })
            .addCase(fetchById.pending, (state, { payload }) => {
                state.status = ActionStatus.Pending;
            })
            .addCase(fetchById.rejected, (state, { payload }) => {
                state.status = ActionStatus.Error;
                state.error = "Volunteer not found";
            })
    }
})

const { actions, reducer } = volunteersSlice
export const { setVolunteers, resetSingleVolunteer } = actions
export { fetchById }
export default reducer