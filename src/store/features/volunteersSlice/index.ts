import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import IVolunteerRecord from "../../../types/volunteers/IVolunteerRecord";
import fetchVolunteers from "../../../api/volunteer/fetchVolunteers";
import { ActionStatus } from "../../../types/auth/ILoginData";
import search from "../../../api/admin/search";
import { ISearch } from "../../../types/ISearch";
import { IVolunteerState } from "../../../types/volunteers/IVolunteerState";

const fetchAll = createAsyncThunk<IVolunteerState, number>(
  "volunteers/fetchAll",
  async (limit: number): Promise<IVolunteerState> => {
    const response = await fetchVolunteers({ limit });
    return response as IVolunteerState;
  }
);

const searchVolunteers = createAsyncThunk<IVolunteerState, ISearch>(
  "volunteers/search",
  async (params: ISearch): Promise<IVolunteerState> => {
    const response = await search(params, "volunteers");
    return response as IVolunteerState;
  })

// interface IVolunteersState extends IAppStateData {
//     volunteers: IVolunteerRecord[] | [];
//     processedVolunteers: IProcessedVolunteerRecord[] | [];
//     allCount: number;
//     filteredCount: number;
// }

const initialState: IVolunteerState = {
  data: [],
  allCount: 0,
  status: ActionStatus.Initial,
};
const volunteersSlice = createSlice({
  name: "volunteers",
  initialState,
  reducers: {
    setVolunteers: (
      { data }: IVolunteerState,
      { payload }: PayloadAction<IVolunteerRecord[]>
    ): void => {
      data = payload;
    },
    setVolunteersCount: (
      { allCount }: IVolunteerState,
      { payload }: PayloadAction<number>
    ): void => {
      allCount = payload;
    },
    // setVolunteersFilteredCount: (
    //     {filteredCount}: IVolunteerState,
    //     {payload}: PayloadAction<number>
    // ): void => {
    //     filteredCount = payload;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAll.fulfilled, (state, { payload }) => {
      state.data = payload.data;
      // state.allCount = payload.allCount
      // state.filteredCount = payload.allCount
      state.allCount = payload.allCount;
      // state.filteredCount = payload.data.length;
      // state.processedVolunteers = processVolunteersRecords(payload.data);
    })
      .addCase(searchVolunteers.fulfilled, (state, { payload }) => {
        state.data = payload.data
        state.allCount = payload.allCount
        // state.filteredCount = payload.data.length
      })
  },
});
const { actions, reducer } = volunteersSlice;
export const {
  setVolunteers,
  setVolunteersCount,
  // setVolunteersFilteredCount,
} = actions;
export { fetchAll };
export { searchVolunteers }
export default reducer;
