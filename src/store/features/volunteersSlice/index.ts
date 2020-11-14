import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import IVolunteerRecord from "../../../types/volunteers/IVolunteerRecord";
import fetchVolunteers from "../../../api/volunteer/fetchVolunteers";
import { ActionStatus } from "../../../types/auth/ILoginData";
import { IVolunteerState } from "../../../types/volunteers/IVolunteerState";
import IVolunteersRequest from './../../../types/volunteers/IVolunteersRequest';

const fetchVolunteersFunc = async (req: IVolunteersRequest, thunkApi: any): Promise<IVolunteerState> => {
  const response = await fetchVolunteers(req);
  if (response.status !== 200) {
    return thunkApi.rejectWithValue(response);
  }
  return response.data as IVolunteerState;
}

const fetchAll = createAsyncThunk<IVolunteerState, IVolunteersRequest, { rejectValue: any }>(
  "volunteers/fetchAll",
  fetchVolunteersFunc
);

const fectchAllAndAttach = createAsyncThunk<IVolunteerState, IVolunteersRequest, { rejectValue: any }>(
  "volunteers/fetchAllAndAttach",
  fetchVolunteersFunc
);

const initialState: IVolunteerState = {
  data: [],
  allCount: 0,
  status: ActionStatus.Initial,
  hasNext: true
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAll.fulfilled, (state, { payload }) => {
        state.data = payload.data;
        state.allCount = payload.allCount;
        state.hasNext = !(payload.data.length < 20)
        state.status = ActionStatus.Success

      })
      .addCase(fetchAll.pending, (state, { payload }) => {
        state.status = ActionStatus.Pending
      })
      .addCase(fectchAllAndAttach.fulfilled, (state, { payload }) => {
        state.data = [...state.data, ...payload.data]
        state.allCount = payload.allCount;
        state.hasNext = !(payload.data.length < 20)

      })
  },
});
const { actions, reducer } = volunteersSlice;
export const {
  setVolunteers,
  setVolunteersCount,
  // setVolunteersFilteredCount,
} = actions;
export { fetchAll, fectchAllAndAttach };
export default reducer;
