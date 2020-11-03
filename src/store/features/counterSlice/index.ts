import { createSlice, PayloadAction } from "@reduxjs/toolkit"
const counterSlice = createSlice({
    name: 'counter',
    initialState: 10,
    reducers: {
      increment: (state: number, action: PayloadAction<number>) => state + action.payload
    }
  })
const { actions, reducer } = counterSlice
export const {increment} = actions
export default reducer