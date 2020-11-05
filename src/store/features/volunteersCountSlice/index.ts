import { createSlice, PayloadAction } from "@reduxjs/toolkit"
const volunteersCountSlice = createSlice({
    name: 'count',
    initialState: 0,
    reducers: {
        setVolunteersCount: (state: number, { payload }: PayloadAction<number>) => payload,
    }
})
const { actions, reducer } = volunteersCountSlice
export const { setVolunteersCount } = actions
export default reducer