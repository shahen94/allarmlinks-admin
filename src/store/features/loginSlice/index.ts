import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import login from '../../../api/auth/login';
import { ILocalStorageData } from "../../../types/auth/ILocalStorageData";
import ILoginState from "../../../types/auth/ILoginData";
import ILoginData, { ActionStatus } from "../../../types/auth/ILoginData";
import { getLocalStorageData } from "../../../utils/localStorageUtils";

const adminLogin = createAsyncThunk<ILoginData, any, { rejectValue: any }>(
    'admin/login',
    async (loginData: any, thunkApi: any): Promise<ILoginData> => {
        const response = await login(loginData);
        if (response.status !== 200) {
            return thunkApi.rejectWithValue(response);
        }
        return response.data as ILoginData;
    }
)

const initialState: ILoginState = {
    status: ActionStatus.Initial,
    data: {},
    error: ""
}

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        adminLoginCheck: (state: ILoginState): void => {
            const parsedData: ILocalStorageData = JSON.parse(getLocalStorageData() || "{}");
            if (parsedData.accessToken) {
                state.status = ActionStatus.Success;
                state.data = parsedData.userData;
            } else {
                state.status = ActionStatus.Initial;
            }
        },
        logout: (state: ILoginState): ILoginState => {
            window.localStorage.removeItem("adminAuthData");
            return initialState;
        }
    },
    extraReducers: builder => {
        builder.addCase(adminLogin.fulfilled, (state, { payload }: PayloadAction<ILoginData>) => {
            const storageData: ILocalStorageData = {
                accessToken: payload.accessToken,
                userData: payload.data
            };
            window.localStorage.setItem("adminAuthData", JSON.stringify(storageData));
            state.status = ActionStatus.Success;
            state.data = payload.data;
        });
        builder.addCase(adminLogin.pending, (state) => {
            state.status = ActionStatus.Pending;
        });
        builder.addCase(adminLogin.rejected, (state, action: PayloadAction<any>) => {
            state.status = ActionStatus.Error;
            state.error = "Wrong Email or Password";
        });
    }
})

const { actions, reducer } = loginSlice;
export const { logout, adminLoginCheck } = actions;
export { adminLogin };
export default reducer;