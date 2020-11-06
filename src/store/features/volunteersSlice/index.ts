import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import IVolunteerRecord from '../../../types/volunteers/IVolunteerRecord';
import fetchVolunteers from '../../../api/volunteer/fetchVolunteers';
import IFetchedVolunteers from './../../../types/volunteers/IFetchedVolunteers';
import IProcessedVolunteerRecord from './../../../types/volunteers/IProcessedVolunteerRecord';
import processVolunteersRecords from '../../../utils/processVolunteersRecords';
const fetchAll = createAsyncThunk<
    IFetchedVolunteers
>(
    'volunteers/fetchAll',
    // Declare the type your function argument here:
    async (): Promise<IFetchedVolunteers> => {
        const response = await fetchVolunteers()
        console.log(response)
        return response as IFetchedVolunteers
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
            state.allCount = payload.allCount
            state.filteredCount = payload.filteredCount
            state.processedVolunteers = processVolunteersRecords(payload.volunteers)
        })
    }
})
const { actions, reducer } = volunteersSlice
export const { setVolunteers, setVolunteersCount, setVolunteersFilteredCount } = actions
export { fetchAll }
export default reducer