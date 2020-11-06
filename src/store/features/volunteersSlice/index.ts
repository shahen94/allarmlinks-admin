import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import IVolunteerRecord from '../../../types/volunteers/IVolunteer';
import fetchVolunteers from '../../../api/volunteer/fetchVolunteers';
import IFetchedVolunteers from './../../../types/volunteers/IFetchedVolunteers';
import IProcessedVolunteerRecord from '../../../types/volunteers/IProcessedVolunteer';
import processVolunteersRecords from '../../../utils/processVolunteersRecords';
const fetchAll = createAsyncThunk<
    IFetchedVolunteers,
    number
>(
    'volunteers/fetchAll',
    // Declare the type your function argument here:
    async (limit: number): Promise<IFetchedVolunteers> => {
        const response = await fetchVolunteers({ limit })
        return { volunteers: response } as IFetchedVolunteers
    }
)
interface IVolunteerState {
    volunteers: IVolunteerRecord[] | [],
    processedVolunteers: IProcessedVolunteerRecord[] | [],
    allCount: number,
    filteredCount: number
}
const initialState: IVolunteerState = {
    volunteers: [],
    processedVolunteers: [],
    allCount: 0,
    filteredCount: 0,
}
const volunteersSlice = createSlice({
    name: 'volunteers',
    initialState,
    reducers: {
        setVolunteers: ({ volunteers }: IVolunteerState, { payload }: PayloadAction<IVolunteerRecord[]>): void => {
            volunteers = payload
        },
        setVolunteersCount: ({ allCount }: IVolunteerState, { payload }: PayloadAction<number>): void => {
            allCount = payload
        },
        setVolunteersFilteredCount: ({ filteredCount }: IVolunteerState, { payload }: PayloadAction<number>): void => {
            filteredCount = payload
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchAll.fulfilled, (state, { payload }) => {
            state.volunteers = payload.volunteers
            // state.allCount = payload.allCount
            // state.filteredCount = payload.allCount
            state.allCount = 160
            state.filteredCount = 160
            state.processedVolunteers = processVolunteersRecords(payload.volunteers)
        })
    }
})
const { actions, reducer } = volunteersSlice
export const { setVolunteers, setVolunteersCount, setVolunteersFilteredCount } = actions
export { fetchAll }
export default reducer