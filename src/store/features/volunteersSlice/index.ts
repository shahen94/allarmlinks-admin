import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import IVolunteerRecord from '../../../types/volunteers/IVolunteer';
import fetchVolunteers from '../../../api/volunteer/fetchVolunteers';
import IFetchedVolunteers from './../../../types/volunteers/IFetchedVolunteers';
import IProcessedVolunteerRecord from '../../../types/volunteers/IProcessedVolunteer';
import processVolunteersRecords from '../../../utils/processVolunteersRecords';
import IAppStateData from './../../../types/IAppStateData';
import { ActionStatus } from "../../../types/auth/ILoginData";
const fetchAll = createAsyncThunk<
    IFetchedVolunteers,
    number
>(
    'volunteers/fetchAll',
    async (limit: number): Promise<IFetchedVolunteers> => {
        const response = await fetchVolunteers({ limit })
        return { volunteers: response } as IFetchedVolunteers
    }
)
interface IVolunteersState extends IAppStateData {
    volunteers: IVolunteerRecord[] | [],
    processedVolunteers: IProcessedVolunteerRecord[] | [],
    allCount: number,
    filteredCount: number
}
const initialState: IVolunteersState = {
    volunteers: [],
    processedVolunteers: [],
    allCount: 0,
    filteredCount: 0,
    status:ActionStatus.Initial
}
const volunteersSlice = createSlice({
    name: 'volunteers',
    initialState,
    reducers: {
        setVolunteers: ({ volunteers }: IVolunteersState, { payload }: PayloadAction<IVolunteerRecord[]>): void => {
            volunteers = payload
        },
        setVolunteersCount: ({ allCount }: IVolunteersState, { payload }: PayloadAction<number>): void => {
            allCount = payload
        },
        setVolunteersFilteredCount: ({ filteredCount }: IVolunteersState, { payload }: PayloadAction<number>): void => {
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