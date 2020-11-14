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
// import { ILocalStorageData } from "../../../types/auth/ILocalStorageData";
// import { getLocalStorageData } from "../../../utils/localStorageUtils";

const fetchAll = createAsyncThunk<IAdminState, any, { rejectValue: any }>(
    'admins/fetchAll',
    async (payload: any, thunkApi: any): Promise<IAdminState> => {

        /* *********** LOGIN TEST *********** */
        // const parsedData: ILocalStorageData = JSON.parse(getLocalStorageData() || "{}");
        // const storageData: ILocalStorageData = {
        //     accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYThjZjE3ZDUzYzdkNGI0ODk5YjcxNCIsImlhdCI6MTYwNDk1OTY2MiwiZXhwIjoxNjA1MDQ2MDYyfQ.EgpG64hTuxecAhY0vXu7sLYeUZdg12-MMKWnOspHWgI",
        //     userData: parsedData.userData
        // };
        // window.localStorage.setItem("adminAuthData", JSON.stringify(storageData));
        /* ********************************** */

        const response = await fetchAdmins();
        if (response.status !== 200) {
            return thunkApi.rejectWithValue(response);
        }
        return response.data as IAdminState;
    }
);

const searchAdmins = createAsyncThunk<IAdminState, ISearch, { rejectValue: any }>(
    "admins/search",
    async (params: ISearch, thunkApi: any): Promise<IAdminState> => {
        const response = await search(params, "admins");
        if (response.status !== 200) {
            return thunkApi.rejectWithValue(response);
        }
        return response.data as IAdminState;
    })


const fetchById = createAsyncThunk<any, string, { rejectValue: any }>(
    'admins/fetchById',
    async (id: string, thunkApi: any): Promise<IAdminRecord> => {
        const response = await fetchAdminById(id);
        if (response.status !== 200) {
            return thunkApi.rejectWithValue(response);
        }
        return response as IAdminRecord;
    }
);

const createNewAdmin = createAsyncThunk<IAdminState, IAdminRequestData, { rejectValue: any }>(
    'admins/create',
    async (adminData: IAdminRequestData, thunkApi: any): Promise<IAdminState> => {
        const response = await createAdmin(adminData);
        // if(response.status === 400) {
        //     return thunkApi.rejectWithValue(response);
        // }
        if (response.status !== 200) {
            return thunkApi.rejectWithValue(response);
        }
        return response.data as IAdminState;
    }
);

const deleteAdminById = createAsyncThunk<any, any, { rejectValue: any }>(
    'admins/deleteById',
    async (id: string, thunkApi: any): Promise<IFetchedAdmins> => {
        const response = await deleteAdmin(id);
        if (response.status !== 200) {
            return thunkApi.rejectWithValue(response);
        }
        return response as IFetchedAdmins;
    }
);

const updateAdminById = createAsyncThunk<any, any, { rejectValue: any }>(
    'admins/updateById',
    async (adminData: IAdminUpdateThunkData, thunkApi: any): Promise<any> => {
        const { _id, ...data } = adminData;
        const response = await updateAdmin(_id, data);
        if (response.status !== 200) {
            return thunkApi.rejectWithValue(response);
        }
        return response.data as IFetchedAdmins;
    }
);

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
        resetAdminsError: (state: IAdminState): void => {
            state.error = "";
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchAll.fulfilled, (state, { payload }) => {
                state.status = `FETCH_ALL_ADMINS_${ActionStatus.Success}`;
                state.data = payload.data;
            })
            .addCase(fetchAll.pending, (state, { payload }) => {
                state.status = `FETCH_ALL_ADMINS_${ActionStatus.Pending}`;
            })
            // .addCase(fetchAll.rejected, (state, { payload }) => {
            //     state.status = ActionStatus.Error;
            //     state.error = payload?.data.error;
            // })
            .addCase(fetchById.fulfilled, (state, { payload }) => {
                const adminRecord = state.data.some((admin: any) => {
                    return admin._id === payload.data._id
                });

                if (!adminRecord) {
                    state.data.push(payload.data as never);
                }
                state.status = `FETCH_ADMIN_${ActionStatus.Success}`;
                state.error = "";
            })
            .addCase(fetchById.pending, (state, { payload }) => {
                state.status = `FETCH_ADMIN_${ActionStatus.Pending}`;
                state.error = "";
            })
            .addCase(fetchById.rejected, (state, { payload }) => {
                state.status = `FETCH_ADMIN_${ActionStatus.Error}`;
                state.error = payload.data.error || "Unknown Error";
            })
            .addCase(createNewAdmin.fulfilled, (state, { payload }) => {
                state.data.push(payload.data as never);
                state.status = `CREATE_ADMIN_${ActionStatus.Success}`;
            })
            .addCase(createNewAdmin.pending, (state, { payload }) => {
                state.status = `CREATE_ADMIN_${ActionStatus.Pending}`;
                state.error = "";
            })
            .addCase(createNewAdmin.rejected, (state, { payload }) => {
                state.status = `CREATE_ADMIN_${ActionStatus.Error}`;
                state.error = payload.data.error || "Unknown Error";
            })
            .addCase(updateAdminById.fulfilled, (state, { payload }) => {
                const foundIndex = state.data.findIndex((admin: any) => admin._id === payload.data._id);
                const newData: IAdminRecord[] = state.data;
                newData[foundIndex] = payload.data;
                state.data = newData;
                state.status = `UPDATE_ADMIN_${ActionStatus.Success}`;
            })
            .addCase(updateAdminById.pending, (state, { payload }) => {
                state.status = `UPDATE_ADMIN_${ActionStatus.Pending}`;
                state.error = "";
            })
            .addCase(updateAdminById.rejected, (state, { payload }) => {
                state.status = `UPDATE_ADMIN_${ActionStatus.Error}`;
                if (payload.status === 400 && payload.data && payload.data.error && payload.data.error.indexOf("duplicate key error") >= 0) {
                    state.error = "Email already registered"
                }
                else {
                    state.error = payload.data.error || "Unknown Error";
                }

            })
            .addCase(deleteAdminById.fulfilled, (state, { payload }) => {
                const newData = state.data.filter((admin: any) => {
                    return admin._id !== payload.data.id
                });
                state.data = [...newData];
                state.status = `DELETE_ADMIN_${ActionStatus.Success}`;
            })
            .addCase(deleteAdminById.rejected, (state, { payload }) => {
                state.status = `DELETE_ADMIN_${ActionStatus.Error}`;
                state.error = payload.data.error || "Unknown Error";
            })
            .addCase(searchAdmins.fulfilled, (state, { payload }) => {
                state.data = payload.data;
                state.status = `SEARCH_ADMINS_${ActionStatus.Success}`;
            })
            .addCase(searchAdmins.pending, (state, { payload }) => {
                state.status = `SEARCH_ADMINS_${ActionStatus.Pending}`;
                state.error = "";
            })
    }
});

const { actions, reducer } = adminsSlice;
export const { setAdmins, resetAdminsError } = actions;
export { fetchAll, fetchById, createNewAdmin, updateAdminById, deleteAdminById, searchAdmins };
export default reducer;