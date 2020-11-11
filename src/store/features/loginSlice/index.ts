import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import login from '../../../api/auth/login';
import { ILocalStorageData } from "../../../types/auth/ILocalStorageData";
import ILoginState from "../../../types/auth/ILoginData";
import ILoginData, { ActionStatus } from "../../../types/auth/ILoginData";
import { getLocalStorageData } from "../../../utils/localStorageUtils";

const adminLogin = createAsyncThunk<ILoginData, any>(
    'admin/login',
    async (loginData: any): Promise<ILoginData> => {
        const response = await login(loginData);
        return response as ILoginData
    }
)

// const adminLoginCheck = createAsyncThunk(
//     'admin/profile',
//     async (): Promise<ILoginResponse> => {
//         const response = await loginCheck();
//         return response as ILoginResponse
//     }
// )

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
        logout: (state: ILoginState): void => {
            window.localStorage.removeItem("adminAuthData");
            state.status = ActionStatus.Initial;
            state.data = null;
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
            state.error = "Authentication error";
        });
        // builder.addCase(adminLoginCheck.fulfilled, (state) => {
        //     debugger
        //     state.status = LoginStatus.Success;
        //     //state.userData = payload.data;
        // });
        // builder.addCase(adminLoginCheck.rejected, (state, asdsa: any) => {
        //     debugger
        //     state.status = LoginStatus.Initial;
        //     //state.userData = payload.data;
        // });
    }
})

const { actions, reducer } = loginSlice;
export const { logout, adminLoginCheck } = actions;
export { adminLogin };
export default reducer;