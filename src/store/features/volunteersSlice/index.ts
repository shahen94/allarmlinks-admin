import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import IVolunteerRecord from "../../../types/volunteers/IVolunteerRecord";
import fetchVolunteers from "../../../api/volunteer/fetchVolunteers";
import { ActionStatus } from "../../../types/auth/ILoginData";
import { IVolunteerState } from "../../../types/volunteers/IVolunteerState";
import IVolunteersRequest from './../../../types/volunteers/IVolunteersRequest';
const fetchVolunteersFunc =  async (req:IVolunteersRequest): Promise<IVolunteerState> => {
  const response = await fetchVolunteers(req);
  return response as IVolunteerState;
}
const fetchAll = createAsyncThunk<IVolunteerState, IVolunteersRequest>(
  "volunteers/fetchAll",
  fetchVolunteersFunc
);
const fectchAllAndAttach = createAsyncThunk<IVolunteerState,IVolunteersRequest>(
  "volunteers/fetchAllAndAttach",
  fetchVolunteersFunc
)

const initialState: IVolunteerState = {
  data: [],
  allCount: 0,
  status: ActionStatus.Initial,
  hasNext:true
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
    builder.addCase(fetchAll.fulfilled, (state, { payload }) => {
      state.data = payload.data;
      state.allCount = payload.allCount;
      state.hasNext = !(payload.data.length < 20)
    })
    .addCase(fectchAllAndAttach.fulfilled,(state,{payload})=>{
      state.data = [...state.data,...payload.data]
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
export { fetchAll ,fectchAllAndAttach};
export default reducer;
