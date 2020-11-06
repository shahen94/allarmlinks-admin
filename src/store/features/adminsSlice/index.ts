import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import IAdminRecord from '../../../types/admins/IAdminRecord';
import fetchAdmins from '../../../api/admin/fetchAdmins';
import deleteAdmin from '../../../api/admin/deleteAdmin';
import IFetchedAdmins from './../../../types/admins/IFetchedAdmins';

const fetchAll = createAsyncThunk<IFetchedAdmins>(
    'admins/fetchAll',
    async (): Promise<IFetchedAdmins> => {
        const response = await fetchAdmins()
        return response as IFetchedAdmins
    }
)

// const deleteAdminById = createAsyncThunk<IFetchedAdmins>(
//     'admins/fetchAll',
//     async (): Promise<IFetchedAdmins> => {
//         const response = await deleteAdmin()
//         return response as IFetchedAdmins
//     }
// )

interface IAdminState {
    admins: IAdminRecord[] | []
}

const initialState: IAdminState = {
    admins: []
}

const adminsSlice = createSlice({
    name: 'admins',
    initialState,
    reducers: {
        setAdmins: ({ admins }: IAdminState, { payload }: PayloadAction<IAdminRecord[]>): void => {
            admins = payload
        },
        deleteAdminById: (): void => {

        }
    },
    extraReducers: builder => {
        builder.addCase(fetchAll.fulfilled, (state, { payload }) => {
            state.admins = payload.admins;
        })
    }
})

const { actions, reducer } = adminsSlice;
export const { setAdmins, deleteAdminById } = actions;
export { fetchAll };
export default reducer;