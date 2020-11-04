import { createSlice, PayloadAction } from "@reduxjs/toolkit"
const volunteersCountSlice = createSlice({
    name: 'count',
    initialState: 0,
    reducers: {
        setVolounteersCount: (state: number, { payload }: PayloadAction<number>) => payload,
    }
})
const { actions, reducer } = volunteersCountSlice
export const { setVolounteersCount } = actions
export default reducer