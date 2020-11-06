import { createSlice, PayloadAction } from "@reduxjs/toolkit"

// const initialState: ILoginState = {
//     user: 
// }

// const adminsSlice = createSlice({
//     name: 'admins',
//     initialState,
//     reducers: {
//         setAdmins: ({ admins }: ILoginState, { payload }: PayloadAction<ILoginState[]>): void => {
//             admins = payload
//         }
//     },
//     extraReducers: builder => {
//         builder.addCase(fetchAll.fulfilled, (state, { payload }) => {
//             state.admins = payload.admins;
//         })
//     }
// })

// const { actions, reducer } = adminsSlice;
// export const { setAdmins, deleteAdminById } = actions;
// export { fetchAll };
// export default reducer;