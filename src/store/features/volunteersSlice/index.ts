import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import IVolunteerRecord from '../../../types/volunteers/IVolunteerRecord';
import fetchVolunteers from '../../../api/volunteer/fetchVolunteers';
const fetch = createAsyncThunk(
    'volunteers/fetchAll',
    // Declare the type your function argument here:
    async (): Promise<object> => {
        const response: object = await fetchVolunteers()
        return response
    }
)
const volunteersSlice = createSlice({
    name: 'volunteers',
    initialState: [] as IVolunteerRecord[],
    reducers: {
        setVolunteers: (state: IVolunteerRecord[], { payload }: PayloadAction<IVolunteerRecord[]>) => payload
    }
})
const { actions, reducer } = volunteersSlice
export const { setVolunteers } = actions
export default reducer