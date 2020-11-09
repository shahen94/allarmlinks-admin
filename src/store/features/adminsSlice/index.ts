import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import IAdminRecord from '../../../types/admins/IAdminRecord';
import fetchAdmins from '../../../api/admin/fetchAdmins';
import createAdmin from '../../../api/admin/createAdmin';
import deleteAdmin from '../../../api/admin/deleteAdmin';
import updateAdmin from '../../../api/admin/updateAdmin';
import IFetchedAdmins from './../../../types/admins/IFetchedAdmins';
import { IAdminCreateData, IAdminUpdateData } from "../../../types/admins/IAdminCreateData";
import { IAdminState } from "../../../types/admins/IAdminState";
import { ActionStatus } from "../../../types/auth/ILoginData";

const fetchAll = createAsyncThunk(
    'admins/fetchAll',
    async (): Promise<any> => {
        const response = await fetchAdmins();
        return response as any;
    }
);

const createNewAdmin = createAsyncThunk(
    'admins/create',
    async (adminData: IAdminCreateData): Promise<any> => {
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
    async (adminData: IAdminUpdateData): Promise<any> => {
        const response = await updateAdmin(adminData);
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
        builder.addCase(fetchAll.fulfilled, (state, { payload }) => {
            state.data = payload.data;
        });
        builder.addCase(createNewAdmin.fulfilled, (state, { payload }) => {
            state.status = ActionStatus.Success;
            state.data.push(payload.data as never);
        });
        builder.addCase(createNewAdmin.pending, (state, { payload }) => {
            state.status = ActionStatus.Pending;
        });
        builder.addCase(createNewAdmin.rejected, (state, { payload }) => {
            state.status = ActionStatus.Error;
            state.error = "Error creating admin";
        });
        builder.addCase(updateAdminById.fulfilled, (state, action) => {
            state.status = ActionStatus.Success;
            //TODO
        });
        builder.addCase(updateAdminById.pending, (state, { payload }) => {
            state.status = ActionStatus.Pending;
        });
        builder.addCase(updateAdminById.rejected, (state, { payload }) => {
            state.status = ActionStatus.Error;
            state.error = "Error saving changes";
        });
        builder.addCase(deleteAdminById.fulfilled, (state, action: any) => {
            state.status = ActionStatus.Success;
            state.data = state.data.filter((admin: any) => {
                return admin._id !== action.meta.arg //TODO
            })
        });
        builder.addCase(deleteAdminById.rejected, (state, { payload }) => {
            state.status = ActionStatus.Error;
            state.error = "Error deleting admin";
        });
    }
})

const { actions, reducer } = adminsSlice;
export const { setAdmins } = actions;
export { fetchAll, createNewAdmin, updateAdminById, deleteAdminById };
export default reducer;