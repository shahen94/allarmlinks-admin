import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import IAdminRecord from '../../../types/admins/IAdminRecord';
import fetchAdmins from '../../../api/admin/fetchAdmins';
import fetchAdminById from '../../../api/admin/fetchAdminById';
import createAdmin from '../../../api/admin/createAdmin';
import deleteAdmin from '../../../api/admin/deleteAdmin';
import updateAdmin from '../../../api/admin/updateAdmin';
import IFetchedAdmins from './../../../types/admins/IFetchedAdmins';
import { IAdminRequestData, IAdminUpdateThunkData } from "../../../types/admins/IAdminRequestData";
import { IAdminState } from "../../../types/admins/IAdminState";
import { ActionStatus } from "../../../types/auth/ILoginData";
import { ISearch } from "../../../types/ISearch";
import search from "../../../api/admin/search";

const fetchAll = createAsyncThunk<IAdminState>(
    'admins/fetchAll',
    async (): Promise<IAdminState> => {
        const response = await fetchAdmins();
        return response as IAdminState;
    }
);

const searchAdmins = createAsyncThunk<IAdminState, ISearch>(
    "admins/search",
    async (params: ISearch): Promise<IAdminState> => {
        const response = await search(params, "admins");
        console.log(response)
        return response as IAdminState
    })


const fetchById = createAsyncThunk<any, string>(
    'admins/fetchById',
    async (id: string): Promise<IAdminRecord> => {
        const response = await fetchAdminById(id);
        return response as IAdminRecord;
    }
);

const createNewAdmin = createAsyncThunk(
    'admins/create',
    async (adminData: IAdminRequestData): Promise<any> => {
        const response = await createAdmin(adminData);
        return response as any;
    }
);

const deleteAdminById = createAsyncThunk(
    'admins/deleteById',
    async (id: string): Promise<any> => {
        const response = await deleteAdmin(id);
        return response as IFetchedAdmins;
    }
)

const updateAdminById = createAsyncThunk(
    'admins/updateById',
    async (adminData: IAdminUpdateThunkData): Promise<any> => {
        const { _id, ...data } = adminData;
        const response = await updateAdmin(_id, data);
        return response as IFetchedAdmins;
    }
)

const initialState: IAdminState = {
    status: ActionStatus.Initial,
    data: []
}

const adminsSlice = createSlice({
    name: 'admins',
    initialState,
    reducers: {
        setAdmins: ({ data }: IAdminState, { payload }: PayloadAction<IAdminRecord[]>): void => {
            data = payload
        },
        // deleteAdminById: (): void => {            
        // }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchAll.fulfilled, (state, { payload }) => {
                state.data = payload.data;
            })
            .addCase(fetchById.fulfilled, (state, { payload }) => {
                debugger
                const adminRecord = state.data.some((admin: any) => {
                    return admin._id === payload.data._id
                });

                if (!adminRecord) {
                    state.data.push(payload.data as never);
                }

                state.status = ActionStatus.Success;
                //state.data = payload.data;
            })
            .addCase(fetchById.pending, (state, { payload }) => {
                state.status = ActionStatus.Pending;
            })
            .addCase(fetchById.rejected, (state, { payload }) => {
                state.status = ActionStatus.Error;
            })
            .addCase(createNewAdmin.fulfilled, (state, { payload }) => {
                state.data.push(payload.data as never);
                state.status = ActionStatus.Success;
            })
            .addCase(createNewAdmin.pending, (state, { payload }) => {
                state.status = ActionStatus.Pending;
            })
            .addCase(createNewAdmin.rejected, (state, { payload }) => {
                state.status = ActionStatus.Error;
                state.error = "Error creating admin";
            })
            .addCase(updateAdminById.fulfilled, (state, { payload }) => {
                const foundIndex = state.data.findIndex((admin: any) => admin._id === payload.data._id);
                const newData: IAdminRecord[] = state.data;
                newData[foundIndex] = payload.data;
                state.data = newData;
                state.status = ActionStatus.Success;
            })
            .addCase(updateAdminById.pending, (state, { payload }) => {
                state.status = ActionStatus.Pending;
            })
            .addCase(updateAdminById.rejected, (state, { payload }) => {
                state.status = ActionStatus.Error;
                state.error = "Error saving changes";
            })
            .addCase(deleteAdminById.fulfilled, (state, { payload }) => {
                state.data = state.data.filter((admin: any) => {
                    return admin._id !== payload.data.id
                })
                state.status = ActionStatus.Success;
            })
            .addCase(deleteAdminById.rejected, (state, { payload }) => {
                state.status = ActionStatus.Error;
                state.error = "Error deleting admin";
            })
            .addCase(searchAdmins.fulfilled, (state, { payload }) => {
                debugger
                state.data = payload.data;
            })
    }
});

const { actions, reducer } = adminsSlice;
export const { setAdmins } = actions;
export { fetchAll, fetchById, createNewAdmin, updateAdminById, deleteAdminById, searchAdmins };
export default reducer;